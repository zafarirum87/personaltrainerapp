import React,  { useEffect, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import dayjs from 'dayjs';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';

export default function TrainingList(){

    const [trainings, setTraining] = useState([{activity:"", date:"", duration:"", customer:""}]);


    useEffect(() => getCustomerList(), []);
    const getCustomerList = () => {
        fetch('https://traineeapp.azurewebsites.net/gettrainings')
            .then(response => response.json())
            .then(data => {
                const formattedData = data.map(training => ({
                    activity: training.activity,
                    date: dayjs(training.date).format('DD.MM.YYYY HH:mm a'),
                    duration: training.duration,
                    customer: training.customer ? `${training.customer.firstname} ${training.customer.lastname}` : ''
                }));
                setTraining(formattedData);
            });

    }

            const [columnDefs] =useState( [
                { field: 'activity', sortable: true, filter: true },
                { field: 'date', sortable: true, filter: true },
                { field: 'duration', headerName:'Duration(min)', sortable: true, filter: true },
                { field: 'customer', headerName:'Customer', sortable: true, filter: true },

            ])

        return(
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