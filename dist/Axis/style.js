import { style } from 'typestyle';
// CSS
export const tickLabel = style({
    fontSize: '1em',
    cursor: 'default',
    $nest: {
        '&>.tick>line': {
            strokeWidth: '1px',
            stroke: 'var(--font-color-normal)',
            strokeOpacity: 0.5,
            shapeRendering: 'crispEdges',
        },
        '&>path': {
            strokeWidth: '2px',
        },
    },
});
export const gridStyle = style({
    $nest: {
        '&>path': {
            stroke: 'none',
        },
        '&>.tick>line': {
            strokeWidth: '1px',
            strokeOpacity: 0.5,
        },
    },
});
//# sourceMappingURL=style.js.map