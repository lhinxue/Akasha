import { Box, Tab, Tabs } from "@mui/material";
import { useContext, useState } from "react";
import { LeyLine } from "../../core/LeyLine";
import IconButton from "../Button/IconButton";
import Explorer from "../Explorer/Explorer";
import Remix from "../Icon/Remix";

function Sidebar() {
    const { Irminsul, Service } = useContext(LeyLine)

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
        width: staSidebar ? '336px' : '37px',
        display: 'flex',
        transition: 'all .3s ease',
        overflow: 'hidden',
        '& .Toolbar': {
            borderRight: '1px solid silver',
            width: '36px',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'space-between',
            '& button': {
                height: '32px',
                width: '32px',
                margin: '2px'
            }
        },
        '& .Content': {
            borderRight: '1px solid silver',
            height: '100%',
            width: '300px',
            overflow: 'hidden',
            '& .Tabs': {
                width: '100%',
                height: '35px',
                minHeight: '35px',
                borderBottom: '1px solid silver',
                '& .MuiTabs-flexContainer': {

                },
                '& button': {
                    height: '36px',
                    minHeight: '36px',
                    maxWidth: '40px',
                    minWidth: '40px',
                }
            }
        },
        '& .Scroller': {
            height: '100%',
            width: '902px',
            overflow: 'hidden',
            display: 'flex',
            transform: intTabId === 0 ? 'translate(0px)' : intTabId === 1 ? 'translate(-301px)' : intTabId === 2 ? 'translate(-602px)' : 'translate(0px)',
            transition: 'all .3s ease',
            '& .Panel': {
                height: 'calc(100% - 37px)',
                width: '300px',
                overflowX: 'hidden',
                '&:first-child': {
                    borderRight: '1px solid silver',
                    '& h1': {
                        height: '34px',
                        lineHeight: '34px',
                        padding: '0 10px',
                        fontSize: '1.2rem',
                        fontVariant: 'small-caps',
                        letterSpacing: '.2rem',
                        borderBottom: '1px solid silver',
                        marginBottom: '5px',
                    },
                    '& .Explorer': {
                        paddingLeft: '2px',
                    }

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
                    <Box>
                        <IconButton icon={staSidebar ? <Remix.menuFold /> : <Remix.menuUnfold />} onClick={onStaSidebarChange} />
                        <IconButton icon={<Remix.history />} onClick={() => Service.Alert.on('error', 'Invalid!')} />

                        <IconButton icon={<Remix.history />} onClick={() => Service.Alert.off()} />
                    </Box>

                    <IconButton icon={<Remix.history />} />

                </Box>
                <Box className={'Content'}>
                    <Tabs className={'Tabs'} value={intTabId} onChange={(e, v) => setIntTabId(v)} >
                        <Tab icon={<Remix.folders fontSize='small' />} value={0} />
                        <Tab icon={<Remix.search fontSize='small' />} value={1} />
                        <Tab icon={<Remix.setting fontSize='small' />} value={2} />
                    </Tabs>
                    <Box className={'Scroller'}>
                        <Box className={'Panel Panel1'}>
                            <Explorer />
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