/* eslint-disable react/no-unknown-property */
import { h, Component, ComponentChild, cloneElement, VNode } from 'preact';
import { scaleLinear, scaleTime } from 'd3-scale';
import { line } from 'd3-shape';
import { bisector, extent } from 'd3-array';
import { Margin, TimestampArray, TimestampData } from '../types';
import { Axis } from '../Axis';
import { Flag } from '../Children/Flag';
import { css } from 'goober';
import { ResizeObserver } from 'resize-observer';

const overlay = css({
  'fill': 'none',
  'pointer-events': 'all',
  'border-top': 'none',
  'border-style': 'none',
});

const axisControl = css({
  'text-anchor': 'middle',
  'user-select': 'none',
  'cursor': 'pointer',
  '>text': {
    'width': '12px',
    'font-size': '1.2em',
  },
});

interface TrendChartProps {
  name: string;
  height?: number;
  width?: number;
  margin?: Margin;
  x: string;
  y: string;
  data: TimestampArray;
  lineColour?: string;
  extent?: Date[];
  tooltip?: boolean;
  axisControl?: boolean;
  controlColour?: string;
}

interface TrendChartDefaultProps {
  height: number;
  width: number;
  margin: Margin;
  lineColour: string;
  extent: Date[];
  tooltip: boolean;
  axisControl: boolean;
  controlColour: string;
}

interface TrendChartState {
  height: number;
  width: number;
  innerHeight: number;
  innerWidth: number;
  tooltipValues: [Date, number];
  textAnchor: string;
  isMouseOver: boolean;
  yDomain: number[];
}

export class TrendChart extends Component<TrendChartProps, TrendChartState> {

  public static defaultProps: TrendChartDefaultProps = {
    height: 200,
    width: 1000,
    margin: {
      top: 25,
      right: 25,
      bottom: 75,
      left: 75,
    },
    lineColour: 'lightblue',
    extent: [],
    tooltip: true,
    axisControl: true,
    controlColour: 'goldenrod',
  };
  private chartSVG: HTMLBaseElement;
  private resizeOb: ResizeObserver;
  private xScale: any;

  public constructor (props: TrendChartProps) {
    super(props);
    const innerWidth = props.width - props.margin.left - props.margin.right;
    const innerHeight = props.height - props.margin.top - props.margin.bottom;
    const yDomain = extent(props.data, (d) => +d[props.y]);
    this.state = {
      width: props.width,
      height: props.height,
      innerWidth,
      innerHeight,
      isMouseOver: false,
      tooltipValues: [null, null],
      textAnchor: 'middle',
      yDomain,
    };
  }

  public render (props: TrendChartProps,
    { innerWidth, innerHeight, height, width, isMouseOver, tooltipValues,
      textAnchor, yDomain }: TrendChartState): VNode {
    const children = this.props.children as ComponentChild[];

    const xDomain = props.extent.length > 0 ?
      props.extent :
      extent(props.data, (d) => +d[props.x]);

    this.xScale = scaleTime()
      .range([0, innerWidth])
      .domain(xDomain);

    const yScale = scaleLinear()
      .range([innerHeight, 0])
      .domain(yDomain);

    const lineFunc = line<TimestampData>()
      .x((d) => this.xScale(d[props.x] as Date))
      .y((d) => yScale(+d[props.y]));
    return (
      <svg ref={(svg) => this.chartSVG = svg} class={props.name} height={height} width={width}>
        { props.axisControl &&
            <g class={axisControl} stroke={props.controlColour} key='topControl'
              transform={`translate(${props.margin.left * 0.3}, ${props.margin.top + 5})`}>
              <text onClick={() => this.handleChangeYDomain('topup')}>
                    &#43;
              </text>
              <text transform='translate(0, 15)' onClick={() => this.handleChangeYDomain('topdown')}>
                    &#45;
              </text>
            </g>
        }
        { props.axisControl &&
          <g class={axisControl} stroke={props.controlColour} key='bottomControl'
            transform={`translate(${props.margin.left * 0.3}, ${innerHeight})`}>
            <text onClick={() => this.handleChangeYDomain('botup')}>
                  &#43;
            </text>
            <text transform='translate(0, 15)' onClick={() => this.handleChangeYDomain('botdown')}>
                  &#45;
            </text>
          </g>
        }
        <g transform={`translate(${props.margin.left}, ${props.margin.top})`}>
          <clipPath id={`${props.name}_cp`}>
            <rect width={innerWidth} height={innerHeight} />
          </clipPath>
          <Axis height={innerHeight} axisType='x' scale={this.xScale} />
          <Axis width={innerWidth} axisType='y' scale={yScale} grid={true} />
          <path d={lineFunc(props.data)} clip-path={`url(#${props.name}_cp)`}
            strokeLinecap='round' stroke={props.lineColour} fill='none' stroke-width='2px' />
          {
            (isMouseOver && tooltipValues[0] !== null) &&
              <g transform={`translate(${this.xScale(tooltipValues[0])},${yScale(tooltipValues[1])})`}
                key={+tooltipValues[0]}>
                <circle fill='none' stroke-width={2} stroke='gold' r='6'></circle>
                <text x={0} y={-15} dy='0.5em' text-anchor={textAnchor} stroke='currentColor'>
                  {
                    `${tooltipValues[0].toLocaleDateString()} ${tooltipValues[0].toLocaleTimeString()}:
                          ${tooltipValues[1].toFixed(4)}`
                  }
                </text>
              </g>
          }
          {
            (props.tooltip && props.data.length > 0) &&
              <rect class={overlay} width={innerWidth} height={innerHeight}
                onMouseMove={this.handleMouseMove} onMouseOver={this.handleMouseOver}
                onMouseOut={this.handleMouseOut}>
              </rect>
          }
          {
            children[0] &&
              children.map((ch) =>
                cloneElement(ch as VNode<Flag>,
                  { xScale: this.xScale, height: innerHeight, chartName: props.name }))
          }
        </g>
      </svg>
    );
  }

