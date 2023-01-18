import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import Page from "../templates/Page";

export default function Terminal() {

    const [entryAnimation, setEntryAnimation] = useState(true)

    useEffect(() => {
        setEntryAnimation(false)
    }, [])

    const sx = {

        '& .Logo': {
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            
            '& svg': {
                overflow: 'visible',
                height: '50vh',
                '& path': {
                    fill: 'gray',
                    transition: 'all 3s ease',
                    '&:first-of-type': {
                        transform: entryAnimation ? 'translateY(-50vh)' : 'translateY(0)'
                    },
                    '&:nth-of-type(2)': {
                        transform: entryAnimation ? 'translateY(50vh)' : 'translateY(0)'
                    },
                    '&:nth-of-type(3)': {
                        transform: entryAnimation ? 'translateX(-50vw)' : 'translateX(0)'
                    },
                    '&:nth-of-type(4)': {
                        transform: entryAnimation ? 'translateX(50vw)' : 'translateX(0)'
                    }
                }
            }

        }
    }

    return (
        <Page gray>
            <Box bgcolor={'#eee'} width='100%' height={'100%'} sx={sx}>
                <div className="Logo">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="-20 -35 40 66">
                        <path d="M 0 -2 L -7 -13 L 0 -35 L 7 -13 Z" />
                        <path d="M 0 2 L -7 13 L 0 31 L 7 13 Z" />

                        <path d="M -1 0 L -9 -8 L -20 0 L -9 8 Z" />
                        <path d="M 1 0 L 9 -8 L 20 0 L 9 8 Z" />

                    </svg>
                </div>
            </Box>
        </Page>
    )
}