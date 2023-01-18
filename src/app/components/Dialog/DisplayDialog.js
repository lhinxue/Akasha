import { Box, TextField } from "@mui/material";
import { useState } from "react";
import Dialog from "../../templates/Dialog";

export default function DisplayDialog({
    on,
    onClose,
    title,
    children
}) {


    return (
        <Dialog
        noAction
            on={on}
            onClose={onClose}
            title={title}
            fullWidth
            closeButton
        >
            <Box sx={{
                height:'80vh'
            }}>
            {children}
            </Box>
            
        </Dialog>
    )
}