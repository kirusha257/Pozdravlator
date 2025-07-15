import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';

import AddBirthday from './AddBirthday';
import BirthdayList from './BirthdayList';
import AllBirthdaysPage from './AllBirthdaysPage';

function App() {
  const [birthdays, setBirthdays] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);

  const fetchBirthdays = async () => {
    try {
      const response = await fetch('/api/birthday');
      const data = await response.json();
      setBirthdays(data);
    } catch (error) {
      console.error('Ошибка при получении списка:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBirthdays();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`/api/birthday/${id}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        fetchBirthdays();
      } else {
        console.error('Ошибка при удалении.');
      }
    } catch (error) {
      console.error('Ошибка при удалении:', error);
    }
  };

  const handleEdit = (item) => {
    setEditing(item);
  };

  const handleCancelEdit = () => {
    setEditing(null);
  };

  return (
    <Router>
      <div style={{ padding: '20px', fontFamily: 'Arial' }}>
        <h1
          style={{
            textAlign: 'center',
            fontSize: '3rem',
            color: '#4a90e2',
            marginBottom: '30px',
            fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
            textShadow: '1px 1px 3px rgba(0,0,0,0.2)',
          }}
        >
          Поздравлятор
        </h1>

        <nav style={{ marginBottom: '20px', textAlign: 'center' }}>
          <NavLink
            to="/"
            end
            style={({ isActive }) => ({
              marginRight: '1.5rem',
              textDecoration: 'none',
              fontSize: '1.2rem',
              fontWeight: isActive ? '700' : '400',
              color: isActive ? '#4a90e2' : '#555',
              borderBottom: isActive ? '2px solid #4a90e2' : 'none',
              paddingBottom: '2px',
              transition: 'all 0.3s ease',
            })}
          >
            Ближайшие
          </NavLink>
          <NavLink
            to="/all"
            style={({ isActive }) => ({
              textDecoration: 'none',
              fontSize: '1.2rem',
              fontWeight: isActive ? '700' : '400',
              color: isActive ? '#4a90e2' : '#555',
              borderBottom: isActive ? '2px solid #4a90e2' : 'none',
              paddingBottom: '2px',
              transition: 'all 0.3s ease',
            })}
          >
            Все дни рождения
          </NavLink>
        </nav>

        <AddBirthday
          onAdd={() => {
            fetchBirthdays();
            setEditing(null);
          }}
          editing={editing}
          onCancel={handleCancelEdit}
        />

        

        {loading ? (
          <p>Загрузка...</p>
        ) : (
          <Routes>
            <Route
              path="/"
              element={
                <BirthdayList
                  birthdays={birthdays}
                  onDelete={handleDelete}
                  onEdit={handleEdit}
                />
              }
            />
            <Route
              path="/all"
              element={
                <AllBirthdaysPage
                  birthdays={birthdays}
                  onDelete={handleDelete}
                  onEdit={handleEdit}
                />
              }
            />
          </Routes>
        )}
      </div>
    </Router>
  );
}

export default App;
