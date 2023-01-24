import { useTheme } from '@mui/material';
import { useContext, useEffect } from 'react';
import Editor from '../components/Editor/Editor';
import Sidebar from '../components/Sidebar/Sidebar';
import { LeyLine } from '../core/LeyLine';
import Page from '../templates/Page';
import Terminal from './Terminal';

export default function App() {

    // LeyLine
    const {
        api,
        color,
        os,
        terminal
    } = useContext(LeyLine)

    // Effects
    useEffect(() => {
        if (api.key === '')
            os.terminalOn()
    }, [])

    // Styles
    const sx = `
html,
body,
#Akasha {
    margin: 0;
    padding: 0;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}

code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New', monospace;
}

::-webkit-scrollbar {
    width: 6px;
}

::-webkit-scrollbar-track {
    background-color: ${color.primary}11;
}

::-webkit-scrollbar-thumb {
    border-radius: 8px;
    background-color: ${color.primary}66;
}
    `

    return (
        <>
            <Page visibleAfter={3}>
                <Sidebar />
                <Editor />
            </Page>
            {terminal ? <Terminal /> : null}
            <style dangerouslySetInnerHTML={{ __html: sx }} />
        </>
    )
}