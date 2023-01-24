import { IconButton as Button, Tooltip } from "@mui/material";

export default function IconButton({
    className = '',
    gray,
    icon,
    on,
    onClick,
    rotate,
    size = 30,
    tooltip,
    tooltipPosition = 'top',
    component,
    disabled
}) {

    // Styles
    const sx = {
        width: `${size}px`,
        height: `${size}px`,
        minWidth: `${size}px`,
        minHeight: `${size}px`,
        margin: '0 1px',
        padding: 0,
        transform: `rotate(${rotate ? on ? -90 : 0 : 0}deg)`,
        transition: 'all .3s ease',
        '& svg': {
            width: `${size * 0.66}px`,
            height: `${size * 0.66}px`,
            minWidth: `${size * 0.66}px`,
            minHeight: `${size * 0.66}px`,
        }
    }

    return tooltip ?
        <Tooltip title={tooltip} placement={tooltipPosition} arrow enterDelay={1000}>
            <Button className={className} disabled={disabled} component={component} color={gray ? 'default' : on === true ? 'secondary' : on === false ? 'primary' : 'primary'} onClick={onClick} sx={sx} >
                {icon}
            </Button>
        </Tooltip>
        :
        <Button className={className} disabled={disabled} component={component} color={gray ? 'default' : on === true ? 'secondary' : on === false ? 'primary' : 'primary'} onClick={onClick} sx={sx} >
            {icon}
        </Button>
}