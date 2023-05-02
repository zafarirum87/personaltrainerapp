import React, { useEffect, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import dayjs from 'dayjs';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';

export default function TrainingList() {

    const [trainings, setTraining] = useState([]);


    useEffect(() => getCustomerList(), []);
    const getCustomerList = () => {
        fetch('https://traineeapp.azurewebsites.net/gettrainings')
            .then(response => response.json())
            .then(data => {
                setTraining(data);
                console.log(data);
            });

    }

    const [columnDefs] = useState([
        { field: 'activity', sortable: true, filter: true },
        {
            field: 'date', sortable: true, filter: true,
            cellRenderer: (params) => {
                const date = params.value;
                return dayjs(date).format("DD.MM.YYYY HH:mm a");
            }
        },
        { field: 'duration', headerName: 'Duration(min)', sortable: true, filter: true },
        {
            field: 'customer', headerName: 'Customer', sortable: true, filter: true,
            cellRenderer: (params) => {
                const customer = params.value;
                return customer ? customer.firstname + ' ' + customer.lastname : "";
            }
        },
        {
            sortable: false, filter: false, width: 120,
            cellRenderer: params =>
                <IconButton size='small'
                    onClick={() => deleteTraining(params.data.id)}><DeleteIcon /></IconButton>
        },

    ])

    //Delete training from the list (not deleting given id said not found in the APIn)
    const deleteTraining = (params) => {
        console.log(params);
        if (window.confirm('Are you sure?')) {
            fetch("https://traineeapp.azurewebsites.net/api/trainings/" + params,
                {
                    method: 'DELETE'
                })
                .then(_ => getCustomerList())
                .catch(err => console.error(err))
        }
    }

    return (
        <div>
            <h1 className='heading'>Trainings</h1>
            <div className='ag-theme-material'
                style={{ width: '90%', height: 600, margin: 'auto' }}>
                <AgGridReact
                    rowData={trainings}
                    columnDefs={columnDefs}
                    pagination={true}
                    paginationPageSize={10}
                />
            </div>
        </div>
    );
}
