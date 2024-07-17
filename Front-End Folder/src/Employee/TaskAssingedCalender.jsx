import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import axios from 'axios';
import { useOutletContext } from 'react-router-dom';
import './TaskAssignedCalendar.css';

const TaskAssignedCalendar = () => {
  const employee = useOutletContext();
  const [tasks, setTasks] = useState([]);
  const [selectedDateTasks, setSelectedDateTasks] = useState([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/employee/tasks?employeeName=${employee.name}`);
      const tasksData = response.data;
      setTasks(tasksData);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const handleDateClick = (info) => {
    const clickedDate = new Date(info.dateStr);
    const tasksForDate = tasks.filter(task => new Date(task.start_date).toDateString() === clickedDate.toDateString());
    setSelectedDateTasks(tasksForDate);
  };

  const events = tasks.map(task => ({
    title: task.task_name,
    start: task.start_date,
    end: task.end_date ? new Date(new Date(task.end_date).setHours(23, 59, 59)) : null // Adjust end date to end of the day
  }));

  return (
    <div className="calendar-container">
      <h2>Task Assigned Calendar</h2>
      <div className="calendar-body">
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          headerToolbar={{
            start: 'today prev,next',
            center: 'title',
            end: 'dayGridMonth,timeGridWeek,timeGridDay'
          }}
          height="90vh"
          events={events}
          dateClick={handleDateClick}
          eventTimeFormat={{ // Disable time display next to event titles
            hour: '2-digit',
            minute: '2-digit',
            omitZeroMinute: true,
            meridiem: 'short',
            hour12: false
          }}
          displayEventTime={false} // Disable time display next to event titles
        />
      </div>
      <div className="tasks-list">
        <h3>Tasks for Selected Date</h3>
        {selectedDateTasks.length > 0 ? (
          <ul>
            {selectedDateTasks.map(task => (
              <li key={task.id}>
                <strong>Date:</strong> {new Date(task.start_date).toLocaleDateString()}<br />
                <strong>Task Name:</strong> {task.task_name}<br />
                <strong>Start Time:</strong> {task.start_time}<br />
                <strong>End Time:</strong> {task.end_time}<br />
                {/* Add other task details as needed */}
              </li>
            ))}
          </ul>
        ) : (
          <p>No tasks for selected date.</p>
        )}
      </div>
    </div>
  );
};

export default TaskAssignedCalendar;
