import { TreeItem, TreeView } from "@mui/lab";
import { Box, FormControl, FormGroup, FormLabel, Input, InputAdornment, List, ListItem, ListItemButton, Slider, Tab, Tabs, TextField, Tooltip, Typography } from "@mui/material";
import { convert } from "html-to-text";
import { useContext, useState } from "react";
import { CirclePicker, HuePicker, SketchPicker, SliderPicker, SwatchesPicker } from "react-color";
import { LeyLine } from "../../core/LeyLine";
import IconButton from "../Button/IconButton";
import ContextMenu from "../ContextMenu/ContextMenu";
import ConfirmDialog from "../Dialog/ConfirmDialog";
import NameDialog from "../Dialog/NameDialog";
import Remix from "../Icon/Remix";
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