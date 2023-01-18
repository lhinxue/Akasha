import { TreeItem, TreeView } from "@mui/lab";
import { Box, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { LeyLine } from "../../core/LeyLine";
import ContextMenu from "../ContextMenu/ContextMenu";
import IconButton from "../Button/IconButton";
import Remix from "../Icon/Remix";
import Dialog from "../../templates/Dialog";
import NameDialog from "../Dialog/NameDialog";
import ConfirmDialog from "../Dialog/ConfirmDialog";

export default function Explorer() {

    const { Api, Service, Irminsul } = useContext(LeyLine)

    const [staMenuOn, setStaMenuOn] = useState(false)
    const [objEvent, setObjEvent] = useState({})

    const [contextMenuKey, setContextMenuKey] = useState('')
    const onContextMenu = (event) => {
        event.stopPropagation()
        event.preventDefault()
        setContextMenuKey(event.target.id)
        setObjEvent(event)
        setStaMenuOn(true)
    }

    const [treeMonitor, setTreeMonitor] = useState('')


    useEffect(() => {
        if (treeMonitor.mouseDown !== '' && treeMonitor.mouseUp !== '' && treeMonitor.mouseDown !== treeMonitor.mouseUp) {
            console.log('drag')
        }
    }, [treeMonitor])

    const renderTree = (obj, parentKey = '') =>
        Object.keys(obj).map(
            i => {
                let nodeId = parentKey === '' ? i : parentKey + '=>' + i
                return (
                    <TreeItem
                        nodeId={nodeId}
                        key={nodeId}
                        label={<div id={nodeId}
                            onMouseDown={(e) => setTreeMonitor(e.target.id)}
                            onMouseUp={(e) => {
                                if (treeMonitor !== '' && treeMonitor !== e.target.id) {
                                    moveTreeNode(treeMonitor.split('=>'), e.target.id.split('=>'))

                                }
                                setTreeMonitor('')
                            }}
                            onContextMenu={onContextMenu}>{obj[i].name}</div>}
                    >
                        {renderTree(obj[i]._, nodeId)}
                    </TreeItem>
                )

            }
        )


    const [nameDialogOn, setNameDialogOn] = useState(false)
    const [confirmationDialogOn, setConfirmationDialogOn] = useState(false)
    const [optionDialogOn, setOptionDialogOn] = useState(false)
    const [dialogSubmitMethod, setDialogSubmitMethod] = useState(0)
    const [dialogData, setDialogData] = useState({})
    const onMenuClick = {
        addRootNode: () => {
            setDialogData({
                title: 'Add a Node under "' + Irminsul.name + '"',
            })
            setDialogSubmitMethod(0)
            setNameDialogOn(true)
        },
        addNode: () => {
            setDialogData({
                title: 'Add a Child Node under "' + Service.getNode(contextMenuKey.split('=>'), 'name') + '"',
            })
            setDialogSubmitMethod(1)
            setNameDialogOn(true)
        },
        rename: () => {
            setDialogData({
                title: 'Rename Node "' + Service.getNode(contextMenuKey.split('=>'), 'name') + '"',
            })
            setDialogSubmitMethod(3)
            setNameDialogOn(true)
        },
        delete: () => {
            setDialogData({
                title: 'Dangerous Operation!',
                name: Service.getNode(contextMenuKey.split('=>'), 'name'),
                message: 'Are you sure to delete Node "' + Service.getNode(contextMenuKey.split('=>'), 'name') + '" ?',
            })
            setDialogSubmitMethod(4)
            setConfirmationDialogOn(true)
        }
    }

    const onDialogSubmit = (data) => {
        switch (dialogSubmitMethod) {
            case 0:
                Service.addNode([], data, () => Service.alertOn(1, '"' + data + '" Created', 3))
                setNameDialogOn(false)
                break
            case 1:
                Service.addNode(contextMenuKey.split('=>'), data, () => Service.alertOn(1, '"' + data + '" Created', 3))
                setNameDialogOn(false)
                break
            case 3:
                Service.setNode(contextMenuKey.split('=>'), 'name', data, () => Service.alertOn(1, 'Renamed to "' + data + '"', 3))
                setNameDialogOn(false)
                break
            case 4:
                Service.deleteNode(contextMenuKey.split('=>'), () => Service.alertOn(1, 'Node "' + dialogData.name + '" Deleted', 3))
                apiNodeStillValid()
                setConfirmationDialogOn(false)
                break
            default:
                break
        }
    }
    const moveTreeNode = (from, to) => {
        Service.moveNode(from, to,
            () => { apiNodeStillValid(); Service.alertOn(1, 'Node Moved', 3) },
            (msg) => Service.alertOn(3, msg, 3))
    }

    const apiNodeStillValid = () => {
        try {
            Service.getNode(Api.Node.split('=>'), 'name')
        } catch (error) {
            Service.clearRecordFromHistory(Api.Node)
            Service.Node.set('')
        }
    }

    return (
        <>
            <Box id={'Irminsul'} className='ExplorerHeader' onMouseUp={(e) => {
                if (treeMonitor !== '') {
                    moveTreeNode(treeMonitor.split('=>'), '')
                }
                setTreeMonitor('')
            }}>
                <Typography component={'h1'}>{Irminsul.name}</Typography>
                <IconButton icon={<Remix.add />} onClick={onMenuClick.addRootNode} tooltip={'Add a Root Node'} tooltipPosition={'bottom'} />
            </Box>
            <TreeView
                className="Explorer"
                aria-label="Explorer"
                onNodeSelect={(e, i) => Service.Node.set(i)}
                defaultCollapseIcon={<Remix.arrowLineDown />}
                defaultExpandIcon={<Remix.arrowLineRight />}
                onDragStart={(e) => console.log(e.target.id)}
                onDragEnd={(e) => console.log(e.target.id)}
            >
                {renderTree(Irminsul._)}
            </TreeView>
            <ContextMenu
                on={staMenuOn}
                onClose={() => setStaMenuOn(false)}
                event={objEvent}
                menus={[
                    { name: 'Add a Child Node', onClick: onMenuClick.addNode },
                    { name: 'Rename', onClick: onMenuClick.rename },
                    { name: 'Delete', onClick: onMenuClick.delete },
                ]}
            />
            <NameDialog on={nameDialogOn} onClose={() => setNameDialogOn(false)} onSubmit={onDialogSubmit} title={dialogData.title} />

            <ConfirmDialog on={confirmationDialogOn} onClose={() => setConfirmationDialogOn(false)} title={dialogData.title} message={dialogData.message} onSubmit={onDialogSubmit} />

        </>
    )
}