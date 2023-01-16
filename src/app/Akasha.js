import { BrowserRouter, Route, Routes } from "react-router-dom";
import './Akasha.css';
import LeyLines from "./Core/LeyLine";
import App from "./Page/App";

function Akasha() {
    return (
        <LeyLines>
            <BrowserRouter>
                <Routes>
                    <Route path={'/app'} />
                    <Route path={'*'} element={<App />} />
                </Routes>
            </BrowserRouter>
        </LeyLines>
    )
}

export default Akasha

