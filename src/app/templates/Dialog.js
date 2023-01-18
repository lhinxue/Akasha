import { Button, Dialog as MuiDialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import IconButton from "../components/Button/IconButton";
import Remix from "../components/Icon/Remix";

export default function Dialog({
    closeButton,
    children,
    noAction,
    allowSubmit,
    fullWidth,
    on = false,
    onClose = () => void 0,
    onSubmit = () => void 0,
    title = 'Title',
    warning
}) {

    const sx = {
        Paper: {
            boxShadow: '0px 0px 11px 0px rgb(70 70 70 / 10%)',
            borderRadius: '0',
            '&>h2': {
                padding: '10px 20px 5px',
                fontWeight: 'normal',
                fontVariant: 'small-caps',
                letterSpacing: '.1rem',
                textDecoration: 'none',
                marginBottom: '10px',
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                '& button': {
                    marginRight: '-10px'
                }
            },
            '&>div': {
                padding: '10px 20px',
            },
            '& button': {
                textTransform: 'none'
            }
        },
        Backdrop: {
            backgroundColor: '#0000001f'
        }
    }

    return (
        <MuiDialog PaperProps={{ sx: sx.Paper }} onClose={onClose}

            fullWidth={fullWidth}
            maxWidth={'lg'}
            open={on} slotProps={{ backdrop: { style: sx.Backdrop } }} >

            <DialogTitle component={'h2'} color={warning ? 'error' : 'primary'} >
                {title}
                {closeButton ? <IconButton icon={<Remix.add />} onClick={onClose} /> : null}
            </DialogTitle>

            <DialogContent >
                {children}
            </DialogContent>
            {
                noAction ? null :
                    <DialogActions>
                        <Button onClick={onClose}>Cancel</Button>
                        <Button color={'primary'} disabled={!allowSubmit} onClick={onSubmit}>Submit</Button>
                    </DialogActions>
            }
        </MuiDialog>
    )
}