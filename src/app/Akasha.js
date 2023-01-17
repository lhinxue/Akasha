import { BrowserRouter, Route, Routes } from "react-router-dom";
import './Akasha.css';
import Alert from "./components/Alert/Alert";
import LeyLines from "./core/LeyLine";
import App from "./pages/App";

function Akasha() {
    return (
        <LeyLines>
            <BrowserRouter>
                <Routes>
                    <Route path={'/app'} />
                    <Route path={'*'} element={<App />} />
                </Routes>
            </BrowserRouter>
            <Alert />
        </LeyLines>
    )
}

export default Akasha

