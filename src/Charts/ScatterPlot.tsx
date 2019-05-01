/* eslint-disable react/no-unknown-property */
import { h, Component, VNode } from 'preact';
import { Axis } from '../Components/Axis';
import { DataArray, ChartProps, ChartDefaultProps, NumberTuple } from '../types';
import { scaleLinear } from 'd3-scale';
import { extent } from 'd3-array';
import { ResizeObserver } from 'resize-observer';
import { line } from '../Utils/line';
import { BrushZoom } from '../Components/BrushZoom';

interface ScatterPlotProps extends ChartProps {
  x: string;
  y: string;
  data: DataArray;
  radius?: number;
  labels?: boolean;
  dotFill?: string;
  dotBorder?: string;
  regressionEq?: (x: number) => number;
  regLineColor?: string;
}

interface ScatterPlotDefaultProps extends ChartDefaultProps {
  radius: number;
  labels: boolean;
  dotFill: string;
  dotBorder: string;
  regLineColor: string;
}

interface ScatterPlotState {
  width: number;
  innerWidth: number;
  height: number;
  innerHeight: number;
  xDomain: NumberTuple;
  yDomain: NumberTuple;
}

export class ScatterPlot extends Component<ScatterPlotProps, ScatterPlotState> {

  public static defaultProps: ScatterPlotDefaultProps = {
    height: 500,
    width: 500,
    margin: {
      top: 25,
      right: 25,
      bottom: 75,
      left: 75,
    },
    radius: 5,
    labels: false,
    dotFill: 'steelblue',
    dotBorder: 'whitesmoke',
    regLineColor: 'currentColor',
  };
  private chartSVG: any;
  private resizeOb: ResizeObserver;
  private xScale: any;
  private yScale: any;

  public constructor (props: ScatterPlotProps) {
    super(props);
    const innerWidth = props.width - props.margin.left - props.margin.right;
    const innerHeight = props.height - props.margin.top - props.margin.bottom;
    const xDomain = extent(props.data, (d) => d[props.x]);
    const xDomainPadded = [xDomain[0] * 0.95, xDomain[1] * 1.05] as NumberTuple;
    const yDomain = extent(props.data, (d) => d[props.y]);
    const yDomainPadded = [yDomain[0] * 0.95, yDomain[1] * 1.05] as NumberTuple;

    this.state = {
      width: props.width,
      height: props.height,
      innerWidth,
      innerHeight,
      xDomain: xDomainPadded,
      yDomain: yDomainPadded,
    };
  }

  public render (props: ScatterPlotProps,
    { height, width, innerHeight, innerWidth, xDomain, yDomain }: ScatterPlotState): VNode {

    this.xScale = scaleLinear()
      .range([0, innerWidth])
      .domain(xDomain);

    this.yScale = scaleLinear()
      .range([innerHeight, 0])
      .domain(yDomain);

    let lineFunction;
    let regressionLine;
    if (props.regressionEq !== undefined) {
      lineFunction = line({
        x: (d) => this.xScale(d.x),
        y:(d) => this.yScale(d.y),
      });

      const minX = 0;
      const maxX = +this.xScale.invert(innerWidth);
      regressionLine = [
        { x: minX, y: props.regressionEq(minX) },
        { x: maxX, y: props.regressionEq(maxX) },
      ];
    }

    return (
      <svg ref={(svg) => this.chartSVG = svg} class={props.name} height={height} width={width}>
        <g transform={`translate(${props.margin.left}, ${props.margin.top})`}>
          <clipPath id={`${props.name}_cp`}>
            <rect width={innerWidth} height={innerHeight} />
          </clipPath>
          <Axis height={innerHeight} axisType='x' scale={this.xScale} grid={true} />
          <Axis width={innerWidth} axisType='y' scale={this.yScale} grid={true} />
          {
            props.data.map((point, index) =>
              <circle stroke-width='1' r={props.radius} cx={this.xScale(point[props.x])}
                cy={this.yScale(point[props.y])} key={index} clip-path={`url(#${props.name}_cp)`}
                fill={props.dotFill} stroke={props.dotBorder} />,
            )
          }
          {
            props.regressionEq !== undefined &&
              <path d={lineFunction(regressionLine)} clip-path={`url(#${props.name}_cp)`}
                strokeLinecap='round' stroke={props.regLineColor} fill='none' stroke-width='3px' />
          }
          {
            props.labels &&
              <text x={innerWidth / 2} y={innerHeight + props.margin.bottom - 15} fill='currentColor'
                text-anchor='middle'>
                {props.x.replace(/_/g, ' ')}
              </text>
          }
          {
            props.labels &&
              <text x={-innerHeight / 2} y={-props.margin.left + 15} transform='rotate(-90)' fill='currentColor'
                text-anchor='middle'>
                {props.y.replace(/_/g, ' ')}
              </text>
          }
          <BrushZoom height={innerHeight} width={innerWidth} margin={props.margin} onBrush={this.handleBrush} />
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

  public componentWillReceiveProps (newProps: ScatterPlotProps): void {
    const xDomain = extent(newProps.data, (d) => d[newProps.x]);
    const xDomainPadded = [xDomain[0] * 0.95, xDomain[1] * 1.05] as NumberTuple;
    const yDomain = extent(newProps.data, (d) => d[newProps.y]);
    const yDomainPadded = [yDomain[0] * 0.95, yDomain[1] * 1.05] as NumberTuple;
    this.setState({ yDomain: yDomainPadded, xDomain: xDomainPadded });
  }

  public componentWillUnmount (): void {
    this.resizeOb.disconnect();
  }

  private resizeChart (): void {
    const parent = this.chartSVG.parentElement;
    const cr = parent.getBoundingClientRect();
    const width = cr.width;
    const height = cr.height;
    const innerWidth = width - this.props.margin.left - this.props.margin.right;
    const innerHeight = height - this.props.margin.top - this.props.margin.bottom;
    this.setState({ innerWidth, innerHeight, height, width });
  }

  private handleBrush = (s: [NumberTuple, NumberTuple] | null) => {
    if (s === null) {
      const xDomain = extent(this.props.data, (d) => d[this.props.x]);
      const xDomainPadded = [xDomain[0] * 0.95, xDomain[1] * 1.05] as NumberTuple;
      const yDomain = extent(this.props.data, (d) => d[this.props.y]);
      const yDomainPadded = [yDomain[0] * 0.95, yDomain[1] * 1.05] as NumberTuple;
      this.setState({ xDomain: xDomainPadded, yDomain: yDomainPadded });
    } else {
      const xDomain = [s[0][0], s[1][0]].map(this.xScale.invert, this.xScale) as NumberTuple;
      const yDomain = [s[0][1], s[1][1]].map(this.yScale.invert, this.yScale) as NumberTuple;
      this.setState({ xDomain, yDomain });
    }
  }
}
