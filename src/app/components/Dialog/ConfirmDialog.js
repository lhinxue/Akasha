import { TextField } from "@mui/material";
import { useState } from "react";
import Dialog from "../../templates/Dialog";

export default function ConfirmDialog({
    on,
    onClose: p_onClose,
    onSubmit: p_onSubmit,
    title,
    message,
}) {

    const [name, setName] = useState('')

    const onClose = () => {
        p_onClose()
        setName('')
    }
    const onSubmit = () => {
        p_onSubmit(name)
        setName('')
    }

    return (
        <Dialog
            noTitle
            on={on}
            onClose={onClose}
            onSubmit={onSubmit}
            title={title}
            allowSubmit
            warning
        >
            {message}
        </Dialog>
    )
}