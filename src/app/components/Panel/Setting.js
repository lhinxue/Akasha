import { Box, FormGroup, FormLabel, Slider } from "@mui/material";
import { useContext, useState } from "react";
import { LeyLine } from "../../core/LeyLine";
export default function Setting() {

    // LeyLine
    const { api, os, irminsul } = useContext(LeyLine)

    // Color
    const [color, _color] = useState(123)
    return (
        <>
            <Box>
                <FormGroup>
                    <FormLabel>
                        Color
                    </FormLabel>
                    <Slider value={color} max={360} onChange={(e, v) => _color(v)} onChangeCommitted={(e, v) => os._color(v)} />

                </FormGroup>
            </Box>
        </>
    )

}