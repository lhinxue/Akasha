import { Snackbar, Alert as MuiAlert } from "@mui/material";
import { useContext } from "react";
import { LeyLine } from "../../core/LeyLine";

const ALERT_TYPE = [
    'info',
    'success',
    'warning',
    'error'
]

export default function Alert() {
    const { Alert } = useContext(LeyLine)

    return (
        <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center' }} open={Alert.on} sx={{
            '& .Alert': {
                boxShadow: '0px 0px 11px 0px rgb(70 70 70 / 10%)',
                width: '100%'
            }
        }}>
            <MuiAlert className="Alert" severity={Alert.type ? ALERT_TYPE[Alert.type] : ALERT_TYPE[0]}>{Alert.message}</MuiAlert>
        </Snackbar>
    )
}