import { TabContext, TabPanel } from "@mui/lab";
import { Box, Tab, Tabs } from "@mui/material";
import { useState } from "react";
import IconButton from "../Button/IconButton";
import Remix from "../Icon/Remix";

function Sidebar() {

    // State
    const [staSearch, setStaSearch] = useState(false)
    const [staSetting, setStaSetting] = useState(false)
    const [staSidebar, setStaSidebar] = useState(true)

    // Dynamic Variables
    const [intTabId, setIntTabId] = useState(1)
    const [intSearchZ, setIntSearchZ] = useState(15)
    const [intSettingZ, setIntSettingZ] = useState(15)

    // Helpers
    const then = func => setTimeout(func, 300)

    // Event Handlers
    const onStaSearchChange = () => {
        if (!staSearch) setIntSearchZ(17)
        setStaSearch(on => !on)
        then(() => {
            setStaSetting(false)
            setIntSettingZ(15)
            then(() => setIntSearchZ(16))
        })
    }
    const onStaSettingChange = () => {
        if (!staSetting) setIntSettingZ(17)
        setStaSetting(on => !on)
        then(() => {
            setStaSearch(false)
            setIntSearchZ(15)
            then(() => setIntSettingZ(16))
        })
    }
    const onStaSidebarChange = () => setStaSidebar(pre => !pre)

    const sx = {
        height: '100%',
        width: staSidebar ? '333px' : '33px',
        display: 'flex',
        transition: 'all .3s ease',
        '& .Toolbar': {
            borderRight: '1px solid silver',
            width: '33px',
            height: '100%',
        },
        '& .Content': {
            borderRight: '1px solid silver',
            height: '100%',
            width: '300px',
            overflow: 'hidden',
        },
        '& .Scroller': {
            height: '100%',
            width: '902px',
            overflow: 'hidden',
            display: 'flex',
            transform: intTabId === 0 ? 'translate(0px)' : intTabId === 1 ? 'translate(-301px)' : intTabId === 2 ? 'translate(-602px)' : 'translate(0px)',
            transition: 'all .3s ease',
            '& .Panel': {
                height: '100%',
                width: '300px',
                '&:first-child': {
                    borderRight: '1px solid silver'
                },
                '&:nth-child(2)': {
                    borderRight: '1px solid silver'
                }
            }
        }
    }

    return (
        <>

            <Box className={'Sidebar'} sx={sx}>
                <Box className={'Toolbar'}>
                    <IconButton icon={staSidebar ? <Remix.menuFold /> : <Remix.menuUnfold />} onClick={onStaSidebarChange} />
                </Box>
                <Box className={'Content'}>
                    <Tabs value={intTabId} onChange={(e, v) => setIntTabId(v)}>
                        <Tab icon={<Remix.menuFold />} value={0} />
                        <Tab icon={<Remix.menuFold />} value={1} />
                        <Tab icon={<Remix.menuFold />} value={2} />
                    </Tabs>
                    <Box className={'Scroller'}>
                        <Box className={'Panel Panel1'}>
                            h
                        </Box>
                        <Box className={'Panel Panel2'}>
                            s
                        </Box>
                        <Box className={'Panel Panel3'}>
                            st
                        </Box>
                    </Box>

                </Box>
            </Box>

        </>

    )
}

export default Sidebar