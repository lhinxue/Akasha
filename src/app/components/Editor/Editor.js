import Ckeditor from "ckeditor5-custom-build/build/ckeditor";
import { CKEditor } from '@ckeditor/ckeditor5-react'
import { useContext, useState } from "react";
import { Box, Breadcrumbs, Typography } from "@mui/material";
import { LeyLine } from "../../core/LeyLine";
import IconButton from "../Button/IconButton";
import Remix from "../Icon/Remix";


const EDITOR_CONFIG = {
    toolbar: {
        items: ['findAndReplace', '|', 'undo', 'redo', '|', 'alignment', '|', 'heading', '|', 'bold', 'italic', 'underline', 'strikethrough', 'code', 'highlight', 'removeFormat', '|', 'fontColor', 'fontBackgroundColor', 'fontFamily', 'fontSize', '|', 'bulletedList', 'numberedList', 'todoList', 'indent', 'outdent', '|', 'blockQuote', 'codeBlock', 'insertTable', '|', 'horizontalLine', 'specialCharacters', '|', 'link', 'imageUpload', 'mediaEmbed']
    },
    language: 'en',
    image: {
        toolbar: [
            'imageTextAlternative',
            'toggleImageCaption',
            'imageStyle:inline',
            'imageStyle:block',
            'imageStyle:side',
            'linkImage'
        ]
    },
    table: {
        contentToolbar: [
            'tableColumn',
            'tableRow',
            'mergeTableCells',
            'tableCellProperties',
            'tableProperties'
        ]
    }
}

export default function Editor() {

    const { Service, Api, Color } = useContext(LeyLine)

    const [strDocument, setStrDocument] = useState('')

    const onReady = editor => {

        console.log(editor.commands)
    }

    const onChange = (event, editor) => {
        setStrDocument(editor.getData())
    }

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
                padding: '30px 30px 50px',
                flexGrow: 1,
                display: 'flex',
                '& .ck-editor__editable.ck-focused': {
                    borderColor: 'silver',
                    boxShadow: 'none'
                },
                '& .ck-content': {
                    margin: '10px auto',
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
                        <IconButton icon={<Remix.arrowLeft />} />
                        <IconButton icon={<Remix.arrowRight />} />
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
                        <IconButton icon={<Remix.arrowRight />} />
                        <IconButton icon={<Remix.arrowRight />} />
                    </Box>
                </Box>
                <CKEditor
                    editor={Ckeditor}
                    config={EDITOR_CONFIG}
                    data={strDocument}
                    onReady={onReady}
                    onChange={onChange}
                />
            </Box>
        </>
    )
}