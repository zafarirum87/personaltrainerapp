import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';
import { DataGrid } from '@mui/x-data-grid';

export default function TrainingList() {

    const [trainings, setTraining] = useState([]);


    useEffect(() => getCustomerList(), []);
    const getCustomerList = () => {
        fetch('https://traineeapp.azurewebsites.net/gettrainings')
            .then(response => response.json())
            .then(data => setTraining(data));
    }

    const columns = [
        { field: 'activity', sortable: true, width: 200 },
        {
            field: 'date', sortable: true, width: 200,
            valueFormatter: (params) => dayjs(params.value).format('DD.MM.YYYY HH:mm a')
        },
        { field: 'duration', headerName: 'Duration(min)', sortable: true, width: 200 },
        {
            field: 'customer', headerName: 'Customer', sortable: true, width: 200,
            valueGetter: (params) => params.row.customer.firstname + ' ' + params.row.customer.lastname
        },];

    const getRowId = (row) => row.id;

    return (
        <div>
            <h1 className='heading'>Trainings</h1>
            <div style={{ height: 600, width: '100%', margin: 'auto' }}>
                <DataGrid
                    rows={trainings}
                    columns={columns}
                    getRowId={getRowId}
                />
            </div>
        </div>
    );
}
