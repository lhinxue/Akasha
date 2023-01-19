import { TreeItem, TreeView } from "@mui/lab";
import { Box, Typography } from "@mui/material";
import { useContext, useState } from "react";
import { LeyLine } from "../../core/LeyLine";
import IconButton from "../Button/IconButton";
import ContextMenu from "../ContextMenu/ContextMenu";
import ConfirmDialog from "../Dialog/ConfirmDialog";
import NameDialog from "../Dialog/NameDialog";
import Remix from "../Icon/Remix";

export default function Explorer() {

    // LeyLine
    const { api, os, irminsul } = useContext(LeyLine)

    // States
    const [menuOn, _menuOn] = useState(false)
    const [cmEvent, _cmEvent] = useState({})
    const [cmKey, _cmKey] = useState('')
    const [mouseDownId, _mouseDownId] = useState('')
    const [nameDialogOn, _nameDialogOn] = useState(false)
    const [confirmationOn, _confirmationOn] = useState(false)
    const [submitChannel, _submitChannel] = useState(0)
    const [dialogData, _dialogData] = useState({})

    // Functions
    const onContextMenu = e => {
        e.stopPropagation()
        e.preventDefault()
        _cmKey(e.target.id)
        _cmEvent(e)
        _menuOn(true)
    }
    const onNodeMouseUp = e => {
        if (mouseDownId !== '' && mouseDownId !== e.target.id) {
            moveTreeNode(mouseDownId.split('=>'), e.target.id.split('=>'))
        }
        _mouseDownId('')
    }
    const onRootMouseUp = () => {
        if (mouseDownId !== '') {
            moveTreeNode(mouseDownId.split('=>'), '')
        }
        _mouseDownId('')
    }
    const renderTree = (obj, parentKey = '') => {
        return Object.keys(obj).map(
            i => {
                let nodeId = parentKey === '' ? i : parentKey + '=>' + i
                return (
                    <TreeItem
                        nodeId={nodeId}
                        key={nodeId}
                        label={<div id={nodeId} onMouseDown={e => _mouseDownId(e.target.id)} onMouseUp={onNodeMouseUp} onContextMenu={onContextMenu}>{obj[i].name}</div>}
                    >
                        {renderTree(obj[i]._, nodeId)}
                    </TreeItem>
                )
            }
        )
    }
    const onMenuClick = {
        addRootNode: () => {
            _dialogData({ title: 'Add a node under "' + irminsul.name + '"' })
            _submitChannel(0)
            _nameDialogOn(true)
        },
        addNode: () => {
            _dialogData({ title: 'Add a Child node under "' + os.getNode(cmKey.split('=>'), 'name') + '"' })
            _submitChannel(1)
            _nameDialogOn(true)
        },
        rename: () => {
            _dialogData({ title: 'Rename node "' + os.getNode(cmKey.split('=>'), 'name') + '"' })
            _submitChannel(2)
            _nameDialogOn(true)
        },
        delete: () => {
            _dialogData({
                title: 'Dangerous Operation!',
                name: os.getNode(cmKey.split('=>'), 'name'),
                message: 'Are you sure to delete node "' + os.getNode(cmKey.split('=>'), 'name') + '" ?',
            })
            _submitChannel(3)
            _confirmationOn(true)
        }
    }
    const onDialogSubmit = data => {
        switch (submitChannel) {
            case 0:
                os.addNode([], data, () => os.msgOn(1, '"' + data + '" Created', 3))
                _nameDialogOn(false)
                break
            case 1:
                os.addNode(cmKey.split('=>'), data, () => os.msgOn(1, '"' + data + '" Created', 3))
                _nameDialogOn(false)
                break
            case 2:
                os.setNode(cmKey.split('=>'), 'name', data, () => os.msgOn(1, 'Renamed to "' + data + '"', 3))
                _nameDialogOn(false)
                break
            case 3:
                os.deleteNode(cmKey.split('=>'), () => os.msgOn(1, 'node "' + dialogData.name + '" Deleted', 3))
                apiNodeStillValid()
                _confirmationOn(false)
                break
            default:
                break
        }
    }
    const moveTreeNode = (from, to) => {
        os.moveNode(from, to,
            () => { apiNodeStillValid(); os.msgOn(1, 'node Moved', 3) },
            (msg) => os.msgOn(3, msg, 3))
    }
    const apiNodeStillValid = () => {
        try {
            os.getNode(api.node.split('=>'), 'name')
        } catch (error) {
            os.clearRecordFromHistory(api.node)
            os._apiNode('')
        }
    }

    return (
        <>
            <Box id={'irminsul'} className='ExplorerHeader' onMouseUp={onRootMouseUp}>
                <Typography component={'h1'}>{irminsul.name}</Typography>
                <IconButton icon={<Remix.add />} onClick={onMenuClick.addRootNode} tooltip={'Add a Root node'} tooltipPosition={'bottom'} />
            </Box>
            <TreeView
                className="Explorer"
                aria-label="Explorer"
                onNodeSelect={(e, i) => os._apiNode(i)}
                defaultCollapseIcon={<Remix.arrowLineDown />}
                defaultExpandIcon={<Remix.arrowLineRight />}
            >
                {renderTree(irminsul._)}
            </TreeView>
            <ContextMenu
                on={menuOn}
                onClose={() => _menuOn(false)}
                event={cmEvent}
                menus={[
                    { name: 'Add a Child node', onClick: onMenuClick.addNode },
                    { name: 'Rename', onClick: onMenuClick.rename },
                    { name: 'Delete', onClick: onMenuClick.delete },
                ]}
            />
            <NameDialog on={nameDialogOn} onClose={() => _nameDialogOn(false)} onSubmit={onDialogSubmit} title={dialogData.title} />
            <ConfirmDialog on={confirmationOn} onClose={() => _confirmationOn(false)} title={dialogData.title} message={dialogData.message} onSubmit={onDialogSubmit} />
        </>
    )
}