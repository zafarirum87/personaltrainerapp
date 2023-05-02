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
import dayjs from 'dayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

export default function AddTrainingToCustomer(props) {

    //const [value, setValue] = React.useState(null);
    const [open, setOpen] = React.useState(false);
    const [training, setTraining] = React.useState({
        activity: '', date: '', duration: '', customer: '', customerId:''
    });
    const [customer, setCustomer] = React.useState({
        firstname: '', lastname: '', customerId:''
    });
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

    const addTraining = () => {
        setTraining({ ...training, customer: customer.customerId });
        props.addTraining(training);
        handleClose();
    }

    return (
        <div>
            <Button onClick={handleClickOpen}>
                <AddIcon/> Add TRaining
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Add TRaining </DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        name="activity"
                        value={training.activity}
                        label='activity'
                        onChange={e => inputChanged(e)}
                        fullWidth
                        variant="standard"
                    />
                   {/*  <TextField
                        autoFocus
                        margin="dense"
                        name="date"
                        value={dayjs(training.date).format('DD.MM.YYYY HH:mm a')}
                        label='date'
                        onChange={e => inputChanged(e)}
                        fullWidth
                        variant="standard"
                    /> */}
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DateTimePicker value={training.date} onChange={(date) => setTraining({ ...training, date })}
                            renderInput={(props) => <TextField {...props} />}
                            label="DateTimePicker"
                    />
                  </LocalizationProvider>
                    <TextField
                        autoFocus
                        margin="dense"
                        name="duration"
                        value={training.duration}
                        label='duration'
                        onChange={e => inputChanged(e)}
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        name="customer"
                        value={training.customer = customer.firstname + ' ' + customer.lastname}
                        label='phone'
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
