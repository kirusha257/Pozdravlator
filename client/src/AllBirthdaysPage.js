import React, { useState } from 'react';

function AllBirthdaysPage({ birthdays, onDelete, onEdit }) {
  const [sortOrder, setSortOrder] = useState('asc');

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const sortedBirthdays = [...birthdays].sort((a, b) => {
    if (a.name.toLowerCase() < b.name.toLowerCase()) return sortOrder === 'asc' ? -1 : 1;
    if (a.name.toLowerCase() > b.name.toLowerCase()) return sortOrder === 'asc' ? 1 : -1;
    return 0;
  });

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  return (
    <div>
      <h2>Полный список дней рождения</h2>
      <button
        onClick={toggleSortOrder}
        style={{
          marginBottom: '1rem',
          padding: '5px 10px',
          borderRadius: '5px',
          border: '1px solid #ccc',
          backgroundColor: '#fff',
          cursor: 'pointer',
        }}
      >
        Сортировать по имени ({sortOrder === 'asc' ? 'А → Я' : 'Я → А'})
      </button>

      {sortedBirthdays.length === 0 ? (
        <p>Список пуст.</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {sortedBirthdays.map((b) => {
            const birthDate = new Date(b.birthDate);
            const isBirthdayToday =
              birthDate.getDate() === today.getDate() &&
              birthDate.getMonth() === today.getMonth();

            return (
              <li
                key={b.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginBottom: '1rem',
                  backgroundColor: isBirthdayToday ? 'gold' : '#f2f2f2',
                  padding: '10px',
                  borderRadius: '8px',
                }}
              >
                <img
                  src={b.photoPath || 'http://via.placeholder.com/50'}
                  alt={b.name}
                  width={50}
                  height={50}
                  style={{ borderRadius: '50%', marginRight: '1rem' }}
                />
                <div style={{ flexGrow: 1 }}>
                  <strong>{b.name}</strong>
                  <br />
                  <span>{birthDate.toLocaleDateString()}</span>
                </div>
                <button
                  onClick={() => onEdit(b)}
                  style={{
                    marginLeft: '0.5rem',
                    padding: '5px 10px',
                    border: '1px solid #ccc',
                    borderRadius: '5px',
                    backgroundColor: '#fff',
                    cursor: 'pointer',
                  }}
                >
                  ✏️ Редактировать
                </button>
                <button
                  onClick={() => onDelete(b.id)}
                  style={{
                    marginLeft: '0.5rem',
                    backgroundColor: '#ff4d4d',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    padding: '5px 10px',
                    cursor: 'pointer',
                  }}
                >
                  Удалить
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

export default AllBirthdaysPage;
