export const extractImageSrc = (markup) => {
    try {
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(markup, 'application/xml');
  
      // Проверяем ошибки парсинга
      const parserError = xmlDoc.querySelector('parsererror');
      if (parserError) {
        console.error('Ошибка парсинга XML:', parserError.textContent);
        return null;
      }
  
      // Извлекаем тег <img> и атрибут src
      const imgTag = xmlDoc.querySelector('img');
      return imgTag ? imgTag.getAttribute('src') : null;
    } catch (error) {
      console.error('Ошибка обработки изображения:', error);
      return null;
    }
  };
  