import { Snackbar, Alert, CircularProgress, Backdrop } from "@mui/material";
import { useContext } from "react";
import { LeyLine } from "../../core/LeyLine";

const MessageType = (typeId) => {
    const types = [
        'info',
        'success',
        'warning',
        'error'
    ]
    return types[typeId]
}

export default function Message({
    backDrop = false,
    on = false,
    type = 0,
    loading = false,
    text = ''
}) {

    return (
        <Backdrop open sx={{ zIndex: 999 }}>
            <Snackbar
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                open={on}
                sx={{ '& .msg': { boxShadow: '0px 0px 11px 0px rgb(70 70 70 / 10%)', width: '100%' } }}
            >
                <Alert
                    className="Message"
                    severity={MessageType(type)}
                    icon={loading ? <CircularProgress size={21} color={'inherit'} /> : undefined}
                >
                    {text}
                </Alert>

            </Snackbar>
        </Backdrop>
    )
}