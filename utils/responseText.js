const responseText = {
  error: {
    badRequest: {
      userCreate: 'Некорректные данные при создании пользователя',
      userUpdate: 'Некорректные данные при обновлении пользователя',
      movieCreate: 'Некорректные данные при создании фильма',
      movieDelete: 'Некорректные данные при удалении фильма',
    },
    notFound: {
      user: 'Пользователь с указанным _id не найден',
      movie: 'Фильм с указанным _id не найден',
      path: 'Такой ресурс еще не создан',
    },
    unauthorized: {
      needAuth: 'Необходима авторизация',
      badCredentials: 'Неправильные почта или пароль',
    },
    forbidden: 'Нет прав доступа',
    conflict: 'Пользователь с такими данными уже существует',
    tooManyRequests: 'Слишком много запросов, пожалуйста, повторите попытку позже',
    internalServerError: 'На сервере произошла ошибка',
  },

  message: {
    userLogin: 'Вы вошли в свой аккаунт',
    userLogout: 'Вы вышли из своего аккаунта',
    movieDelete: 'Фильм удален',
  },
};

export default responseText;
