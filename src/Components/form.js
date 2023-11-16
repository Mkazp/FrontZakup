/*import React, { useState } from 'react';
import './form.css';

const SearchForm = () => {
 // const [query, setQuery] = useState('');
 //const [okktChecked, setOkktChecked] = useState(false);
 // const [uniqueTypeChecked, setUniqueTypeChecked] = useState(false);
 function handleSearch() {
  const query = document.getElementById('query').value;
  const okktChecked = document.getElementById('okktChecked').checked;
  const uniqueTypeChecked = document.getElementById('uniqueTypeChecked').checked;


  //const handleSearch = async () => {
    //const query = document.getElementById('query').value;
  //const okktChecked = document.getElementById('okktChecked').checked;
  //const uniqueTypeChecked = document.getElementById('uniqueTypeChecked').checked;
    // Формируем ссылку с параметрами запроса
    //const queryString = `query=${encodeURIComponent(query)}&okkt=${okktChecked ? 1 : 0}&uniqueType=${uniqueTypeChecked ? 1 : 0}`;
/*
    try {
      // Отправляем GET-запрос
      //const response = await fetch(`http://213.171.8.164:5000/ZakupkiApi/get_report?${queryString}`);
      const response = await fetch(`http://213.171.8.164:5000/ZakupkiApi/get_report?${queryString}`, {
        method: 'GET',
        mode: 'no-cors',
        headers: {
            'Content-Type': 'application/json',
            // Добавьте любые другие необходимые заголовки, например, авторизацию
        },
      });



      
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

    const url = http://localhost:5000/ZakupkiApi/get_report?query=${query}&okkt=${okktChecked ? 1 : 0}&uniqueType=${uniqueTypeChecked ? 1 : 0};

*/
// Формирование URL для запроса
/*
const url = `http://213.171.8.164:5000/ZakupkiApi/get_report?query=${query}&okkt=${okktChecked ? 1 : 0}&uniqueType=${uniqueTypeChecked ? 1 : 0}`;

// Выполнение запроса с использованием API fetch
fetch(url)
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.blob();
    })
    .then(blob => {
        // Создание ссылки для скачивания файла
        const url = window.URL.createObjectURL(new Blob([blob]));
        const a = document.createElement('a');
        a.href = url;
        a.download = '{query}&fz44&okkt={okkt}&uniqueType={uniqueType}.xlsx';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
    })
    .catch(error => {
        console.error('Fetch error:', error);
    });



  };

  return (
    <div class="form">
        <label>
            Товар:
            <input type="text" id="query" />
        </label>

        <div>
            <label>
                <input type="checkbox" id="okktChecked" />
                Все товары закупки соответствуют поиску
            </label>
        </div>

        <div>
            <label>
                <input type="checkbox" id="uniqueTypeChecked" />
                Поиск по okpd/ktru
            </label>
        </div>

        <div>
            <button onclick="handleSearch()">Поиск</button>
        </div>
    </div>
  );
};

export default SearchForm;
*/


import React, { useState } from 'react';
import './form.css';
//import * as XLSX from 'xlsx';

const SearchForm = () => {
  const [query, setQuery] = useState('');
  const [okktChecked, setOkktChecked] = useState(false);
  const [uniqueTypeChecked, setUniqueTypeChecked] = useState(false);
  const [fz44Checked, setFz44Checked] = useState(false);

  const handleSearch = async () => {
    // Формируем массив параметров запроса
    const queryParams = [
      `query=${encodeURIComponent(query)}`,
      `fz44=`,
      `okkt=${okktChecked ? 1 : 0}`,
      `uniqueType=${uniqueTypeChecked ? 1 : 0}`,
    ];

    // Добавляем параметр fz44 только если он отмечен

    // Соединяем параметры запроса в строку URL
    const queryString = queryParams.join('&');

    try {
      // Отправляем GET-запрос
      const response = await fetch(`http://213.171.8.164:5000/ZakupkiApi/get_report?${queryString}`);

      // Проверяем успешность запроса (статус 200-299)
      if (response.ok) {
        // Получаем данные в формате blob (двоичные данные)
        const blob = await response.blob();

        // Создаем объект Blob и URL для создания ссылки на файл
        const fileBlob = new Blob([blob], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        const fileUrl = URL.createObjectURL(fileBlob);

        // Создаем ссылку для скачивания файла
        const downloadLink = document.createElement('a');
        downloadLink.href = fileUrl;
        downloadLink.download = `${queryString}.xlsx`;
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);

        // Освобождаем URL
        URL.revokeObjectURL(fileUrl);
      } else {
        console.error('Ошибка при выполнении запроса:', response.statusText);
      }
    } catch (error) {
      console.error('Произошла ошибка:', error.message);
    }
  };

  return (
    <div className="form">
      <label>
        Товар:
        <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} />
      </label>

      <div>
        <label>
          <input type="checkbox" checked={uniqueTypeChecked} onChange={() => setUniqueTypeChecked(!uniqueTypeChecked)} />
          Все товары закупки соответствуют поиску
        </label>
      </div>

      <div>
        <label>
          <input type="checkbox" checked={okktChecked} onChange={() => setOkktChecked(!okktChecked)} />
          Поиск по okpd/ktru
        </label>
      </div>

      <div>
        <label>
          <input type="checkbox" checked={fz44Checked} onChange={() => setFz44Checked(!fz44Checked)} />
          44-ФЗ
        </label>
      </div>

      <div>
        <button onClick={handleSearch}>Скачать файл</button>
      </div>
    </div>
  );
};

export default SearchForm;