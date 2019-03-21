import { h, Component, VNode } from 'preact';
import { Axis } from '../Axis';
import { DataArray, Margin } from '../types';
import { extent } from 'd3-array';

declare const ResizeObserver: any;

interface GanttChartProps {
  name: string;
  data: DataArray;
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
    };
  }
  public render ({ margin, ticks, data }: GanttChartProps,
    { height, width, innerHeight, innerWidth }: GanttChartState): VNode {
    return (
      <svg ref={(svg) => this.chartSVG = svg} class={name} height={height} width={width}>
        <g transform={`translate(${margin.left}, ${margin.top})`}>
          <Axis height={innerHeight} axisType='x' scale={xScale} rotateScaleText={false} grid={true} />
          <Axis width={innerWidth} axisType='y' scale={yScale} ticks={ticks} />
          {
            // data &&
            // this.createBars(yScale, y1, xScale, groups, colourScale)
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
};
