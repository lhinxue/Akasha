import { useContext, useEffect } from "react";
import Editor from "../components/Editor/Editor";
import Sidebar from "../components/Sidebar/Sidebar";
import { LeyLine } from "../core/LeyLine";
import Page from "../templates/Page";
import Terminal from "./Terminal";

export default function App() {

    // LeyLine
    const {
        api,
        os,
        terminal
    } = useContext(LeyLine)

    // Effects
    useEffect(() => {
        if (api.key === '')
            os.terminalOn()
    }, [])

    return (
        <>
            <Page visibleAfter={3}>
                <Sidebar />
                <Editor />
            </Page>
            {terminal ? <Terminal /> : null}
        </>
    )
}