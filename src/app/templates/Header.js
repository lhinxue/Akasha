import { Box, Typography } from '@mui/material'
import IconControl from '../Control/IconControl'

export default function Header({
    children,
    fontStyle = {},
    height = 40,
    icons = [],
    onContextMenu = e => e.preventDefault(),
    z = 10,
}) {

    // Styles
    const sx = {
        alignItems: 'center',
        backgroundColor: 'white',
        borderBottom: '1px solid silver', boxShadow: '2px 2px 6px 0px rgba(70, 70, 70, 0.1)',
        display: 'flex',
        height: height,
        padding: '0 5px 0 20px',
        position: 'relative',
        zIndex: z,
        '& h1': {
            alignItems: 'center',
            display: 'flex',
            flexGrow: '1',
            margin: 0,
            ...fontStyle
        }
    }

    return (
        <Box sx={sx} onContextMenu={onContextMenu}>
            <Typography component='h1' color='primary'>
                {children}
            </Typography>
            {icons.map(btn =>
                <IconControl
                    on={btn.on}
                    onClick={btn.onClick}
                    icon={btn.icon}
                    rotate={btn.rotate}
                    tooltip={btn.tooltip}
                    tooltipPosition={'bottom'}
                />
            )}
        </Box>
    )
}