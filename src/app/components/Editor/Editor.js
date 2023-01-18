import Ckeditor from "ckeditor5-custom-build/build/ckeditor";
import { CKEditor } from '@ckeditor/ckeditor5-react'
import { useContext, useEffect, useState } from "react";
import { Box, Breadcrumbs, Typography } from "@mui/material";
import { LeyLine } from "../../core/LeyLine";
import IconButton from "../Button/IconButton";
import Remix from "../Icon/Remix";
import sys from "../../core/sys";
import Downloader from "../Button/Downloader";


const EDITOR_CONFIG = {
    toolbar: {
        items: [
            'findAndReplace',
            '|',
            'alignment',
            '|',
            'heading',
            '|',
            'bold',
            'italic',
            'underline',
            'strikethrough',
            'code',
            'highlight:yellowMarker',
            'removeFormat',
            '|',
            'fontColor',
            'fontBackgroundColor',
            'fontFamily',
            'fontSize',
            '|',
            'bulletedList',
            'numberedList',
            'todoList',
            'indent',
            'outdent',
            'blockQuote',
            'codeBlock',
            '|',
            'insertTable',
            '|',
            'link',
            'imageUpload',
            'mediaEmbed',
            '|',
            'horizontalLine',
            'specialCharacters'
        ]
    },
    language: 'en',
    image: {
        toolbar: [
            'linkImage',
            'toggleImageCaption',
            'imageStyle:inline',
            'imageStyle:wrapText',
            'imageStyle:breakText',
            'resizeImage:50',
            'resizeImage:original'
        ]
    },
    table: {
        contentToolbar: [
            'tableProperties',
            'tableCellProperties',
            'tableColumn',
            'tableRow',
            'mergeTableCells'
        ]
    }
}

export default function Editor() {

    const { Service, Api, Color, Irminsul, savingStatus, history } = useContext(LeyLine)

    const [strDocument, setStrDocument] = useState('')
    const [readOnly, setReadOnly] = useState(true)
    const [lock, setLock] = useState(true)

    const lockDocument = (editor) => {
        setLock(true)
        editor.enableReadOnlyMode('Kiana')
    }
    const unlockDocument = () => {
        setLock(false)
    }

    const editDocument = () => {
        if (lock) return
        editor.disableReadOnlyMode('Kiana')
        setReadOnly(false)
    }
    const viewDocument = () => {
        if (lock) return
        editor.enableReadOnlyMode('Kiana')
        setReadOnly(true)
    }


    const [editor, setEditor] = useState(undefined)
    const onReady = editor => {
        setEditor(editor)
        lockDocument(editor)
    }

    const onChange = (event, editor) => {

        // Service.setNode(Api.Node.split('=>'), 'content', editor.getData())
        // setStrDocument(editor.getData())
    }

    const [escapeFirst, setEscapeFirst] = useState(true)

    useEffect(() => {
        if (Api.Node !== '') {
            unlockDocument()
            if (history.length > 0) {
                if (escapeFirst) {
                    setEscapeFirst(false)
                } else if (strDocument !== editor.getData()) {
                    let strDocName = Service.getNode(history[history.length - 1].split('=>'), 'name')
                    Service.alertOn(0, 'Saving "' + strDocName + '"')
                    Service.setNode(history[history.length - 1].split('=>'), 'content', editor.getData(), () => Service.alertOn(1, '"' + strDocName + '" Saved', 3))

                }
            }
            Service.updateHistory(Api.Node)
            setStrDocument(Service.getNode(Api.Node.split('=>'), 'content'))
        } else {
            setStrDocument('')
            try {
                lockDocument(editor)
            } catch (error) { }

        }

    }, [Api.Node])




    const sx = {
        flexGrow: 1,
        width: '1px',
        '& .Header': {
            display: 'flex',
            width: '100%',
            height: '70px',
            borderBottom: '1px solid silver',
            alignItems: 'center',
            flexDirection: 'row',
            justifyContent: 'space-between',
            '&>div': {
                margin: '0 5px'
            },
            '& .Editor_Breadcrumbs': {
                flexGrow: 1,
                display: 'flex',
                justifyContent: 'center',
                fontStyle: 'italic'
            }
        },
        '& .ck-editor': {
            height: 'calc(100% - 71px)',
            display: 'flex',
            flexDirection: 'column',
            '& .ck-editor__top': {
                width: '100%',
                margin: '0 auto',
                '& .ck-toolbar__items': {
                    justifyContent: 'center'
                },
                '& .ck-toolbar': {
                    border: 'none',
                    borderBottom: '1px solid silver',

                }
            },
            '& .ck-editor__main': {
                backgroundColor: '#eee',
                overflowY: 'scroll',
                // padding: '30px 0 50px',
                flexGrow: 1,
                display: 'flex',
                '& .ck-editor__editable': {
                    border: 'none !important',
                    boxShadow: '0px 0px 11px 0px rgb(70 70 70 / 10%)',
                },
                '& .ck-content': {
                    margin: '0px auto',
                    padding: '30px 50px',
                    maxWidth: '800px',
                    minHeight: '100%',
                    width: '100%',
                    height: 'max-content',
                    flexGrow: 1,
                }
            }
        }
    }

    return (
        <>
            <Box className={'Editor'} sx={sx}>
                <Box className={'Header'}>

                    <Box>
                        <IconButton icon={<Remix.save />} onClick={() => {
                            let strDocName = Service.getNode(Api.Node.split('=>'), 'name')
                            Service.setNode(Api.Node.split('=>'), 'content', editor.getData(), () => Service.alertOn(1, '"' + strDocName + '" Saved', 3))
                        }} tooltip={'Save'} tooltipPosition={'left'} />

                    </Box>
                    <Breadcrumbs className='Breadcrumbs' separator='·'>
                        {
                            Service.Node.getPath(Api.Node).map(
                                str => <Typography color='inherit'>
                                    {str}
                                </Typography>
                            )
                        }
                    </Breadcrumbs>
                    <Box>
                        {
                            readOnly ?
                                <IconButton icon={<Remix.edit />} onClick={() => {
                                    editDocument()
                                }} tooltip={'Start Editing'} tooltipPosition={'bottom'} /> :
                                <IconButton icon={<Remix.preview />} onClick={() => {
                                    viewDocument()
                                }} tooltip={'Preview'} tooltipPosition={'bottom'} />
                        }
                    </Box>
                </Box>
                <CKEditor
                    editor={Ckeditor}
                    config={EDITOR_CONFIG}
                    data={strDocument}
                    onReady={onReady}
                    onChange={onChange}
                />
                <Downloader />

            </Box>
        </>
    )
}