import { h, Component, VNode } from 'preact';
import { NumberTuple, Margin } from '../types';

interface BrushProps {
  height: number;
  width: number;
  margin: Margin;
  handleSize?: number;
  onBrushEnd?: (extent: NumberTuple | null) => void;
  onBrushStart?: (extent: NumberTuple) => void;
  onBrush?: (extent: NumberTuple) => void;
}

interface BrushState {
  extent: NumberTuple | null;
  relExtent: NumberTuple | null;
  mouseDown: boolean;
  mouseDownTime?: number;
  brushExtentIndex: 0 | 1 | 'init' | 'move';
}

export class BrushX extends Component<BrushProps, BrushState> {
  public static defaultProps = {
    onBrush: () => {},
    onBrushStart: () => {},
    onBrushEnd: () => {},
    handleSize: 10,
  }

  public constructor (props: BrushProps) {
    super(props);
    this.state = {
      extent: null,
      relExtent: null,
      mouseDown: false,
      brushExtentIndex: 1,
    };
  }
  public render ({ height, width, handleSize }: BrushProps, { extent }: BrushState): VNode {
    if (extent && extent[0] === extent[1]) extent = null;
    return (
      <g onMouseLeave={this.handleMouseUp} onMouseMove={this.handleMouseMove} onMouseUp={this.handleMouseUp}>
        <rect x='0' y='0' height={height} width={width} fill='none' pointer-events='all' cursor='crosshair'
          onMouseDown={this.handleMouseDown} />
        {
          extent &&
            <rect height={height} x={extent[0]} width={extent[1] - extent[0]} fill='rgba(100,100,100,0.35)'
              stroke='currentColor' cursor='move'
              onMouseDown={() => this.setState({ mouseDown: true, brushExtentIndex: 'move' })} />
        }
        {
          extent &&
            <rect height={height + 10} y='-5' width={handleSize} x={extent[0] - (handleSize / 2)}
              fill='darkgoldenrod' cursor='ew-resize'
              onMouseDown={() => this.setState({ brushExtentIndex: 0, mouseDown: true })} />
        }
        {
          extent &&
            <rect height={height + 10} y='-5' width={handleSize} x={extent[1] - (handleSize / 2)}
              fill='darkgoldenrod' cursor='ew-resize'
              onMouseDown={() => this.setState({ brushExtentIndex: 1, mouseDown: true })} />
        }
      </g>
    );
  }

  public componentWillReceiveProps (newProps: BrushProps): void {
    const width = newProps.width;
    const extent = this.state.relExtent ? this.state.relExtent.map((d) => d * width) as NumberTuple : null;
    this.setState({ extent });
  }

  private handleMouseDown = (evt: MouseEvent) => {
    const loc = evt.offsetX - this.props.margin.left;
    const extent = [loc, loc] as NumberTuple;
    const relExtent = extent.map((d) => d / this.props.width) as NumberTuple;
    this.props.onBrushStart(extent);
    this.setState({ mouseDown: true, extent, brushExtentIndex: 'init', relExtent, mouseDownTime: +Date.now() });
  }

  private handleMouseMove = (evt: MouseEvent) => {
    if (!this.state.mouseDown) return;
    const extent = [...this.state.extent] as NumberTuple;
    if (this.state.brushExtentIndex !== 'move' && this.state.brushExtentIndex !== 'init') {
      const loc = evt.offsetX - this.props.margin.left;
      extent[this.state.brushExtentIndex] = loc < 0 ?
        0 :
        loc > this.props.width ?
          this.props.width :
          loc;
    } else if (this.state.brushExtentIndex === 'move') {
      const extentWidth = extent[1] - extent[0];
      const extentMid = extentWidth / 2;
      const newPoint = evt.offsetX - this.props.margin.left;
      const startLoc = (newPoint - extentMid >= 0 ? newPoint - extentMid : 0);
      const endLoc = (newPoint + extentMid >= this.props.width ? this.props.width : newPoint + extentMid);
      extent[0] = startLoc;
      extent[1] = endLoc;
    } else if (this.state.brushExtentIndex === 'init') {
      const newLoc = evt.offsetX - this.props.margin.left;
      const loc = newLoc < 0 ?
        0 :
        newLoc > this.props.width ?
          this.props.width :
          newLoc;
      const dir = (newLoc <= extent[0]) ? 0 : 1;
      extent[dir] = loc;
    }
    const relExtent = extent.map((d) => d / this.props.width) as NumberTuple;
    this.props.onBrush(extent);
    this.setState({ extent, relExtent });
  }

  private handleMouseUp = () => {
    if (!this.state.mouseDown) return;
    const timeDiff = +Date.now() - this.state.mouseDownTime;
    let extent = this.state.extent;
    if (timeDiff < 100) {
      extent = null;
    }
    this.props.onBrushEnd(extent ? ([...extent] as NumberTuple) : extent);
    this.setState({ mouseDown: false, extent });
  }
}
