import { TextField } from "@mui/material";
import { useState } from "react";
import Dialog from "../../templates/Dialog";

export default function NameDialog({
    on,
    onClose: p_onClose,
    onSubmit: p_onSubmit,
    title,
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
            on={on}
            onClose={onClose}
            onSubmit={onSubmit}
            title={title}
            allowSubmit={name.trim() !== ''}
        >
            <TextField
                autoComplete="off"
                error={name.trim() === ''}
                autoFocus
                fullWidth
                id={'name'}
                key={'name'}
                label={'Name'}
                margin="dense"
                onChange={(e) => setName(e.target.value)}
                value={name}
                variant="standard"
                helperText='Name must not be empty.'
            />
        </Dialog>
    )
}