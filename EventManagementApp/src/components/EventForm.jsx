import React, { useState, useEffect } from 'react';
import { useEventContext } from '../context/EventContext';

const EventForm = ({ editEvent, onCancel }) => {
  const { addEvent, updateEvent, managers, executives } = useEventContext();
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    location: '',
    managerId: '',
    executiveId: ''
  });

  useEffect(() => {
    if (editEvent) {
      setFormData({
        title: editEvent.title,
        description: editEvent.description,
        date: editEvent.date,
        time: editEvent.time,
        location: editEvent.location,
        managerId: editEvent.manager ? editEvent.manager.id : '',
        executiveId: editEvent.executive ? editEvent.executive.id : ''
      });
    }
  }, [editEvent]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.title || !formData.date || !formData.managerId) {
      alert('Please fill all required fields (Title, Date, Manager)');
      return;
    }

    const eventData = {
      title: formData.title,
      description: formData.description,
      date: formData.date,
      time: formData.time,
      location: formData.location,
      manager: managers.find(m => m.id === parseInt(formData.managerId)),
      executive: formData.executiveId 
        ? executives.find(e => e.id === parseInt(formData.executiveId))
        : null
    };

    if (editEvent) {
      updateEvent(editEvent.id, eventData);
      if (onCancel) onCancel();
    } else {
      addEvent(eventData);
      // Reset form
      setFormData({
        title: '',
        description: '',
        date: '',
        time: '',
        location: '',
        managerId: '',
        executiveId: ''
      });
    }

    alert(editEvent ? 'Event updated successfully!' : 'Event created successfully!');
  };

  return (
    <div className="card">
      <div className="card-header">
        <h2 className="card-title">
          {editEvent ? 'Edit Event' : 'Add New Event'}
        </h2>
      </div>
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Event Title *</label>
          <input 
            type="text" 
            name="title"
            className="form-control" 
            placeholder="Enter event title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Description</label>
          <textarea 
            name="description"
            className="form-control" 
            placeholder="Enter event description"
            value={formData.description}
            onChange={handleChange}
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Event Date *</label>
            <input 
              type="date" 
              name="date"
              className="form-control"
              value={formData.date}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Event Time</label>
            <input 
              type="time" 
              name="time"
              className="form-control"
              value={formData.time}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="form-group">
          <label>Location</label>
          <input 
            type="text" 
            name="location"
            className="form-control" 
            placeholder="Enter event location"
            value={formData.location}
            onChange={handleChange}
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Assign Manager *</label>
            <select 
              name="managerId"
              className="form-control"
              value={formData.managerId}
              onChange={handleChange}
              required
            >
              <option value="">Select Manager</option>
              {managers.map(manager => (
                <option key={manager.id} value={manager.id}>
                  {manager.name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Assign Executive</label>
            <select 
              name="executiveId"
              className="form-control"
              value={formData.executiveId}
              onChange={handleChange}
            >
              <option value="">Select Executive</option>
              {executives.map(executive => (
                <option key={executive.id} value={executive.id}>
                  {executive.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="event-actions">
          <button type="submit" className="btn btn-primary">
            {editEvent ? 'Update Event' : 'Create Event'}
          </button>
          {editEvent && onCancel && (
            <button type="button" className="btn btn-secondary" onClick={onCancel}>
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default EventForm;