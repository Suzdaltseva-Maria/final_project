import he from 'he'; // Установите библиотеку: npm install he

export function parseAPIResponse(markup) {
  // Проверяем наличие данных
  if (!markup || typeof markup !== 'string') {
    console.error("Invalid markup provided to parseAPIResponse:", markup);
    return { textContent: "", imageUrl: null };
  }

  try {
    // 1. Декодируем экранированные символы
    const decodedMarkup = he.decode(markup);

    // 2. Парсим декодированный текст как XML/HTML
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(decodedMarkup, "text/html");

    // 3. Извлекаем текст без разметки
    const sentences = Array.from(xmlDoc.getElementsByTagName("sentence"));
    const textContent = sentences.map(sentence => sentence.textContent.trim()).join(" ");

    // 4. Ищем тег <img> и извлекаем ссылку на изображение
    const imgTag = xmlDoc.querySelector("img");
    const imageUrl = imgTag ? imgTag.getAttribute("src") : null;

    return { textContent, imageUrl };
  } catch (error) {
    console.error("Error parsing API response:", error);
    return { textContent: "", imageUrl: null };
  }
}
