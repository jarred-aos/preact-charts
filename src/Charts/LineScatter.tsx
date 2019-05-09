import { h, Component, VNode } from 'preact';
import { Axis } from '../Components/Axis';
import { DataArray, NumberTuple, ChartProps, ChartDefaultProps } from '../types';
import { scaleLinear } from 'd3-scale';
import { extent } from 'd3-array';
import { BrushZoom } from '../Components/BrushZoom';
import { line } from '../Utils/line';
import { bezierInterpolation } from '../Utils/interpolators';
import { ResizeObserver } from 'resize-observer';
import { colourArray } from '../Utils/colors';

interface LineScatterProps extends ChartProps {
  x: string;
  y: string;
  data: DataArray[];
  radius?: number;
  labels?: boolean;
  legendReference?: string[];
}

interface LineScatterDefaultProps extends ChartDefaultProps {
  radius: number;
  labels: boolean;
}

interface LineScatterState {
  width: number;
  innerWidth: number;
  height: number;
  innerHeight: number;
  xDomain: [number, number];
  yDomain: [number, number];
}

export class LineScatter extends Component<LineScatterProps, LineScatterState> {

  public static defaultProps: LineScatterDefaultProps = {
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
  };
  private chartSVG: any;
  private resizeOb: ResizeObserver;
  private xScale: any;
  private yScale: any;

  public constructor (props: LineScatterProps) {
    super(props);
    const innerWidth = props.width - props.margin.left - props.margin.right;
    const innerHeight = props.height - props.margin.top - props.margin.bottom;
    const flatData = props.data.flat();
    const xDomain = extent(flatData, (d) => d[props.x]);
    const xDomainPadded = [xDomain[0] * 0.95, xDomain[1] * 1.05] as [number, number];
    const yDomain = extent(flatData, (d) => d[props.y]);
    const yDomainPadded = [yDomain[0] * 0.95, yDomain[1] * 1.05] as [number, number];
    this.state = {
      width: props.width,
      height: props.height,
      innerWidth,
      innerHeight,
      xDomain: xDomainPadded,
      yDomain: yDomainPadded,
    };
  }

  public render (props: LineScatterProps,
    { height, width, innerHeight, innerWidth, xDomain, yDomain }: LineScatterState): VNode {
    this.xScale = scaleLinear()
      .range([0, innerWidth])
      .domain(xDomain);

    this.yScale = scaleLinear()
      .range([innerHeight, 0])
      .domain(yDomain);

    const lineFunc = line({
      x: (d) => this.xScale(d[props.x]),
      y: (d) => this.yScale(d[props.y]),
      interpolation: bezierInterpolation,
    });

    return (
      <svg ref={(svg) => this.chartSVG = svg} class={props.name} height={height} width={width}>
        <g transform={`translate(${props.margin.left}, ${props.margin.top})`}>
          <clipPath id={`${props.name}_cp`}>
            <rect width={innerWidth} height={innerHeight} />
          </clipPath>
          <Axis height={innerHeight} axisType='x' scale={this.xScale} grid={true} />
          <Axis width={innerWidth} axisType='y' scale={this.yScale} grid={true} />
          {
            props.data.map((dArray, groupIdx) => (
              <g>
                <path d={lineFunc(dArray)} clip-path={`url(#${props.name}_cp)`}
                  strokeLinecap='round' stroke={colourArray[groupIdx]} fill='none'
                  stroke-width='2px' />
                {
                  dArray.map((point, index) =>
                    <circle stroke-width='1px' r={props.radius} cx={this.xScale(point[props.x])}
                      cy={this.yScale(point[props.y])} key={index} fill={colourArray[groupIdx]}
                      clip-path={`url(#${props.name}_cp)`} />)
                }
              </g>
            ),
            )
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
          {
            props.legendReference &&
              props.legendReference.map((title, idx) =>
                <g transform={`translate(0, ${idx * 20})`}>
                  <rect x={innerWidth + props.margin.right - 18} width={18} height={15}
                    stroke-width='1px' fill={colourArray[idx]}>
                  </rect>
                  <text x={innerWidth + props.margin.right - 24} y={9} dy='0.35em' text-anchor='end'
                    fill='currentColor'>
                    {title.replace(/_/g, ' ')}
                  </text>
                </g>)
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

  public componentWillReceiveProps (newProps: LineScatterProps): void {
    const flatData = newProps.data.flat();
    const xDomain = extent(flatData, (d) => d[newProps.x]);
    const xDomainPadded = [xDomain[0] * 0.95, xDomain[1] * 1.05] as [number, number];
    const yDomain = extent(flatData, (d) => d[newProps.y]);
    const yDomainPadded = [yDomain[0] * 0.95, yDomain[1] * 1.05] as [number, number];
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
      const flatData = this.props.data.flat();
      const xDomain = extent(flatData, (d) => d[this.props.x]);
      const xDomainPadded = [xDomain[0] * 0.95, xDomain[1] * 1.05] as [number, number];
      const yDomain = extent(flatData, (d) => d[this.props.y]);
      const yDomainPadded = [yDomain[0] * 0.95, yDomain[1] * 1.05] as [number, number];
      this.setState({ xDomain: xDomainPadded, yDomain: yDomainPadded });
    } else {
      const xDomain = [s[0][0], s[1][0]].map(this.xScale.invert, this.xScale) as [number, number];
      const yDomain = [s[0][1], s[1][1]].map(this.yScale.invert, this.yScale) as [number, number];
      this.setState({ xDomain, yDomain });
    }
  }
}
