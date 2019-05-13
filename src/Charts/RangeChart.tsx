import { h, Component, VNode } from 'preact';
import { scaleLinear, scaleTime } from 'd3-scale';
import { min, max } from 'd3-array';
import { ResizeObserver } from 'resize-observer';
import { TimestampArray, ChartProps, ChartDefaultProps, DataArray, NumberTuple } from '../types';
import { Axis } from '../Components/Axis';
import { area } from '../Utils/area';
import { BrushX } from '../Components/BrushX';

interface RangeChartProps extends ChartProps {
  y: string;
  data: TimestampArray;
  lineColour?: string;
  fillColour?: string;
  onBrush?: (extent: Date[]) => void;
  brushColour?: string;
}

interface RangeChartDefaultProps extends ChartDefaultProps {

  lineColour?: string;
  fillColour?: string;
  onBrush?: (extent: Date[]) => void;
  brushColour: string;
}

interface RangeChartState {
  width: number;
  innerWidth: number;
  height: number;
  innerHeight: number;
  extent?: number[];
}

export class RangeChart extends Component<RangeChartProps, RangeChartState> {

  public static defaultProps: RangeChartDefaultProps = {
    height: 200,
    width: 1000,
    margin: {
      top: 25,
      right: 25,
      bottom: 75,
      left: 75,
    },
    lineColour: 'steelblue',
    fillColour: 'steelblue',
    onBrush: () => {},
    brushColour: 'darkgoldenrod',
  };
  private xScale: any;
  private chartSVG: HTMLBaseElement;
  private resizeOb: ResizeObserver;

  public constructor (props: RangeChartProps) {
    super(props);
    const innerWidth = props.width - props.margin.left - props.margin.right;
    const innerHeight = props.height - props.margin.top - props.margin.bottom;
    this.state = {
      width: props.width,
      height: props.height,
      innerWidth,
      innerHeight,
    };
  }

  public render (props: RangeChartProps, { width, height, innerWidth, innerHeight }: RangeChartState): VNode {
    this.xScale = scaleTime()
      .range([0, innerWidth])
      .domain([min(props.data, (d) => d.timestamp), max(props.data, (d) => d.timestamp)]);
    const yScale = scaleLinear()
      .range([innerHeight, 0])
      .domain([min(props.data, (d) => +d[props.y]), max(props.data, (d) => +d[props.y])]);

    const areaFunc = area({
      x: (d) => this.xScale(d.timestamp),
      y: (d) => yScale(+d[props.y]),
      y0: innerHeight,
    });

    return (
      <svg ref={(svg) => this.chartSVG = svg} class={props.name} height={height} width={width}>
        <g transform={`translate(${props.margin.left}, ${props.margin.top})`}>
          <Axis height={innerHeight} axisType='x' scale={this.xScale} />
          <Axis width={innerWidth} axisType='y' scale={yScale} grid={true} ticks={0} />
          <path d={areaFunc(props.data as DataArray)}
            strokeLinecap='round' stroke={props.lineColour} fill={props.fillColour} stroke-width='1px' />
          <BrushX width={innerWidth} height={innerHeight} margin={props.margin} onBrushEnd={this.handleBrush} />
        </g>
      </svg>
    );
  }

  public componentDidMount = () => {
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
    this.xScale.range([0, innerWidth]);
    this.setState({ innerWidth, innerHeight, height, width });
  }

  private handleBrush = (extent: NumberTuple) => {
    const selection = extent || [0, this.state.innerWidth];
    const inverted = [this.xScale.invert(selection[0]), this.xScale.invert(selection[1])];
    this.setState({ extent: inverted });
    this.props.onBrush(inverted);
  }
}
