import { h, Component, VNode } from 'preact';
import { Axis } from '../Axis';
import { Margin } from '../types';
import { scaleBand, scaleTime, ScaleTime, ScaleBand } from 'd3-scale';
import { min, max } from 'd3-array';
import { pluck } from '../Utils/pluck';

declare const ResizeObserver: any;

interface GanttData {
  start: Date;
  end: Date;
  [key: string]: string | number | Date;
}

interface GanttChartProps {
  name: string;
  data: GanttData[];
  x: string;
  y: string;
  onBarClick?: (bar: GanttData) => void;
  height?: number;
  width?: number;
  margin?: Margin;
  ticks?: number;
  extent?: Date[];
}

interface GanttChartDefaultProps {
  height?: number;
  width?: number;
  margin?: Margin;
  ticks?: number;
  extent?: Date[];
  onBarClick?: () => void;
}

interface GanttChartState {
  width: number;
  innerWidth: number;
  height: number;
  innerHeight: number;
}
export class GanttChart extends Component<GanttChartProps, GanttChartState> {
  public static defaultProps: GanttChartDefaultProps = {
    height: 800,
    width: 600,
    margin: {
      top: 25,
      right: 25,
      bottom: 50,
      left: 150,
    },
    ticks: 6,
    extent: [],
    onBarClick: () => {},
  };

  private chartSVG: HTMLBaseElement
  private resizeOb: any;
  private xScale: any;

  public constructor (props: GanttChartProps) {
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
  public render (props: GanttChartProps,
    { height, width, innerHeight, innerWidth }: GanttChartState): VNode {

    const xDomain = props.extent.length > 0 ?
      props.extent :
      [min(props.data, (d) => d.start), max(props.data, (d) => d.end)];

    this.xScale = scaleTime()
      .range([0, innerWidth])
      .domain(xDomain);

    const yScale = scaleBand()
      .rangeRound([innerHeight, 0])
      .paddingInner(0.1);

    yScale.domain(pluck(props.data, props.y) as string[]);

    return (
      <svg ref={(svg) => this.chartSVG = svg} class={name} height={height} width={width}>
        <g transform={`translate(${props.margin.left}, ${props.margin.top})`}>
          <Axis height={innerHeight} axisType='x' scale={this.xScale} rotateScaleText={false} grid={true} />
          <Axis width={innerWidth} axisType='y' scale={yScale} ticks={props.ticks} />
          {
            props.data &&
              this.createBars(this.xScale, yScale)
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

  private createBars = (xScale: ScaleTime<Date, number>, yScale: ScaleBand<string>) => {
    return this.props.data.map((bar) =>
      <rect class='ganttBar' height={yScale.bandwidth()} y={yScale(bar[this.props.y] as string)} x={xScale(bar.start)}
        width={xScale(bar.end) - xScale(bar.start)} onClick={() => this.props.onBarClick(bar)}></rect>
    );
  }
};
