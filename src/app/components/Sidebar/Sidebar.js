import { Box, List, ListItem, ListItemButton, Tab, Tabs } from "@mui/material";
import { useContext, useState } from "react";
import { LeyLine } from "../../core/LeyLine";
import sys from "../../core/sys";
import IconButton from "../Button/IconButton";
import DisplayDialog from "../Dialog/DisplayDialog";
import Explorer from "../Explorer/Explorer";
import Remix from "../Icon/Remix";

function Sidebar() {
    const { Irminsul, Service, history } = useContext(LeyLine)

    // State
    const [staSearch, setStaSearch] = useState(false)
    const [staSetting, setStaSetting] = useState(false)
    const [staSidebar, setStaSidebar] = useState(true)

    // Dynamic Variables
    const [intTabId, setIntTabId] = useState(0)
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
        width: staSidebar ? '336px' : '37px',
        display: 'flex',
        transition: 'all .3s ease',
        overflow: 'hidden',
        maxWidth: '100vw',
        '& .Toolbar': {
            borderRight: '1px solid silver',
            width: '36px',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'space-between',
            '&>div:first-of-type': {
                borderBottom: "1px solid silver",
                height: '35px'
            },
            '& button': {
                height: '32px',
                width: '32px',
                margin: '2px',

            }
        },
        '& .Content': {
            borderRight: '1px solid silver',
            height: '100%',
            width: '300px',
            maxWidth: 'calc(100vw - 37px)',
            overflow: 'hidden',
            '& .Tabs': {
                overflow: 'hidden',
                width: '100%',
                height: '35px',
                minHeight: '35px',
                borderBottom: '1px solid silver',
                '& .MuiTabs-flexContainer': {

                },
                '& button': {
                    height: '32px',
                    width: '32px',
                    margin: '2px',
                }
            }
        },
        '& .Scroller': {
            height: '100%',
            width: '900px',
            maxWidth: 'calc(300vw - 111px)',
            overflow: 'hidden',
            display: 'flex',
            transform: intTabId === 0 ? 'translate(0px)' : intTabId === 1 ? 'translate(-33.33%)' : intTabId === 2 ? 'translate(-66.66%)' : 'translate(0px)',
            transition: 'all .3s ease',
            '& .Panel': {
                height: 'calc(100% - 37px)',
                width: '300px',
                overflowX: 'hidden',
                '&:first-of-type': {
                    '& .ExplorerHeader': {
                        height: '34px',
                        lineHeight: '34px',
                        padding: '0 10px',
                        fontSize: '1.2rem',
                        fontVariant: 'small-caps',
                        letterSpacing: '.2rem',
                        borderBottom: '1px solid silver',
                        marginBottom: '5px',
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                    },
                    '& .Explorer': {
                        paddingLeft: '2px',
                    }

                },
                '&:nth-of-type(2)': {
                }
            }
        }
    }

    const [historyOpen, setHistoryOpen] = useState(false)

    return (
        <>

            <Box className={'Sidebar'} sx={sx} onContextMenu={sys.disableEvent}>
                <Box className={'Toolbar'}>
                    <Box>
                        <IconButton icon={staSidebar ? <Remix.menuFold /> : <Remix.menuUnfold />} onClick={onStaSidebarChange} tooltip={staSidebar ? 'Hide Sidebar' : 'Show Sidebar'} tooltipPosition={'right'} />
                    </Box>
                    <Box>

                        <IconButton icon={<Remix.fileLock />} tooltip={'Open New File'} tooltipPosition={'right'} />
                        <IconButton icon={<Remix.question />} onClick={() => setHistoryOpen(true)} tooltip={'About Akasha'} tooltipPosition={'right'} />
                    </Box>


                </Box>
                <Box className={'Content'}>
                    <Box className={'Tabs'} >
                        <IconButton icon={<Remix.folder />} on={intTabId === 0} onClick={() => setIntTabId(0)} tooltip={'Content'} tooltipPosition={'bottom'} />
                        <IconButton icon={<Remix.search />} on={intTabId === 1} onClick={() => setIntTabId(1)} tooltip={'Search'} tooltipPosition={'bottom'} />
                        <IconButton icon={<Remix.setting />} on={intTabId === 2} onClick={() => setIntTabId(2)} tooltip={'Setting'} tooltipPosition={'bottom'} />
                    </Box>
                    <Box className={'Scroller'}>
                        <Box className={'Panel Explorer'}>
                            <Explorer />
                        </Box>
                        <Box className={'Panel Search'}>
                            Search
                        </Box>
                        <Box className={'Panel Setting'}>
                            Setting
                        </Box>
                    </Box>

                </Box>
            </Box>
            <DisplayDialog on={historyOpen} onClose={() => setHistoryOpen(false)} title={'About Akasha'}>

            </DisplayDialog>
        </>

    )
}

export default Sidebar