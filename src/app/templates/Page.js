import { Box, createTheme, ThemeProvider } from '@mui/material'
import { useContext } from 'react'
import { LeyLine } from '../core/LeyLine'

function Page({
    children,
    gray = false,
    sx = {},
    z = 10,
}) {

    // LeyLine
    const { Color } = useContext(LeyLine)

    // Theme
    const theme = createTheme({
        palette: {
            type: 'light', primary: {
                main: gray ? '#555555' : Color.primary,
            }, secondary: {
                main: gray ? '#aaaaaa' : Color.secondary,
            },
        }, typography: {
            fontFamily: `-apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, 'Apple Color Emoji', Arial, sans-serif, 'Segoe UI Emoji', 'Segoe UI Symbol'`,
        },
    })

    return (
        <ThemeProvider theme={theme}>
            <Box className='Page' sx={{ position: 'absolute', width: '100%', height: '100%', display: 'flex', zIndex: z, ...sx }}>
                {children}
            </Box>
        </ThemeProvider>
    )
}

export default Page
