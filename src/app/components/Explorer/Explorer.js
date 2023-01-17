import { TreeItem, TreeView } from "@mui/lab";
import { Box, Typography } from "@mui/material";
import { useContext, useState } from "react";
import { LeyLine } from "../../core/LeyLine";
import Sys from "../../core/sys";
import ContextMenu from "../../templates/ContextMenu";
import IconButton from "../Button/IconButton";
import Remix from "../Icon/Remix";

export default function Explorer() {

    const { Api, Service, Irminsul } = useContext(LeyLine)

    const [staMenuOn, setStaMenuOn] = useState(false)
    const [objEvent, setObjEvent] = useState({})

    const onContextMenu = (event) => {
        event.stopPropagation()
        event.preventDefault()
        setObjEvent(event)
        setStaMenuOn(true)
    }

    const renderTree = (obj, parentKey = '') =>
        Object.keys(obj).map(
            i => {
                let nodeId = parentKey === '' ? i : parentKey + '=>' + i
                return (
                    <TreeItem
                        nodeId={nodeId}
                        key={nodeId}
                        label={<div id={nodeId} onContextMenu={onContextMenu}>{obj[i].name}</div>}
                    >
                        {
                            obj[i]._ ? renderTree(obj[i]._, nodeId) : null
                        }
                    </TreeItem>
                )

            }
        )

    return (
        <>
            <Box className='ExplorerHeader'>
                <Typography component={'h1'}>{Irminsul.name}</Typography>
                <IconButton icon={<Remix.add />} />
            </Box>
            <TreeView
                className="Explorer"
                aria-label="Explorer"
                onNodeSelect={(e, i) => Service.Node.set(i)}
                defaultCollapseIcon={<Remix.arrowLineDown />}
                defaultExpandIcon={<Remix.arrowLineRight />}
            >
                {renderTree(Irminsul._)}
            </TreeView>
            <ContextMenu
                on={staMenuOn}
                onClose={() => setStaMenuOn(false)}
                event={objEvent}
                menus={[
                    { name: 'Add a Child Node' },
                    { name: 'Move Node to...' },
                    { name: 'Rename' },
                    { name: 'Delete' },
                ]}
            />
        </>
    )
}