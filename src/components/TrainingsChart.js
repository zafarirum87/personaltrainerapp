import { React, useState, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import _ from 'lodash';

export default function TrainingsChart(){

    const [trainings, setTraining] = useState([]);

    //imort Api data
    useEffect(() => {
        fetch('https://traineeapp.azurewebsites.net/gettrainings')
            .then(response => response.json())
            .then(data => {
                setTraining(data);
            });
    }, []);
// group by activity and map the  data using loadash
    const groupedData = _(trainings)
        .groupBy('activity')
        .map((trainings, activity) => ({
            activity,
            duration: _.sumBy(trainings, 'duration')
        }))
        .value();
    return(
        <div className='ag-theme-material'
            style={{ margin: '40px', padding: '30px 0px 0px 0px', width:'100px' }}>
            <BarChart width={1000} height={500} data={groupedData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="activity" />
                <YAxis label={{ value: 'Duration (min)', angle: -90, position: 'insideLeft' }} />
                <Tooltip />
                <Bar dataKey="duration" fill="#8884d8" />
            </BarChart>
        </div>
    );
}