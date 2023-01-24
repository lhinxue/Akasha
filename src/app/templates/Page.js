import { Box, createTheme, ThemeProvider } from '@mui/material'
import { useContext, useEffect, useState } from 'react'
import { LeyLine } from '../core/LeyLine'

export default function Page({
    children,
    defaultColor = false,
    sx = {},
    visibleAfter = 0,
    z = 10
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
                display: 'flex',
                height: '100vh',
                opacity: pageVisible ? 1 : 0,
                overflow: 'hidden',
                position: 'absolute',
                width: '100vw',
                zIndex: z,
                ...sx
            }}>
                {children}
            </Box>
        </ThemeProvider>
    )
}
