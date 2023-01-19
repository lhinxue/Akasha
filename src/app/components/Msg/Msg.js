import { Snackbar, Alert } from "@mui/material";
import { useContext } from "react";
import { LeyLine } from "../../core/LeyLine";

const MSG_TYPE = [
    'info',
    'success',
    'warning',
    'error'
]

export default function Msg() {

    // LeyLine
    const { msg } = useContext(LeyLine)

    return (
        <Snackbar
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            open={msg.on}
            sx={{ '& .msg': { boxShadow: '0px 0px 11px 0px rgb(70 70 70 / 10%)', width: '100%' } }}
        >
            <Alert className="Msg" severity={msg.type ? MSG_TYPE[msg.type] : MSG_TYPE[0]}>{msg.message}</Alert>
        </Snackbar>
    )
}