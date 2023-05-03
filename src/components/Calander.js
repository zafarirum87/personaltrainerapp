import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin, { TimeGridView } from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

export default function Calander(){

    return(
        <div style={{ margin: '20px', padding: '30px 30px 0px 30px' }}>
            <FullCalendar
                plugins={[dayGridPlugin,timeGridPlugin,interactionPlugin]}
                initialView={'dayGridMonth'}
                headerToolbar= {{ left: 'prev today next', center: 'title', right: 'dayGridMonth timeGridWeek timeGridDay'}}
            />
        </div>
    )
}