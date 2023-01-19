import { Box, createTheme, ThemeProvider } from '@mui/material'
import { useContext, useEffect, useState } from 'react'
import { LeyLine } from '../core/LeyLine'

export default function Page({
    children,
    defaultColor = false,
    sx = {},
    z = 10,
    visibleAfter = 0,
}) {

    // LeyLine
    const { color } = useContext(LeyLine)

    // States
    const [pageVisible, _pageVisible] = useState(false)

    // Styles
    const theme = createTheme({
        palette: {
            type: 'light', primary: {
                main: defaultColor ? '#43a047' : color.primary,
            }, secondary: {
                main: defaultColor ? '#81c784' : color.secondary,
            },
        }, typography: {
            fontFamily: `-apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, 'Apple color Emoji', Arial, sans-serif, 'Segoe UI Emoji', 'Segoe UI Symbol'`,
        },
    })

    // Effects
    useEffect(() => {
        setTimeout(() => {
            _pageVisible(true)
        }, visibleAfter * 1000);
    }, [])

    return (
        <ThemeProvider theme={theme}>
            <Box className='Page' sx={{
                opacity: pageVisible ? 1 : 0,
                position: 'absolute',
                overflow: 'hidden',
                width: '100vw',
                height: '100vh',
                display: 'flex',
                zIndex: z, ...sx
            }}>
                {children}
            </Box>
        </ThemeProvider>
    )
}
