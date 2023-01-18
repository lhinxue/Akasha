import { Backdrop, CircularProgress } from "@mui/material"
import { useContext, useState } from "react"
import { LeyLine } from "../../core/LeyLine"
import sys from "../../core/sys"
import Remix from "../Icon/Remix"
import AbsButton from "./AbsButton"


export default function Downloader() {

    // LeyLine
    const { Api, Irminsul, Service } = useContext(LeyLine)

    const [downloading, setDownloading] = useState(false)

    return (
        <>
            <AbsButton
                bottom={16}
                right={26}
                size={50}
                icon={<Remix.download color='primary' />}
                tooltip='Download File'
                onClick={() => {
                    Service.alertOn(0, 'Encrypting...')
                    setDownloading(true)
                    setTimeout(() => {
                        sys.cipher(Irminsul, '', (dt) => {
                            sys.download(dt.data, 'test')
                            Service.alertOn(1, 'Downloaded', 3)
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