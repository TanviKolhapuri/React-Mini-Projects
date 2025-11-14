import React, { createContext, useState, useContext } from 'react';

const EventContext = createContext();

export const useEventContext = () => {
  const context = useContext(EventContext);
  if (!context) {
    throw new Error('useEventContext must be used within an EventProvider');
  }
  return context;
};

export const EventProvider = ({ children }) => {
  const [events, setEvents] = useState([
    // {
    //   id: 1,
    //   title: 'Annual Tech Conference 2025',
    //   description: 'Join us for the biggest tech conference of the year featuring keynote speakers, workshops, and networking opportunities.',
    //   date: '2024-12-15',
    //   time: '09:00',
    //   location: 'Grand Convention Center, Downtown',
    //   manager: { id: 1, name: 'John Smith' },
    //   executive: { id: 1, name: 'Emma Davis' }
    // },
    // {
    //   id: 2,
    //   title: 'Product Launch Event',
    //   description: 'Exclusive launch event for our new product line with demonstrations and Q&A sessions.',
    //   date: '2024-12-20',
    //   time: '14:00',
    //   location: 'Innovation Hub',
    //   manager: { id: 2, name: 'Sarah Johnson' },
    //   executive: { id: 2, name: 'James Wilson' }
    // },
  ]);

  const [managers] = useState([
    { id: 1, name: 'John Smith' },
    { id: 2, name: 'Sarah Johnson' },
    { id: 3, name: 'Michael Brown' }
  ]);

  const [executives] = useState([
    { id: 1, name: 'Emma Davis' },
    { id: 2, name: 'James Wilson' },
    { id: 3, name: 'Olivia Taylor' }
  ]);

  const addEvent = (event) => {
    const newEvent = {
      ...event,
      id: events.length > 0 ? Math.max(...events.map(e => e.id)) + 1 : 1
    };
    setEvents([...events, newEvent]);
  };

  const updateEvent = (id, updatedEvent) => {
    setEvents(events.map(event => 
      event.id === id ? { ...event, ...updatedEvent } : event
    ));
  };

  const deleteEvent = (id) => {
    setEvents(events.filter(event => event.id !== id));
  };

  const getEventsByAssignee = (role, assigneeId) => {
    return events.filter(event => {
      if (role === 'Manager') {
        return event.manager && event.manager.id === parseInt(assigneeId);
      } else if (role === 'Executive') {
        return event.executive && event.executive.id === parseInt(assigneeId);
      }
      return false;
    });
  };

  const value = {
    events,
    managers,
    executives,
    addEvent,
    updateEvent,
    deleteEvent,
    getEventsByAssignee
  };

  return (
    <EventContext.Provider value={value}>
      {children}
    </EventContext.Provider>
  );
};