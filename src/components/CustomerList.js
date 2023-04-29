import React,  { useEffect, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';

export default function CustomerList(){

    const [customers, setCustomers] = useState([]);
    useEffect(() => getCustomerList(), []);

    const getCustomerList = () => {
        fetch('https://traineeapp.azurewebsites.net/api/customers')
            .then(response => response.json())
            .then(data => setCustomers(data.content));
            console.log(customers);
        }

            const [columnDefs] =useState( [
                { field: 'firstname', sortable: true, filter: true },
                { field: 'lastname', sortable: true, filter: true },
                { field: 'email', sortable: true, filter: true, width: 200 },
                { field: 'phone', sortable: true, filter: true, width: 150 },
                { field: 'streetaddress', headerName: 'Adress',width: 200, sortable: true, filter: true },
                { field: 'postcode', sortable: true, filter: true, width: 150 },
                { field: 'city', sortable: true, filter: true, width: 200 },
            ])

        return(
            <div>
                <div className='ag-theme-material'
                style={{ width: '100%', height: 600, margin: 'auto' }}>
                <AgGridReact
                    rowData={customers}
                    columnDefs={columnDefs}
                    pagination={true}
                    paginationPageSize={10}
                />
                </div>
            </div>
        );

}