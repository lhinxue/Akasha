import { TreeItem, TreeView } from "@mui/lab";
import { Typography } from "@mui/material";
import { useContext, useState } from "react";
import { LeyLine } from "../../core/LeyLine";
import Sys from "../../core/Sys";
import Remix from "../Icon/Remix";

export default function Explorer() {

    const { Api, Service, Irminsul } = useContext(LeyLine)

    const renderTree = (obj, parentKey = '') =>
        Object.keys(obj).map(
            i =>
                <TreeItem nodeId={parentKey === '' ? i : parentKey + '=>' + i} key={parentKey === '' ? i : parentKey + '=>' + i} label={obj[i].name} >
                    {
                        obj[i]._ ? renderTree(obj[i]._, parentKey === '' ? i : parentKey + '=>' + i)
                            : null
                    }
                </TreeItem>
        )

    return (
        <>
            <Typography component={'h1'}>{Irminsul.name}</Typography>
            <TreeView
                className="Explorer"
                aria-label="file system navigator"
                onNodeSelect={(e, i) => Service.Node.set(i)}
                defaultEndIcon={<Remix.document />}
                defaultCollapseIcon={<Remix.folderOpen />}
                defaultExpandIcon={<Remix.folder />}
            >
                {renderTree(Irminsul._)}
            </TreeView>
        </>
    )
}