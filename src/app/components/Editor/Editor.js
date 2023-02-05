import { CKEditor } from '@ckeditor/ckeditor5-react';
import { Box, Breadcrumbs, Typography } from "@mui/material";
import Ckeditor from "ckeditor5-custom-build/build/ckeditor";
import { useContext, useEffect, useState } from "react";
import { LeyLine } from "../../core/LeyLine";
import Downloader from "../Button/Downloader";
import IconButton from "../Button/IconButton";
import Remix from "../Icon/Remix";

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

    // LeyLine
    const {
        api,
        os,
        history
    } = useContext(LeyLine)

    // States
    const [document, _document] = useState('')
    const [editor, _editor] = useState(undefined)

    // Functions
    const onReady = editor => {
        _editor(editor)
    }
    const onChange = (event, editor) => {
        try {
            os.setNode(api.node.split('=>'), 'content', editor.getData())
        } catch (error) {
            console.warn(error)
        }
    }

    // Effects
    useEffect(() => {
        try {
            if (api.node !== '') {
                _document(os.getNode(api.node.split('=>'), 'content'))
                editor.disableReadOnlyMode('Kiana')

            } else {
                _document('')
                editor.enableReadOnlyMode('Kiana')
            }
        } catch (error) {
            console.warn(error)
        }
    }, [api.node])

    // Styles
    const sx = {
        flexGrow: 1,
        width: '1px',
        '& .Header': {
            alignItems: 'center',
            borderBottom: '1px solid silver',
            display: 'flex',
            flexDirection: 'row',
            height: '70px',
            justifyContent: 'space-between',
            width: '100%',
            '&>div': {
                margin: '0 5px'
            },
            '& .Editor_Breadcrumbs': {
                display: 'flex',
                flexGrow: 1,
                fontStyle: 'italic',
                justifyContent: 'center',
            }
        },
        '& .ck-editor': {
            display: 'flex',
            flexDirection: 'column',
            height: 'calc(100% - 71px)',
            '& .ck-editor__top': {
                margin: '0 auto',
                width: '100%',
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
                display: 'flex',
                flexGrow: 1,
                overflowY: 'scroll',
                '&>.ck-content.ck-editor__editable': {
                    border: 'none !important',
                    boxShadow: '0px 0px 11px 0px rgb(70 70 70 / 10%)',
                },
                '& .ck-content': {
                    flexGrow: 1,
                    height: 'max-content',
                    margin: '0px auto',
                    maxWidth: '800px',
                    minHeight: '100%',
                    padding: '30px 50px',
                    width: '100%',
                }
            }
        }
    }

    return (
        <Box className={'Editor'} sx={sx}>
            <Box className={'Header'}>
                <Box>
                    <IconButton icon={<Remix.save />} tooltip={'Save'} tooltipPosition={'left'} />
                </Box>
                <Breadcrumbs className='Breadcrumbs' separator='·'>
                    {
                        os.getNodePath(api.node).map(
                            str => <Typography color='inherit' key={str}>
                                {str}
                            </Typography>
                        )
                    }
                </Breadcrumbs>
                <Box>
                    <IconButton icon={<Remix.edit />} tooltip={'Start Editing'} tooltipPosition={'bottom'} />
                </Box>
            </Box>
            <CKEditor
                editor={Ckeditor}
                config={EDITOR_CONFIG}
                data={document}
                onChange={onChange}
                onReady={onReady}
            />
            <Downloader />
        </Box>
    )
}