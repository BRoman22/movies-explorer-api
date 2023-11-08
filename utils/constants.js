export const jwtCookieConfig = {
  httpOnly: true,
  sameSite: true,
  secure: true,
  maxAge: 3600000 * 24 * 7,
};

export const corsConfig = {
  origin: [
    'https://movies-explorer.nomoredomainsmonster.ru',
    'http://movies-explorer.nomoredomainsmonster.ru',
    // 'http://localhost:3000',
  ],
  credentials: true,
  maxAge: 60,
  allowedHeaders: ['Content-Type'],
};

export const httpRegex = /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_+.~#?&/=]*)$/;

export const salt = 10;
