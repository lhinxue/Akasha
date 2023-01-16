import {SvgIcon} from "@mui/material";

const Remix = {
    menuFold: props => {
        return <SvgIcon {...props}>
            <path fill="none" d="M0 0H24V24H0z"/>
            <path
                d="M21 18v2H3v-2h18zM6.596 3.904L8.01 5.318 4.828 8.5l3.182 3.182-1.414 1.414L2 8.5l4.596-4.596zM21 11v2h-9v-2h9zm0-7v2h-9V4h9z"/>
        </SvgIcon>
    }, menuUnfold: props => {
        return <SvgIcon {...props}>
            <path fill="none" d="M0 0H24V24H0z"/>
            <path
                d="M21 18v2H3v-2h18zM17.404 3.904L22 8.5l-4.596 4.596-1.414-1.414L19.172 8.5 15.99 5.318l1.414-1.414zM12 11v2H3v-2h9zm0-7v2H3V4h9z"/>
        </SvgIcon>
    },
}

export default Remix