import React from "react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import AddIcon from '@mui/icons-material/Add';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

export default function AddTrainingToCustomer(props) {

    //dialog open/close and input fields
    const [open, setOpen] = React.useState(false);
    // training object
    const [training, setTraining] = React.useState({
        activity: '', date: '', duration: '', customer: ''
    });
    // customer object
    const [customer, setCustomer] = React.useState({
        firstname: '', lastname: '', customerId: ''
    });
    //open dialog box and set customer object
    const handleClickOpen = () => {
        setCustomer({
            firstname: props.customer.firstname, lastname: props.customer.lastname,
            customerId: props.customer.links[0].href
        });
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const inputChanged = (event) => {
        setTraining({ ...training, [event.target.name]: event.target.value });
    }
    //add training to the list
    const addTraining = () => {
        props.addTraining({
            activity: training.activity,
            date: training.date,
            duration: training.duration,
            customer: customer.customerId
        });
        handleClose();
    }

    return (
        <div>
            <Button onClick={handleClickOpen}>
                <AddIcon /> Add TRaining
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle> {customer.firstname + '' + customer.lastname} </DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        name="activity"
                        value={training.activity}
                        label='Activity'
                        onChange={e => inputChanged(e)}
                        fullWidth
                        variant="standard"
                    />
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DateTimePicker
                            value={training.date} onChange={(date) => setTraining({ ...training, date })}
                            input={(props) => <TextField{...props} />}
                            label="Pick Date & Time"
                        />
                    </LocalizationProvider>
                    <TextField
                        autoFocus
                        margin="dense"
                        name="duration"
                        value={training.duration}
                        label='Duration'
                        onChange={e => inputChanged(e)}
                        fullWidth
                        variant="standard"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={addTraining}>Save</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}
