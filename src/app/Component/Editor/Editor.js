import Ckeditor from "ckeditor5-custom-build/build/ckeditor";
import { CKEditor } from '@ckeditor/ckeditor5-react'
import { useState } from "react";
import { Box } from "@mui/material";


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
            height: '70px'
        },
        '& .ck-editor': {
            height: 'calc(100% - 70px)',
            display: 'flex',
            flexDirection: 'column',
            '& .ck-editor__top': {
                width: '100%',
                margin: '10px auto',
                '& ck-toolbar__items': {
                    justifyContent: 'center'
                }
            },
            '& .ck-editor__main': {

                overflowY: 'scroll',
                padding: '20px',
                flexGrow: 1,
                display: 'flex',
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
                <div className={'Header'}>
                    do this
                </div>
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