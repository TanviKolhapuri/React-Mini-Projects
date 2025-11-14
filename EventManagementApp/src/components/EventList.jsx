import React, { useState } from 'react';
import { useEventContext } from '../context/EventContext';
import EventForm from './EventForm';

const EventList = () => {
  const { events, deleteEvent } = useEventContext();
  const [editingEvent, setEditingEvent] = useState(null);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  };

  const handleDelete = (id, title) => {
    if (window.confirm(`Are you sure you want to delete "${title}"?`)) {
      deleteEvent(id);
    }
  };

  const handleEdit = (event) => {
    setEditingEvent(event);
  };

  const handleCancelEdit = () => {
    setEditingEvent(null);
  };

  if (editingEvent) {
    return <EventForm editEvent={editingEvent} onCancel={handleCancelEdit} />;
  }

  return (
    <div className="card">
      <div className="card-header">
        <h2 className="card-title">All Events ({events.length})</h2>
      </div>

      {events.length === 0 ? (
        <div className="info-box">
          No events found. Create your first event!
        </div>
      ) : (
        events.map(event => (
          <div key={event.id} className="event-card">
            <div className="event-title">{event.title}</div>
            <div className="event-date">
              📅 {formatDate(event.date)}
              {event.time && ` • ⏰ ${event.time}`}
              {event.location && ` • 📍${event.location}`}
            </div>
            {event.description && (
              <p className="event-description">{event.description}</p>
            )}
            <div className="event-assignees">
              {event.manager && (
                <div className="assignee-badge">
                  Manager: {event.manager.name}
                </div>
              )}
              {event.executive && (
                <div className="assignee-badge">
                  Executive: {event.executive.name}
                </div>
              )}
            </div>
            <div className="event-actions">
              <button className="btn btn-secondary" onClick={() => handleEdit(event)}>
                Edit
              </button>
              <button className="btn btn-danger" onClick={() => handleDelete(event.id, event.title)}>
                Delete
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default EventList;