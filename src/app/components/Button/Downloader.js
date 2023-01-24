import { Backdrop, CircularProgress } from "@mui/material"
import moment from "moment/moment"
import { useContext, useState } from "react"
import { LeyLine } from "../../core/LeyLine"
import sys from "../../core/sys"
import Remix from "../Icon/Remix"
import AbsButton from "./AbsButton"


export default function Downloader() {

    // LeyLine
    const { api, irminsul, os } = useContext(LeyLine)

    const [downloading, setDownloading] = useState(false)

    const formatFilename = () => {
        return `${irminsul.name} --v${moment().format('YYYYMMDDHmmss')}`
    }

    return (
        <>
            <AbsButton
                bottom={16}
                right={26}
                size={50}
                icon={<Remix.download color='primary' />}
                tooltip='Download File'
                onClick={() => {
                    os.msgOn(0, 'Encrypting...')
                    setDownloading(true)
                    setTimeout(() => {
                        sys.cipher(irminsul, api.key, (dt) => {
                            sys.download(dt.data, formatFilename())
                            os.msgOn(1, 'Downloaded', 3)
                            setDownloading(false)
                        })
                    }, 1000);
                }}
            />
            <Backdrop open={downloading}>
            </Backdrop>
        </>

    )
}