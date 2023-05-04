import React from "react";
import { useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from '@fullcalendar/list';

export default function Calander() {

    const [events, setEvents] = React.useState([]);
    useEffect(() => {
        // Fetch data from API endpoint
        fetch('https://traineeapp.azurewebsites.net/gettrainings')
            .then(response => response.json())
            .then(data => {
                // Transform data into array of event objects
                const newEvents = data.map(training => ({
                    title: `${training.activity}/${training.customer.firstname} ${training.customer.lastname} (${training.duration} min)`,
                    start: training.date,
                    end: (training.date),
                    // Other properties such as description, color, etc. can be added here
                    color: 'turkishblue',
                    borderColor: 'turkishblue',
                    style: 'border',
                    display: 'block',
                }));
                setEvents(newEvents);
            })
            .catch(error => console.error(error));
    }, []);

    return (
        <div style={{ margin: '20px', padding: '30px 0px 0px 0px' }}>
            <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
                initialView={'dayGridMonth'}
                views={{
                    listWeek:  { duration: { days: 7 }, buttonText: 'Agenda'}
                }}
                headerToolbar={{
                    left: 'prev today next',
                    center: 'title',
                    right: 'dayGridMonth timeGridWeek timeGridDay listWeek'
                }}
                events={events}
            />
        </div>
    )
}