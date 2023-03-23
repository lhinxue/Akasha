import { Box } from "@mui/material";

export default function ReadOnly({
    className,
    sx,
    readOnly,
    children
}) {
    return (
        <Box className={className} sx={sx}>
            <Box sx={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                backgroundColor: 'white',
                zIndex: 900,
                opacity:0.7,
                display: readOnly ? 'block' : 'none'
            }} />
            {children}
        </Box>
    )
}