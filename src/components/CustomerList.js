import React, { useEffect, useState, useCallback, useRef } from 'react';
import { AgGridReact } from 'ag-grid-react';
import AddCustomer from './AddCustomer';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';
import EditCustomer from './EditCustomer';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';

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
        { field: 'firstname', sortable: true, filter: true },
        { field: 'lastname', sortable: true, filter: true },
        { field: 'email', sortable: true, filter: true, width: 200 },
        { field: 'phone', sortable: true, filter: true, width: 150 },
        { field: 'streetaddress', headerName: 'Adress', width: 200, sortable: true, filter: true },
        { field: 'postcode', sortable: true, filter: true, width: 150 },
        { field: 'city', sortable: true, filter: true, width: 200 },
        {
            sortable: false, filter: false,
            cellRenderer: params => <EditCustomer updateCustomer={updateCustomer} customer={params.data} />
        },
        {
            sortable: false, filter: false, width: 120,
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
    const onFilterTextBoxChanged = useCallback(() => {
        gridRef.current.api.setQuickFilter(
            document.getElementById('filter-text-box').value
        );
    }, []);
    const gridRef = useRef();
    const onGridReady = (params) => {
        params.api.sizeColumnsToFit();
    };


    //Rendering the table
    return (
        <div>
            <h1 className='heading'>Customers</h1>
            <div id="searchInput" >
                <label htmlFor='filter-text-box'><SearchIcon/> </label>
                <input className='inputSearch' type='text' id='filter-text-box'
                    placeholder='Search here' onChange={onFilterTextBoxChanged} />
            </div>
            <div className='ag-theme-material' >
                <AgGridReact
                    rowData={customers}
                    columnDefs={columnDefs}
                    pagination={true}
                    paginationPageSize={10}
                    onGridReady={onGridReady}
                    // add additional properties for filtering
                    enableFilter={true}
                    floatingFilter={true}
                    ref={gridRef}
                />
            </div>
            <div>
                <AddCustomer saveCustomer={saveCustomer} />
            </div>
        </div>
    );

}