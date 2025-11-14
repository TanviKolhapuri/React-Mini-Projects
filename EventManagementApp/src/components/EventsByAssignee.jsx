import React, { useState, useEffect } from 'react';
import { useEventContext } from '../context/EventContext';

const EventsByAssignee = () => {
  const { managers, executives, getEventsByAssignee } = useEventContext();
  const [role, setRole] = useState('Manager');
  const [assigneeId, setAssigneeId] = useState('');
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [assigneeName, setAssigneeName] = useState('');

  useEffect(() => {
    if (assigneeId) {
      const events = getEventsByAssignee(role, assigneeId);
      setFilteredEvents(events);
      
      // Get assignee name
      const assignees = role === 'Manager' ? managers : executives;
      const assignee = assignees.find(a => a.id === parseInt(assigneeId));
      setAssigneeName(assignee ? assignee.name : '');
    } else {
      setFilteredEvents([]);
      setAssigneeName('');
    }
  }, [role, assigneeId, getEventsByAssignee, managers, executives]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  };

  const currentAssignees = role === 'Manager' ? managers : executives;

  return (
    <div className="card">
      <div className="card-header">
        <h2 className="card-title">Events by Assignee</h2>
      </div>

      <div className="filter-section">
        <div className="form-group">
          <label>Select Role</label>
          <select 
            className="form-control"
            value={role}
            onChange={(e) => {
              setRole(e.target.value);
              setAssigneeId('');
            }}
          >
            <option value="Manager">Manager</option>
            <option value="Executive">Executive</option>
          </select>
        </div>

        <div className="form-group">
          <label>Select {role}</label>
          <select 
            className="form-control"
            value={assigneeId}
            onChange={(e) => setAssigneeId(e.target.value)}
          >
            <option value="">Choose {role}</option>
            {currentAssignees.map(assignee => (
              <option key={assignee.id} value={assignee.id}>
                {assignee.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {assigneeId && (
        <>
          <div className="info-box">
            Showing {filteredEvents.length} event(s) for {assigneeName}
          </div>

          {filteredEvents.length === 0 ? (
            <div className="info-box">
              No events found for this {role.toLowerCase()}.
            </div>
          ) : (
            filteredEvents.map(event => (
              <div key={event.id} className="event-card">
                <div className="event-title">{event.title}</div>
                <div className="event-date">
                  📅 {formatDate(event.date)}
                  {event.time && ` • ⏰ ${event.time}`}
                  {event.location && ` • 📍 ${event.location}`}
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
              </div>
            ))
          )}
        </>
      )}

      {!assigneeId && (
        <div className="info-box">
          Please select a role and {role.toLowerCase()} to view their events.
        </div>
      )}
    </div>
  );
};

export default EventsByAssignee;