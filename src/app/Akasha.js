import { BrowserRouter, Route, Routes } from "react-router-dom";
import './Akasha.css';
import Alert from "./components/Alert/Alert";
import LeyLines from "./core/LeyLine";
import App from "./pages/App";
import Terminal from "./pages/Terminal";

function Akasha() {
    return (
        <LeyLines>
            <App />
            <Terminal />
            <Alert />
        </LeyLines>
    )
}

export default Akasha

