import React, { useState } from 'react';

function BirthdayList({ birthdays, onDelete, onEdit }) {
  const [sortOrder, setSortOrder] = useState('asc');

  if (!birthdays || birthdays.length === 0) {
    return <p>Список пуст.</p>;
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const oneMonthAhead = new Date();
  oneMonthAhead.setMonth(oneMonthAhead.getMonth() + 1);
  oneMonthAhead.setHours(0, 0, 0, 0);

  const isWithinNextMonthOrToday = (birthDate) => {
    const date = new Date(birthDate);
    const thisYearBirthday = new Date(today.getFullYear(), date.getMonth(), date.getDate());
    if (thisYearBirthday < today) {
      thisYearBirthday.setFullYear(today.getFullYear() + 1);
    }
    return thisYearBirthday <= oneMonthAhead;
  };

  const withUpcoming = birthdays.filter(b => isWithinNextMonthOrToday(b.birthDate));

  const sorted = [...withUpcoming].sort((a, b) => {
    const aDate = new Date(a.birthDate);
    const bDate = new Date(b.birthDate);
    const aIsToday = aDate.getDate() === today.getDate() && aDate.getMonth() === today.getMonth();
    const bIsToday = bDate.getDate() === today.getDate() && bDate.getMonth() === today.getMonth();

    if (aIsToday && !bIsToday) return -1;
    if (!aIsToday && bIsToday) return 1;

    if (a.name.toLowerCase() < b.name.toLowerCase()) return sortOrder === 'asc' ? -1 : 1;
    if (a.name.toLowerCase() > b.name.toLowerCase()) return sortOrder === 'asc' ? 1 : -1;
    return 0;
  });

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  if (sorted.length === 0) {
    return <p>Нет ближайших дней рождения в течение месяца.</p>;
  }

  return (
    <div>
      <h2>Ближайшие дни рождения</h2>
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
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {sorted.map((b) => {
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
                style={{
                  borderRadius: '50%',
                  marginRight: '1rem',
                  objectFit: 'cover',
                }}
              />
              <div style={{ flexGrow: 1 }}>
                <strong>{b.name}</strong><br />
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
    </div>
  );
}

export default BirthdayList;
