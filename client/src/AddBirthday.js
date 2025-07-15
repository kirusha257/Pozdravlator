import React, { useState, useEffect } from 'react';

function AddBirthday({ onAdd, editing, onCancel }) {
  const [name, setName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [photoFile, setPhotoFile] = useState(null);
  const [photoPath, setPhotoPath] = useState('');

  useEffect(() => {
    if (editing) {
      setName(editing.name);
      setBirthDate(editing.birthDate.split('T')[0]);
      setPhotoPath(editing.photoPath || '');
      setPhotoFile(null);
    }
  }, [editing]);

  const handleFileChange = (e) => {
    setPhotoFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    if (editing) {
      formData.append('Id', editing.id.toString());
    }
    formData.append('Name', name);
    formData.append('BirthDate', birthDate);
    if (photoFile) {
      formData.append('Photo', photoFile);
    } else if (photoPath) {
      formData.append('PhotoPath', photoPath);
    }

    const method = editing ? 'PUT' : 'POST';
    const url = editing ? `/api/birthday/${editing.id}` : '/api/birthday';

    try {
      const response = await fetch(url, {
        method,
        body: formData,
      });

      if (response.ok) {
        onAdd();
        setName('');
        setBirthDate('');
        setPhotoFile(null);
        setPhotoPath('');
      } else {
        console.error('Ошибка при сохранении.');
      }
    } catch (err) {
      console.error('Ошибка при подключении:', err);
    }
  };


  // Общие стили для инпутов
  const inputStyle = {
    width: '320px',
    padding: '12px 15px',
    marginBottom: '15px',
    borderRadius: '8px',
    border: '1.5px solid #ccc',
    fontSize: '16px',
    boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.1)',
    transition: 'border-color 0.3s ease',
  };

  const inputFocusStyle = {
    borderColor: '#4a90e2',
    boxShadow: '0 0 8px rgba(74,144,226,0.4)',
    outline: 'none',
  };

  const [focusedInput, setFocusedInput] = React.useState(null);

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        marginBottom: '1rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: '#fafafa',
        padding: '25px 30px',
        borderRadius: '12px',
        boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
        maxWidth: '380px',
        margin: '0 auto 2rem',
      }}
    >
      <h2 style={{ textAlign: 'center', marginBottom: '20px', color: '#333', fontWeight: '600' }}>
        {editing ? 'Редактировать' : 'Добавить'} день рождения
      </h2>

      <input
        type="text"
        placeholder="Имя"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        style={{
          ...inputStyle,
          ...(focusedInput === 'name' ? inputFocusStyle : {}),
        }}
        onFocus={() => setFocusedInput('name')}
        onBlur={() => setFocusedInput(null)}
      />
      <input
        type="date"
        value={birthDate}
        onChange={(e) => setBirthDate(e.target.value)}
        required
        style={{
          ...inputStyle,
          ...(focusedInput === 'birthDate' ? inputFocusStyle : {}),
        }}
        onFocus={() => setFocusedInput('birthDate')}
        onBlur={() => setFocusedInput(null)}
      />
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        style={{
          marginBottom: '20px',
          borderRadius: '8px',
          cursor: 'pointer',
        }}
      />

      <div style={{ display: 'flex', gap: '10px' }}>
        <button
          type="submit"
          style={{
            padding: '10px 25px',
            borderRadius: '8px',
            border: 'none',
            backgroundColor: '#4a90e2',
            color: 'white',
            fontSize: '16px',
            fontWeight: '600',
            cursor: 'pointer',
            boxShadow: '0 4px 10px rgba(74,144,226,0.3)',
            transition: 'background-color 0.3s ease',
          }}
          onMouseEnter={e => e.currentTarget.style.backgroundColor = '#357ABD'}
          onMouseLeave={e => e.currentTarget.style.backgroundColor = '#4a90e2'}
        >
          {editing ? 'Сохранить' : 'Добавить'}
        </button>

        {editing && (
          <button
            type="button"
            onClick={onCancel}
            style={{
              padding: '10px 25px',
              borderRadius: '8px',
              border: '1.5px solid #ccc',
              backgroundColor: 'white',
              color: '#555',
              fontSize: '16px',
              cursor: 'pointer',
              transition: 'background-color 0.3s ease',
            }}
            onMouseEnter={e => e.currentTarget.style.backgroundColor = '#f0f0f0'}
            onMouseLeave={e => e.currentTarget.style.backgroundColor = 'white'}
          >
            Отмена
          </button>
        )}
      </div>
    </form>
  );
}

export default AddBirthday;
