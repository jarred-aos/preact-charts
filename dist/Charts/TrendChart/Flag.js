import { h, Component } from 'preact';
import { style } from 'typestyle';
const flagStyle = style({
    fill: 'gray',
    strokeWidth: 1,
    strokeOpacity: 0.9,
    fillOpacity: 0.45,
    stroke: 'lightgray',
    $nest: {
        '&:hover': {
            fill: 'lightgray',
        },
    },
});
const topperDefault = style({
    fill: 'red',
    fillOpacity: 1,
});
const topperClicked = style({
    fill: 'lawngreen',
    fillOpacity: 1,
});
export class Flag extends Component {
    constructor(props) {
        super(props);
        this.handleFlagClick = (e) => {
            e.stopPropagation();
            this.props.onClick(this.props.event);
        };
    }
    render({ xScale, height, start, end, chartName, isClicked }) {
        return (h("g", { class: flagStyle, onClick: this.handleFlagClick, "clip-path": `url(#${chartName}_cp)` },
            h("path", { d: `M ${xScale(start)} \
                        ${height} H ${xScale(end)} V 20 H ${xScale(start)} V ${height}` }),
            h("path", { class: isClicked ? topperClicked : topperDefault, d: `M ${xScale(end)} \
                        20 L ${xScale(end)} 0 L ${xScale(end) - 15} 8 L \
                        ${xScale(end)} 16 V 20` })));
    }
}
Flag.defaultProps = {
    onClick: () => { },
    idx: 0,
    event: 0,
    start: '',
    end: '',
    type: '',
    sub_type: '',
    comment: null,
    chartName: '',
    isClicked: false,
};
//# sourceMappingURL=Flag.js.map