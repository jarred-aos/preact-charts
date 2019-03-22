import { h, Component, VNode } from 'preact';
import { Axis } from '../Axis';
import { Margin } from '../types';
import { scaleBand, scaleTime } from 'd3-scale';
import { min, max } from 'd3-array';
import { pluck } from '../Utils/pluck';
import { css } from 'goober';

declare const ResizeObserver: any;

const barClass = css({
  stroke: 'currentColor',
});

export interface GanttData {
  start: Date;
  end: Date;
  idx: number;
  [key: string]: Date | string | number | any;
}

interface GanttChartProps {
  name: string;
  data: GanttData[];
  x: string;
  y: string;
  onBarClick?: (bar: any) => void;
  highLightBars?: string[];
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
  clickedBar: number;
}
export class GanttChart extends Component<GanttChartProps, GanttChartState> {
  public static defaultProps: GanttChartDefaultProps = {
    height: 800,
    width: 600,
    margin: {
      top: 25,
      right: 45,
      bottom: 50,
      left: 150,
    },
    ticks: 6,
    extent: [],
    onBarClick: () => {},
  };

  private chartSVG: HTMLBaseElement
  private resizeOb: any;

  public constructor (props: GanttChartProps) {
    super(props);
    const innerWidth = props.width - props.margin.left - props.margin.right;
    const innerHeight = props.height - props.margin.top - props.margin.bottom;
    this.state = {
      width: props.width,
      height: props.height,
      innerWidth,
      innerHeight,
      clickedBar: null,
    };
  }
  public render (props: GanttChartProps,
    { height, width, innerHeight, innerWidth }: GanttChartState): VNode {

    const xDomain = props.extent.length > 0 ?
      props.extent :
      [min(props.data, (d) => d.start), max(props.data, (d) => d.end)];

    const xScale = scaleTime()
      .range([0, innerWidth])
      .domain(xDomain);

    const yScale = scaleBand()
      .rangeRound([innerHeight, 0])
      .paddingInner(0.1);

    yScale.domain(pluck(props.data, props.y) as string[]);

    return (
      <svg ref={(svg) => this.chartSVG = svg} class={name} height={height} width={width}>
        <g transform={`translate(${props.margin.left}, ${props.margin.top})`}>
          <clipPath id={`${props.name}_cp`}>
            <rect width={innerWidth} height={innerHeight} />
          </clipPath>
          <Axis height={innerHeight} axisType='x' scale={xScale} rotateScaleText={false} grid={true} />
          <Axis width={innerWidth} axisType='y' scale={yScale} ticks={props.ticks} />
          {
            props.data.map((bar) =>
              <rect class={barClass} clip-path={`url(#${props.name}_cp)`} height={yScale.bandwidth()}
                y={yScale(bar[this.props.y] as string)} x={xScale(bar.start)}
                width={xScale(bar.end) - xScale(bar.start)}
                onClick={() => this.handleBarClick(bar as any)}
                fill={bar.idx === this.state.clickedBar ? 'orangered' : 'steelblue'}
              />
            )
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

  private handleBarClick = (bar: any) => {
    this.setState({ clickedBar: bar.idx });
    this.props.onBarClick(bar);
  }
};
