import { FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { useState } from "react";
import InquirerBase from "./__base";

export default function OptionDialog({
    on,
    onClose: p_onClose,
    onSubmit: p_onSubmit,
    data,
}) {

    const [choice, setChoice] = useState(undefined)

    const onClose = () => {
        p_onClose()
        setChoice(undefined)
    }
    const onSubmit = () => {
        p_onSubmit(choice)
        setChoice(undefined)
    }

    return (
        <InquirerBase
            on={on}
            onClose={onClose}
            onSubmit={onSubmit}
            title={data.title}
            allowSubmit={choice && choice !== data.default}
        >
            <FormControl fullWidth>
                <Select
                    fullWidth
                    margin="dense"
                    value={choice ?? data.default}
                    onChange={(e) => setChoice(e.target.value)}
                >
                    {
                        data.options ?
                            data.options.map(op => <MenuItem key={op} value={op}>{data.getName(op)}</MenuItem>) : <></>
                    }
                </Select>
            </FormControl>
        </InquirerBase>
    )
}