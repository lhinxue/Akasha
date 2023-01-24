import { Box, FormGroup, FormLabel, Input } from "@mui/material";
import { useContext, useState } from "react";
import { LeyLine } from "../../core/LeyLine";
export default function Credential() {

    // LeyLine
    const { api, os, irminsul } = useContext(LeyLine)

    // Color
    const [color, _color] = useState(123)
    return (
        <>
            <Box>
                <FormGroup>
                    <FormLabel>
                        Database Name
                    </FormLabel>
                    <Input value={irminsul.name} onChange={e => os._irminsulName(e.target.value)} />
                </FormGroup>
                <FormGroup>
                    <FormLabel>
                        Password
                    </FormLabel>
                    <Input value={api.key} onChange={e => os._apiKey(e.target.value)} type='password' />
                </FormGroup>
            </Box>

        </>
    )

}