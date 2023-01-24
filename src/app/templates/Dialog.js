import { Button, Dialog as MuiDialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import IconButton from '../components/Button/IconButton';
import Remix from '../components/Icon/Remix';

export default function Dialog({
    allowSubmit,
    children,
    closeButton,
    fullWidth,
    noAction,
    on = false,
    onClose = () => void 0,
    onSubmit = () => void 0,
    title = 'Title',
    warning
}) {

    // Styles
    const sx = {
        Paper: {
            borderRadius: '0',
            boxShadow: '0px 0px 11px 0px rgb(70 70 70 / 10%)',
            '&>h2': {
                alignItems: 'center',
                display: 'flex',
                flexDirection: 'row',
                fontVariant: 'small-caps',
                fontWeight: 'normal',
                justifyContent: 'space-between',
                letterSpacing: '.1rem',
                marginBottom: '10px',
                padding: '10px 20px 5px',
                textDecoration: 'none',
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
        <MuiDialog
            PaperProps={{ sx: sx.Paper }}
            onClose={onClose}
            fullWidth={fullWidth}
            maxWidth={'lg'}
            open={on}
            slotProps={{ backdrop: { style: sx.Backdrop } }}
        >
            <DialogTitle component={'h2'} color={warning ? 'error' : 'primary'}>
                {title}
                {closeButton ? <IconButton icon={<Remix.close />} onClick={onClose} /> : null}
            </DialogTitle>
            <DialogContent>
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