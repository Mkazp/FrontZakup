import React, { useState } from 'react';
import './form.css';

const SearchForm = () => {
  const [query, setQuery] = useState('');
  const [okktChecked, setOkktChecked] = useState(false);
  const [uniqueTypeChecked, setUniqueTypeChecked] = useState(false);

  const handleSearch = async () => {
    // Формируем ссылку с параметрами запроса
    const queryString = `query=${encodeURIComponent(query)}&okkt=${okktChecked ? 1 : 0}&uniqueType=${uniqueTypeChecked ? 1 : 0}`;

    try {
      // Отправляем GET-запрос
      const response = await fetch(`http://localhost:5000/ZakupkiApi/get_report?${queryString}`);

      // Проверяем успешность запроса (статус 200-299)
      if (response.ok) {
        // Получаем данные в формате JSON
        const data = await response.json();
        console.log('Результат поиска:', data);
        // Добавь здесь логику обработки полученных данных
      } else {
        console.error('Ошибка при выполнении запроса:', response.statusText);
      }
    } catch (error) {
      console.error('Произошла ошибка:', error.message);
    }
  };

  return (
    <div class="form">
      <label>
        Товар:
        <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} />
      </label>

      <div>
        <label>
          <input type="checkbox" checked={okktChecked} onChange={() => setOkktChecked(!okktChecked)} />
          Все товары закупки соответствуют поиску
        </label>
      </div>

      <div>
        <label>
          <input type="checkbox" checked={uniqueTypeChecked} onChange={() => setUniqueTypeChecked(!uniqueTypeChecked)} />
          Поиск по okpd/ktru
        </label>
      </div>

      <div>
        <button onClick={handleSearch}>Поиск</button>
      </div>
    </div>
  );
};

export default SearchForm;