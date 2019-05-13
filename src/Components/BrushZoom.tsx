import { h, Component, VNode } from 'preact';
import { NumberTuple, Margin } from '../types';

interface BrushProps {
  height: number;
  width: number;
  margin: Margin;
  onBrush?: (extent: [NumberTuple, NumberTuple] | null) => void;
}

interface BrushState {
  extent: [NumberTuple, NumberTuple] | null;
  mouseDown: boolean;
}

export class BrushZoom extends Component<BrushProps, BrushState> {
  public static defaultProps = {
    onBrush: () => {},
  }

  public constructor (props: BrushProps) {
    super(props);
    this.state = {
      extent: null,
      mouseDown: false,
    };
  }
  public render ({ height, width }: BrushProps, { extent, mouseDown }: BrushState): VNode {
    return (
      <g onMouseMove={this.handleMouseMove} onMouseUp={this.handleMouseUp}
        onDblClick={this.handleDblClick} onMouseDown={this.handleMouseDown}>
        <rect x='0' y='0' height={height} width={width} fill='none' pointer-events='all' cursor='crosshair'
        />
        {
          (extent !== null && mouseDown) &&
            <rect x={extent[0][0]} y={extent[1][1]} width={extent[1][0] - extent[0][0]}
              height={extent[0][1] - extent[1][1]}
              fill='rgba(100,100,100,0.35)'
              stroke='currentColor'
              onMouseDown={() => this.setState({ mouseDown: true, })} />
        }
      </g>
    );
  }

  private handleMouseDown = (evt: MouseEvent) => {
    evt.preventDefault();
    evt.stopPropagation();
    evt.stopImmediatePropagation();
    const xLoc = evt.offsetX - this.props.margin.left;
    const yLoc = evt.offsetY - this.props.margin.top;
    const extent = [[xLoc, yLoc], [xLoc, yLoc]] as [NumberTuple, NumberTuple];
    this.setState({ mouseDown: true, extent });
  }

  private handleMouseMove = (evt: MouseEvent) => {
    if (!this.state.mouseDown) return;
    const xLoc = evt.offsetX - this.props.margin.left;
    const yLoc = evt.offsetY - this.props.margin.top;
    const extent = [...this.state.extent] as [NumberTuple, NumberTuple]; // extent [[sX, sY], [eX, eY]]
    if (xLoc < extent[0][0]) {
      extent[0][0] = xLoc;
    } else if (xLoc > extent[0][0]) {
      extent[1][0] = xLoc;
    }
    if (yLoc < extent[1][1]) {
      extent[1][1] = yLoc;
    } else if (yLoc > extent[1][1]) {
      extent[0][1] = yLoc;
    }
    this.setState({ extent });
  }

  private handleMouseUp = (evt: MouseEvent) => {
    evt.preventDefault();
    evt.stopPropagation();
    evt.stopImmediatePropagation();
    if (!this.state.mouseDown) return;
    this.props.onBrush(this.state.extent);
    this.setState({ mouseDown: false, extent: null });
  }

  private handleDblClick = () => {
    this.props.onBrush(null);
    this.setState({ mouseDown: false, extent: null });
  }
}
