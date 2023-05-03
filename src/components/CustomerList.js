import React, { useEffect, useState, useCallback, useRef } from 'react';
import { AgGridReact } from 'ag-grid-react';
import AddCustomer from './AddCustomer';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';
import EditCustomer from './EditCustomer';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import AddTrainingToCustomer from './AddTrainingToCustomer';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import Tooltip from '@mui/material/Tooltip';

export default function CustomerList() {

    const [customers, setCustomers] = useState([]);
    useEffect(() => getCustomerList(), []);

    // Fetching customerlist from API
    const getCustomerList = () => {
        fetch('https://traineeapp.azurewebsites.net/api/customers')
            .then(response => response.json())
            .then(data => setCustomers(data.content));
    }
    //AG grid columns definition
    const [columnDefs] = useState([
        {
            sortable: false, filter: false, width: 300, headerName: 'Add Trainings',
            cellRenderer: params => <AddTrainingToCustomer addTraining={addTraining} customer={params.data} />
        },
        { field: 'firstname', sortable: true, filter: true },
        { field: 'lastname', sortable: true, filter: true },
        { field: 'email', sortable: true, filter: true, width: 300 },
        { field: 'phone', sortable: true, filter: true, width: 200 },
        { field: 'streetaddress', headerName: 'Adress', width: 300, sortable: true, filter: true },
        { field: 'postcode', sortable: true, filter: true, width: 200 },
        { field: 'city', sortable: true, filter: true, width: 200 },
        {
            sortable: false, filter: false, headerName: 'Edit', width: 200,
            cellRenderer: params => <EditCustomer updateCustomer={updateCustomer} customer={params.data} />
        },
        {
            sortable: false, filter: false, width: 200, headerName: 'Delete',
            cellRenderer: params =>
                <IconButton size='small'
                    onClick={() => deleteCustomer(params)}><DeleteIcon /></IconButton>
        },

    ])
    //Saving newly added customer
    const saveCustomer = (newCustomer) => {
        fetch('https://traineeapp.azurewebsites.net/api/customers', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newCustomer)
        })
            .then(res => getCustomerList())
            .catch(err => console.error(err))
    }

    //updating customer
    const updateCustomer = (customer, link) => {
        fetch(link,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(customer)
            })
            .then(res => getCustomerList())
            .catch(err => console.error(err))
    }
    //Deleting customer
    const deleteCustomer = (params) => {
        if (window.confirm('Are you sure?')) {
            fetch(params.data.links[0].href, { method: 'DELETE' })
                .then(response => {
                    if (response.ok) {
                        getCustomerList();
                    }
                    else {
                        alert('Something went wrong in deletion');
                    }
                })
                .catch(err => console.error(err))
        }
    }
    // AG grid filtering function
    const gridRef = useRef();

    const onGridReady = (params) => {
        gridRef.current = params;
        params.api.sizeColumnsToFit();
    };
    const onFilterTextBoxChanged = useCallback(() => {
        gridRef.current.api.setQuickFilter(
            document.getElementById('filter-text-box').value
        );
    }, []);


    //Exporting data to csv
    const onExportClick = () => {
        const params = {
            fileName: 'customers.csv',
            columnKeys: ['firstname', 'lastname', 'email', 'phone', 'streetaddress', 'postcode', 'city'],
        };
        gridRef.current.api.exportDataAsCsv(params);
    }
    // add training to customer
    const addTraining = (training) => {
        fetch('https://traineeapp.azurewebsites.net/api/trainings', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(training)
        })
            .then(res => getCustomerList())
            .catch(err => console.error(err))
    }


    //Rendering the table
    return (
        <div>
            <h1 className='heading'>Customers</h1>
            <div id="searchInput" >
                <label htmlFor='filter-text-box'><SearchIcon /> </label>
                <input className='inputSearch' type='text' id='filter-text-box'
                    placeholder='Search here' onChange={onFilterTextBoxChanged} />
                <Tooltip title="Download">
                    <IconButton onClick={() => onExportClick()} style={{}}>
                        <FileDownloadOutlinedIcon /></IconButton>
                </Tooltip>
            </div>
            <div className='ag-theme-material'>
                <AgGridReact
                    rowData={customers}
                    columnDefs={columnDefs}
                    pagination={true}
                    onGridReady={onGridReady}
                    // add additional properties for filtering
                    enableFilter={true}
                    floatingFilter={true}
                    ref={gridRef}
                />
                <AddCustomer saveCustomer={saveCustomer} />
            </div>
        </div>
    );

}