import React from "react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
export default function AddCustomer(props) {
    const [open, setOpen] = React.useState(false);
    const [customer, setCustomer] = React.useState({
        firstname: '', lastname: '', email: '', phone: '',
         streetaddress: '', postcode: '', city: ''
    });
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const inputChanged = (event) => {
     setCustomer({...customer, [event.target.name]: event.target.value});
    }

    const addNewCustomer = () =>{
        props.saveCustomer(customer);
        handleClose();
    }

  return (
    <div>
        <Button style={{ margin: 10 }} variant="contained" onClick={handleClickOpen}>
                Add Customer
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Add Customer</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        name="firstname"
                        value= {customer.firstname}
                        label='firstname'
                        onChange={e => inputChanged(e)}
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        name="lastname"
                        value= {customer.lastname}
                        label='lastname'
                        onChange={e => inputChanged(e)}
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        name="email"
                        value= {customer.email}
                        label='email'
                        onChange={e => inputChanged(e)}
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        name="phone"
                        value= {customer.phone}
                        label='phone'
                        onChange={e => inputChanged(e)}
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        name="streetaddress"
                        value= {customer.streetaddress}
                        label='streetaddress'
                        onChange={e => inputChanged(e)}
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        name="postcode"
                        value= {customer.postcode}
                        label='postcode'
                        onChange={e => inputChanged(e)}
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        name="city"
                        value= {customer.city}
                        label='city'
                        onChange={e => inputChanged(e)}
                        fullWidth
                        variant="standard"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={addNewCustomer}>Save</Button>
                </DialogActions>
            </Dialog>
    </div>
  )
}
