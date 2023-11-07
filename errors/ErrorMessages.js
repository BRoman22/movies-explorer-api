const errMessages = {
  user: {
    notFound: 'Пользователь с указанным _id не найден',
    badRequestCreate: 'Некорректные данные при создании пользователя',
    badRequestUpdate: 'Некорректные данные при обновлении пользователя',
    conflict: 'Пользователь с такими данными уже существует',
  },
  movie: {
    notFound: 'Фильм с указанным _id не найден',
    forbidden: 'Нет прав доступа',
    badRequestCreate: 'Некорректные данные при создании фильма',
    badRequestDelete: 'Некорректные данные при удалении фильма',
  },
  auth: {
    badRequest: 'Некорректные данные при',
    notFound: 'Такой ресурс еще не создан',
  },
  unauthorized: 'Необходима авторизация',
  tooManyRequests: 'Слишком много запросов, пожалуйста, повторите попытку позже',
  internalServerError: 'На сервере произошла ошибка',
};

export default errMessages;
