import React from "react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';



export default function EditCustomer(props) {
    const [open, setOpen] = React.useState(false);
    const [customer, setCustomer] = React.useState({
        firstname: '', lastname: '', email: '', phone: '',
        streetaddress: '', postcode: '', city: ''
    });
    const handleClickOpen = () => {
        setCustomer({
            firstname: props.customer.firstname, lastname: props.customer.lastname,
            email: props.customer.email, phone: props.customer.phone,
            streetaddress: props.customer.streetaddress, postcode: props.customer.postcode,
            city: props.customer.city
        });
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const inputChanged = (event) => {
        setCustomer({ ...customer, [event.target.name]: event.target.value });
    }

    const updateCustomer = () => {
        props.updateCustomer(customer, props.customer.links[0].href);
        handleClose();
    }

    return (
        <div>
            <IconButton  onClick={handleClickOpen}>
                <EditIcon />
            </IconButton>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Edit Customer</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        name="firstname"
                        value={customer.firstname}
                        label='firstname'
                        onChange={e => inputChanged(e)}
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        name="lastname"
                        value={customer.lastname}
                        label='lastname'
                        onChange={e => inputChanged(e)}
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        name="email"
                        value={customer.email}
                        label='email'
                        onChange={e => inputChanged(e)}
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        name="phone"
                        value={customer.phone}
                        label='phone'
                        onChange={e => inputChanged(e)}
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        name="streetaddress"
                        value={customer.streetaddress}
                        label='streetaddress'
                        onChange={e => inputChanged(e)}
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        name="postcode"
                        value={customer.postcode}
                        label='postcode'
                        onChange={e => inputChanged(e)}
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        name="city"
                        value={customer.city}
                        label='city'
                        onChange={e => inputChanged(e)}
                        fullWidth
                        variant="standard"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={updateCustomer}>Save</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}
