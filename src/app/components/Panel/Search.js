import { TreeItem, TreeView } from "@mui/lab";
import { Box, Input, InputAdornment, List, ListItem, ListItemButton, Tab, Tabs, Tooltip, Typography } from "@mui/material";
import { convert } from "html-to-text";
import { useContext, useState } from "react";
import { LeyLine } from "../../core/LeyLine";
import IconButton from "../Button/IconButton";
import ContextMenu from "../ContextMenu/ContextMenu";
import ConfirmDialog from "../Dialog/ConfirmDialog";
import NameDialog from "../Dialog/NameDialog";
import Remix from "../Icon/Remix";
export default function Search() {

    // LeyLine
    const { api, os, irminsul } = useContext(LeyLine)

    // States
    const [searchInput, _searchInput] = useState('')
    const [searchResult, _searchResult] = useState([])
    const [tabId, _tabId] = useState(false)

    // Functions
    const recursivelySearch = (ims, input, parentKey = '') => {
        if (Object.keys(ims).length === 0) {
            return []
        } else {
            let temp = []
            for (const i of Object.keys(ims)) {
                let nodeId = parentKey === '' ? i : parentKey + '=>' + i
                let html = convert(ims[i].content)
                if (html.search(new RegExp(input, "i")) !== -1)
                    temp.push(nodeId)
                temp = temp.concat(recursivelySearch(ims[i]._, input, nodeId))
            }
            return temp
        }
    }
    const searchIrminsul = () => _searchResult(recursivelySearch(irminsul._, searchInput))
    const renderName = key => os.getNode(key.split('=>'), 'name')

    return (
        <>
            <Input
                disableUnderline
                type={'text'}
                value={searchInput}
                onChange={e => _searchInput(e.target.value)}
                endAdornment={
                    <InputAdornment position='end'>
                        <IconButton icon={<Remix.eye fontSize='small' />} />
                        <IconButton icon={<Remix.arrowRightCircle fontSize='small' />} onClick={searchIrminsul} />
                    </InputAdornment>
                }
            />
            <Tabs
                onChange={(e, v) => _tabId(v)}
                value={tabId}
                orientation="vertical">
                {
                    searchResult.map((rl, i) =>
                        <Tab label={renderName(rl)} value={`srl${i}`} key={`srl${i}`} onClick={() => os._apiNode(rl)} />
                    )
                }
            </Tabs>
        </>
    )
















}