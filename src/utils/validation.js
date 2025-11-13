// export const validateForm = ({ login, password }) => {
//   let isValid = true;
//   const newErrors = { login: '', password: '' };

//   if (!login) {
//     isValid = false;
//     newErrors.login = 'Введите корректные данные';
//   }

//   if (!password) {
//     isValid = false;
//     newErrors.password = 'Введите пароль';
//   }

//   return { isValid, errors: newErrors };
// };


export const validateForm = ({ login, password }) => {
  const errors = {};

  if (!login) {
    errors.login = 'Введите логин';
  }

  if (!password) {
    errors.password = 'Введите пароль';
  }

  return {
    isValid: Object.keys(errors).length === 0, // Форма валидна, если ошибок нет
    errors,
  };
};


export const validateINN = (inn) => {
    if (!/^\d{10}$/.test(inn)) {
      return 'ИНН должен состоять из 10 цифр.';
    }
    return '';
  };
  
  export const validateDocumentCount = (count) => {
    if (count < 1 || count > 1000) {
      return 'Введите значение от 1 до 1000.';
    }
    return '';
  };
  
  export const validateDateRange = (startDate, endDate) => {
    const now = new Date();
    const start = new Date(startDate);
    const end = new Date(endDate);
  
    if (startDate && new Date(startDate) > now) {
      return 'Дата начала не должна быть в будущем.';
    }
  
    if (endDate && new Date(endDate) > now) {
      return 'Дата окончания не должна быть в будущем.';
    }
  
    if (startDate && endDate && start > end) {
      return 'Дата начала не может быть позже даты конца.';
    }
  
    return '';
  };
  