import './Akasha.css';
import Msg from "./components/Msg/Msg";
import LeyLines from "./core/LeyLine";
import App from "./pages/App";

export default function Akasha() {

    return (
        <LeyLines>
            <App/>
            <Msg/>
        </LeyLines>
    )
}
