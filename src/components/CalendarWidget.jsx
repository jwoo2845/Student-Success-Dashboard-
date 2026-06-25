import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

function CalendarPage() {
  const assignments =
    JSON.parse(localStorage.getItem("assignments")) || [];

  const events = assignments.map((assignment) => ({
    title: assignment.title,
    start: new Date(assignment.dueDate),
    end: new Date(assignment.dueDate),
  }));

  return (
    <div>
      <h2>Academic Calendar</h2>

      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{
          height: 600,
          marginTop: "20px",
        }}
      />
    </div>
  );
}

export default CalendarPage;