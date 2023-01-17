import { Menu, MenuItem } from '@mui/material'

export default function ContextMenu({
    on = false,
    event,
    menus = [],
    onClose,
    z = 30,
}) {

    const onDestroy = (e) => {
        e.preventDefault()
        onClose()
    }

    const sx = {
        zIndex: z,
        '& .MuiMenu-paper': {
            borderRadius: 0,
            boxShadow: '2px 2px 6px 0px rgba(0, 0, 0, 0.1)',
            width: 166,
            border: '1px solid silver'
        },
        '& ul': {
            paddingTop: 0,
            paddingBottom: 0
        },
        '& ul>li': {
            borderBottom: '1px solid silver',
            fontSize: 13,
            fontVariant: 'small-caps',
            letterSpacing: '.1em',
            padding: '1px 5px 3px 10px',
        },
        '& ul>li:last-child': {
            borderBottom: 0
        },

    }

    return (
        <Menu
            onContextMenu={onDestroy}
            onClick={onDestroy}
            elevation={0}
            color='primary'
            sx={sx}
            open={on}
            onClose={onClose}
            anchorReference='anchorPosition'
            anchorPosition={{ top: event.clientY, left: event.clientX }}
        >
            {
                menus.map(mn =>
                    <MenuItem color='primary' onClick={() => mn.onClick(event.target.id)}>
                        {mn.name}
                    </MenuItem>
                )
            }
        </Menu>
    )
}