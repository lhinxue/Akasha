import { Button, Tooltip } from "@mui/material";

export default function AbsButton(props) {
    const icon = props.icon
    const onClick = props.onClick
    const bottom = props.bottom
    const right = props.right
    const size = props.size
    const tooltip = props.tooltip

    const style = {
        backgroundColor: 'white',
        position: 'absolute',
        bottom: bottom,
        right: right,
        borderRadius: '50%',
        width: `${size}px`,
        minWidth: `${size}px`,
        height: `${size}px`,
        minHeight: `${size}px`,
        boxShadow: '2px 2px 6px 0px rgba(70, 70, 70, 0.1)',
        '&:hover': {
            backgroundColor: 'white',
        },
        '& svg': {
            height: `${size * .5}px`,
            width: `${size * .5}px`
        }
    }

    return (
        <>
            {
                tooltip ?
                    <Tooltip title={tooltip} placement="left" arrow enterDelay={1000}>
                        <Button variant='outlined' sx={style} onClick={onClick} >
                            {icon}
                        </Button>
                    </Tooltip>
                    :
                    <Button variant='outlined' sx={style} onClick={onClick} >
                        {icon}
                    </Button>
            }
        </>
    )
}