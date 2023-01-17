import { Snackbar, Alert as MuiAlert } from "@mui/material";
import { useContext } from "react";
import { LeyLine } from "../../core/LeyLine";

export default function Alert() {
    const { Api } = useContext(LeyLine)

    return (
        <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center' }} open={Api.Alert.on} sx={{
            '& .Alert': {
                boxShadow: '0px 0px 11px 0px rgb(70 70 70 / 10%)',
                width: '100%'
            }
        }}>
            <MuiAlert className="Alert" severity={Api.Alert.type ?? 'info'}>{Api.Alert.message}</MuiAlert>
        </Snackbar>
    )
}