import React, { useState } from 'react';
import { EventProvider, useEventContext } from './context/EventContext';
import EventForm from './components/EventForm';
import EventList from './components/EventList';
import EventsByAssignee from './components/EventsByAssignee';
import './App.css';

const AppContent = () => {
  const { events, managers, executives } = useEventContext();
  const [activeSection, setActiveSection] = useState('create');

  return (
    <div className="preview-container">
      <header className="preview-header">
        <h1>Event Management System</h1>
        <p>Organize, manage, and track all your events in one place</p>
      </header>

      <div className="stats-container">
        <div className="stat-card">
          <div className="stat-number">{events.length}</div>
          <div className="stat-label">Total Events</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{managers.length}</div>
          <div className="stat-label">Active Managers</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{executives.length}</div>
          <div className="stat-label">Active Executives</div>
        </div>
      </div>

      <nav className="nav-tabs">
        <button 
          className={`nav-tab ${activeSection === 'create' ? 'active' : ''}`}
          onClick={() => setActiveSection('create')}
        >
          Create Event
        </button>
        <button 
          className={`nav-tab ${activeSection === 'list' ? 'active' : ''}`}
          onClick={() => setActiveSection('list')}
        >
          All Events
        </button>
        <button 
          className={`nav-tab ${activeSection === 'filter' ? 'active' : ''}`}
          onClick={() => setActiveSection('filter')}
        >
          Events by Assignee
        </button>
      </nav>

      <div className="preview-section active">
        {activeSection === 'create' && <EventForm />}
        {activeSection === 'list' && <EventList />}
        {activeSection === 'filter' && <EventsByAssignee />}
      </div>
    </div>
  );
};

const App = () => {
  return (
    <EventProvider>
      <AppContent />
    </EventProvider>
  );
};

export default App;