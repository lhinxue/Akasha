import { Box } from "@mui/material";
import { useContext, useState } from "react";
import { LeyLine } from "../../core/LeyLine";
import sys from "../../core/sys";
import IconButton from "../Button/IconButton";
import DisplayDialog from "../Dialog/DisplayDialog";
import Explorer from "../Panel/Explorer";
import Remix from "../Icon/Remix";
import Search from "../Panel/Search";
import Setting from "../Panel/Setting";
import Credential from "../Panel/Credential";

export default function Sidebar() {

    // LeyLine
    const { os } = useContext(LeyLine)

    // States
    const [collapse, _collapse] = useState(false)
    const [currentTab, _currentTab] = useState(0)
    const [aboutAkasha, _aboutAkasha] = useState(false)

    // Functions
    const oncollapseChange = () => _collapse(pre => !pre)

    const sx = {
        display: 'flex',
        height: '100%',
        maxWidth: '100vw',
        overflow: 'hidden',
        transition: 'all .3s ease',
        width: collapse ? '37px' : '336px',
        '& .Toolbar': {
            alignItems: 'center',
            borderRight: '1px solid silver',
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            justifyContent: 'space-between',
            width: '36px',
            '&>div:first-of-type': {
                borderBottom: "1px solid silver",
                height: '35px'
            },
            '& button': {
                height: '32px',
                margin: '2px',
                width: '32px',
            }
        },
        '& .Content': {
            borderRight: '1px solid silver',
            height: '100%',
            maxWidth: 'calc(100vw - 37px)',
            overflow: 'hidden',
            width: '300px',
            '& .Tabs': {
                borderBottom: '1px solid silver',
                height: '35px',
                minHeight: '35px',
                overflow: 'hidden',
                width: '100%',
                '& button': {
                    height: '32px',
                    margin: '2px',
                    width: '32px',
                }
            }
        },
        '& .Scroller': {
            display: 'flex',
            height: '100%',
            maxWidth: 'calc(400vw - 148px)',
            overflow: 'hidden',
            transform: currentTab === 0 ? 'translate(0px)' : currentTab === 1 ? 'translate(-25%)' : currentTab === 2 ? 'translate(-50%)' : currentTab === 3 ? 'translate(-75%)' : 'translate(0px)',
            transition: 'all .3s ease',
            width: '1200px',
            '& .Panel': {
                height: 'calc(100% - 37px)',
                overflowX: 'hidden',
                width: '300px',
                '&.Explorer': {
                    '& .ExplorerHeader': {
                        alignItems: 'center',
                        borderBottom: '1px solid silver',
                        display: 'flex',
                        flexDirection: 'row',
                        fontSize: '1.2rem',
                        fontVariant: 'small-caps',
                        height: '34px',
                        justifyContent: 'space-between',
                        letterSpacing: '.2rem',
                        lineHeight: '34px',
                        marginBottom: '5px',
                        padding: '0 10px',
                    },
                    '& .ExplorerContent': {
                        paddingLeft: '2px',
                    }
                },
                '&.Search': {
                    '&>div': {
                        width: '-webkit-fill-available',
                        '&:first-of-type': {
                            height: '35px',
                            padding: '5px',
                            borderBottom: '1px solid silver'
                        },
                        '&:nth-of-type(2)': {
                            width: 'calc(100% - 2px)',
                            height: 'calc(100% - 35px)',
                            '&>.MuiTabs-scroller': {
                                overflowY: 'auto !important'
                            },
                            '& button': {
                                fontWeight: 'normal',
                                alignItems: 'flex-start',
                                textTransform: 'none',
                                borderBottom: '1px solid silver',
                                height: '30px',
                                minHeight: '30px'
                            }
                        }
                    },
                    '& input': {

                        paddingLeft: '5px',
                    }
                },
                '&.Credential': {
                    overflow: 'hidden',
                    '& h1': {
                        // alignItems: 'center',
                        borderBottom: '1px solid silver',
                        display: 'flex',
                        flexDirection: 'row',
                        fontSize: '1rem',
                        fontVariant: 'small-caps',
                        height: '34px',
                        justifyContent: 'space-between',
                        letterSpacing: '.2rem',
                        lineHeight: '34px',
                        padding: '0 10px',
                        margin: '0'
                    },
                    '&>div': {
                        width: '100%',
                        height: 'calc(100% - 70px)',
                        overflow: 'auto',
                        '&>div': {
                            margin: '10px',
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            '&>label': {
                                fontSize: '14px',
                            },
                            '&>*:nth-child(2)': {
                                width: '60%'
                            }
                        }
                    }
                },
                '&.Setting': {
                    overflow: 'hidden',
                    '& h1': {
                        // alignItems: 'center',
                        borderBottom: '1px solid silver',
                        display: 'flex',
                        flexDirection: 'row',
                        fontSize: '1rem',
                        fontVariant: 'small-caps',
                        height: '34px',
                        justifyContent: 'space-between',
                        letterSpacing: '.2rem',
                        lineHeight: '34px',
                        padding: '0 10px',
                        margin: '0'
                    },
                    '&>div': {
                        width: '100%',
                        height: 'calc(100% - 70px)',
                        overflow: 'auto',
                        '&>div': {
                            margin: '10px',
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            '&>label': {
                                fontSize: '14px',
                            },
                            '&>*:nth-child(2)': {
                                width: '60%'
                            }
                        }
                    }
                }
            }
        }
    }

    return (
        <>
            <Box className={'Sidebar'} sx={sx} onContextMenu={sys.disableEvent}>
                <Box className={'Toolbar'}>
                    <Box>
                        <IconButton icon={collapse ? <Remix.menuUnfold /> : <Remix.menuFold />} onClick={oncollapseChange} tooltip={collapse ? 'Show Sidebar' : 'Hide Sidebar'} tooltipPosition={'right'} />
                    </Box>
                    <Box>
                        <IconButton icon={<Remix.fileLock />} onClick={os.terminalOn} tooltip={'Open New File'} tooltipPosition={'right'} />
                        <IconButton icon={<Remix.question />} onClick={() => _aboutAkasha(true)} tooltip={'About Akasha'} tooltipPosition={'right'} />
                    </Box>
                </Box>
                <Box className={'Content'}>
                    <Box className={'Tabs'} >
                        <IconButton icon={<Remix.folder />} on={currentTab === 0} onClick={() => _currentTab(0)} tooltip={'Content'} tooltipPosition={'bottom'} />
                        <IconButton icon={<Remix.search />} on={currentTab === 1} onClick={() => _currentTab(1)} tooltip={'Search'} tooltipPosition={'bottom'} />
                        <IconButton icon={<Remix.key />} on={currentTab === 2} onClick={() => _currentTab(2)} tooltip={'Credential'} tooltipPosition={'bottom'} />
                        <IconButton icon={<Remix.setting />} on={currentTab === 3} onClick={() => _currentTab(3)} tooltip={'Setting'} tooltipPosition={'bottom'} />
                    </Box>
                    <Box className={'Scroller'}>
                        <Box className={'Panel Explorer'}>
                            <Explorer />
                        </Box>
                        <Box className={'Panel Search'}>
                            <Search />
                        </Box>
                        <Box className={'Panel Credential'}>
                            <Credential />
                        </Box>
                        <Box className={'Panel Setting'}>
                            <Setting />
                        </Box>
                    </Box>
                </Box>
            </Box>
            <DisplayDialog on={aboutAkasha} onClose={() => _aboutAkasha(false)} title={'About Akasha'}>
            </DisplayDialog>
        </>

    )
}