  public componentDidMount (): void {
    this.resizeChart();
    this.resizeOb = new ResizeObserver((entries: any[]) => {
      for (const entry of entries) {
        const cr = entry.contentRect;
        const width = cr.width;
        const height = cr.height;
        if (width !== this.state.width || height !== this.state.height) {
          this.resizeChart();
        }
      }
    });
    this.resizeOb.observe(this.chartSVG.parentElement);
  }

  public componentWillReceiveProps (newProps: TrendChartProps): void {
    if (newProps.y !== this.props.y) {
      const yDomain = extent(newProps.data, (d) => +d[newProps.y]);
      this.setState({ yDomain });
    }
  }

  public componentWillUnmount (): void {
    this.resizeOb.disconnect();
  }

  private handleChangeYDomain = (direction: string): void => {
    const yDomain = this.state.yDomain;
    const yMax = yDomain[1];
    switch (direction) {
      case 'topup':
        yDomain[1] *= 1.05;
        break;
      case 'topdown':
        yDomain[1] *= 0.95;
        break;
      case 'botup':
        yDomain[0] += yMax * 0.05;
        break;
      case 'botdown':
        yDomain[0] -= yMax * 0.05;
        break;
    }
    yDomain[0] = yDomain[0] < 0 ? 0 : yDomain[0];
    this.setState({ yDomain });
  }

  private handleMouseOver = () => {
    this.setState({ isMouseOver: true });
  }

  private handleMouseOut = () => {
    this.setState({ isMouseOver: false });
  }

  private handleMouseMove = (e: MouseEvent) => {
    const xPoint = e.offsetX - this.props.margin.left;
    const xValue = this.xScale.invert(xPoint);
    const textAnchor = xPoint < (this.state.innerWidth * 0.1) ?
      'start' :
      xPoint < (this.state.innerWidth * 0.9) ?
        'middle' :
        'end';

    const i = this.bisectDate(this.props.data, xValue, 1);
    const d0 = this.props.data[i - 1];
    const d1 = this.props.data[i];

    const point = d1 === undefined ?
      d0 :
      +xValue - +d0.timestamp > +d1.timestamp - +xValue ?
        d1 :
        d0;

    const tooltipValues = [point.timestamp, point[this.props.y]] as TrendChartState['tooltipValues'];
    this.setState({ tooltipValues, textAnchor });
  }

  private bisectDate = (data: TimestampArray, x: number, low: number) =>
    bisector((d: TimestampData) => d[this.props.x]).left(data, x, low)

  private resizeChart (): void {
    const parent = this.chartSVG.parentElement;
    const cr = parent.getBoundingClientRect();
    const width = cr.width;
    const height = cr.height;
    const innerWidth = width - this.props.margin.left - this.props.margin.right;
    const innerHeight = height - this.props.margin.top - this.props.margin.bottom;
    this.setState({ innerWidth, innerHeight, height, width });
  }
}
