import { h, Component, VNode } from 'preact';
import { scaleLinear, scaleTime } from 'd3-scale';
import { Margin, TimestampArray, TimestampData } from '../types';
import { Axis } from '../Axis';
import { area } from 'd3-shape';
import { min, max } from 'd3-array';
import { select, event } from 'd3-selection';
import { brushX } from 'd3-brush';
import { css } from 'goober';
import { ResizeObserver } from 'resize-observer';


interface RangeChartProps {
  name: string;
  height?: number;
  width?: number;
  margin?: Margin;
  y: string;
  data: TimestampArray;
  lineColour?: string;
  fillColour?: string;
  onBrush?: (extent: Date[]) => void;
  brushColour?: string;
}

interface RangeChartDefaultProps {
  height: number;
  width: number;
  margin?: Margin;
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
  private brush: SVGGElement;
  private brushSetup: any;
  private xScale: any;
  private chartSVG: HTMLBaseElement;
  private resizeOb: ResizeObserver;
  private brushClass: any;

  public constructor (props: RangeChartProps) {
    super(props);
    this.brushClass = css({
      '&>rect.handle': {
        fill: props.brushColour,
      },
    });
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

    const areaFunc = area<TimestampData>()
      .x((d) => this.xScale(d.timestamp))
      .y0(innerHeight)
      .y1((d) => yScale(+d[props.y]));

    return (
      <svg ref={(svg) => this.chartSVG = svg} class={props.name} height={height} width={width}>
        <g transform={`translate(${props.margin.left}, ${props.margin.top})`}>
          <Axis height={innerHeight} axisType='x' scale={this.xScale} />
          <Axis width={innerWidth} axisType='y' scale={yScale} grid={true} ticks={0} />
          <path d={areaFunc(props.data)}
            strokeLinecap='round' stroke={props.lineColour} fill={props.fillColour} stroke-width='1px' />
          <g ref={(brush) => this.brush = brush} class={this.brushClass}></g>
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
    select(this.brush).call(this.brushSetup.move, null);
  }

  private resizeChart (): void {
    const parent = this.chartSVG.parentElement;
    const cr = parent.getBoundingClientRect();
    const width = cr.width;
    const height = cr.height;
    const innerWidth = width - this.props.margin.left - this.props.margin.right;
    const innerHeight = height - this.props.margin.top - this.props.margin.bottom;
    this.xScale.range([0, innerWidth]);
    this.brushSetup = brushX()
      .extent([
        [0, 0],
        [innerWidth, innerHeight],
      ])
      .handleSize(10)
      .on('end', () => {
        const selection = (event.selection || [0, innerWidth]) as [number, number];
        const inverted = [this.xScale.invert(selection[0]), this.xScale.invert(selection[1])];
        this.setState({ extent: event.selection ? inverted : null });
        this.props.onBrush(inverted);
      });
    const brushSelection = select(this.brush);
    brushSelection.call(this.brushSetup);
    const brushMove = (this.state.extent === null || this.state.extent === undefined) ?
      null :
      [this.xScale(this.state.extent[0]), this.xScale(this.state.extent[1])];
    brushSelection.call(this.brushSetup.move, brushMove);
    this.setState({ innerWidth, innerHeight, height, width });
  }
}
