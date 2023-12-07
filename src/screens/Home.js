import React, { useState } from 'react';

const Home = ({ onSetName }) => {
  const [name, setName] = useState('');

  const handleStart = () => {
    // Kullanıcı adı girilmişse, onSetName fonksiyonunu çağırarak ana bileşene iletebilirsiniz.
    if (name.trim() !== '') {
      onSetName(name);
    } else {
      alert('Please enter your name.');
    }
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      background: 'linear-gradient(to bottom, #3498db, #2c3e50)', // Updated background color
      color: 'white',
    }}>
<div className='asd' style={{  padding:30, paddingTop:70, paddingBottom:70 , borderRadius:20}}>
      <h1 style={{ fontSize: '24px', marginBottom: '20px', color: '#fff' }}>WELCOME TO TİC TAC TOE</h1>
      <p style={{ fontSize: '16px', marginBottom: '10px' }}>Enter your name to continue:</p>
      <input
        type="text"
        placeholder="Your Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={{ padding: '8px', fontSize: '14px', marginBottom: '10px' }}
      />
      <button
        onClick={handleStart}
        style={{
          padding: '8px 16px',
          fontSize: '16px',
          backgroundColor: '#4caf50',
          color: '#fff',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          paddingLeft:10,
          marginLeft:10
        }}
      >
        Start
      </button>
      </div>
    </div>
  );
};

export default Home;
