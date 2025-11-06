import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await fetch('https://jsonplaceholder.typicode.com/users');
      const data = await response.json();
      setUsers(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching users:', error);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p className="loading-text">Loading users details...</p>
      </div>
    );
  }

  return (
    <div className="user-list-container">
      <h1 className="title">User Directory</h1>
      <div className="user-grid">
        {users.map((user) => (
          <div key={user.id} className="user-card">
            <div className="user-header">
              <div className="user-avatar">{user.name.charAt(0)}</div>
              <h2 className="user-name">{user.name}</h2>
            </div>
            <div className="user-details">
              <div className="detail-item">
                <span className="detail-label">Email:</span>
                <span className="detail-value">{user.email}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Phone:</span>
                <span className="detail-value">{user.phone}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Company: </span>
                <span className="detail-value">{user.company.name}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;











// import React from 'react';
// import UserList from './UserList';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <UserList />
//     </div>
//   );
// }

// export default App;



