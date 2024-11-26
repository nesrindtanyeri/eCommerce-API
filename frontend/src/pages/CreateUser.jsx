import React, { useState } from 'react';
import axios from 'axios';

const CreateUser = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Boş alanları kontrol et
    if (!name || !email || !password) {
      alert('Tüm alanları doldurmanız gerekmektedir.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3000/users', {
        name,
        email,
        password,
      });
      console.log('Kullanıcı başarıyla oluşturuldu:', response.data);

      // Formu sıfırla
      setName('');
      setEmail('');
      setPassword('');
      setErrorMessage(''); // Hata mesajını sıfırla
    } catch (error) {
      if (error.response && error.response.status === 409) {
        setErrorMessage('Bu email ile kayıtlı kullanıcı zaten var.');
      } else {
        setErrorMessage('Kullanıcı oluşturulurken hata oluştu.');
      }
      console.error('Kullanıcı oluşturulurken hata oluştu:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-4 text-primary">Kullanıcı Oluştur</h1>
      {errorMessage && <div className="text-error mb-4">{errorMessage}</div>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Ad Soyad</span>
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="input input-bordered w-full"
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input input-bordered w-full"
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Şifre</span>
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input input-bordered w-full"
          />
        </div>
        <button type="submit" className="btn btn-primary mt-4">
          Oluştur
        </button>
      </form>
    </div>
  );
};

export default CreateUser;
