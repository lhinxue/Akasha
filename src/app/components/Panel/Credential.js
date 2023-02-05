import { Box, FormGroup, FormLabel, Input, Typography } from "@mui/material";
import { useContext, useState } from "react";
import { LeyLine } from "../../core/LeyLine";
export default function Credential() {

    // LeyLine
    const { api, os, irminsul } = useContext(LeyLine)

    return (
        <>
        <Typography component={'h1'}>Credential</Typography>
            <Box>
                

                <FormGroup>
                    <FormLabel>
                        Name
                    </FormLabel>
                    <Input value={irminsul.name} onChange={e => os._irminsulName(e.target.value)} />
                </FormGroup>
                <FormGroup>
                    <FormLabel>
                        Key
                    </FormLabel>
                    <Input value={api.key} onChange={e => os._apiKey(e.target.value)} type='password' />
                </FormGroup>
            </Box>

        </>
    )

}