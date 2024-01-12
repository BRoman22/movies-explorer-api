<h1 align="center">Проект Movies explorer (backend часть)</h1>
<br>

<h2>1. Описание проекта</h2>
Сервис, в котором можно найти фильмы по запросу и сохранить в личном кабинете.

<h2>2. Стек технологий</h2>
<div>
  <img src="https://img.shields.io/badge/node.js-026e00?style=for-the-badge&logo=node.js&logoColor=white" alt="иконка node.js">
  <img src="https://img.shields.io/badge/express-black?style=for-the-badge&logo=express&logoColor=white" alt="иконка express">
  <img src="https://img.shields.io/badge/mongodb-00ED64?style=for-the-badge&logo=mongodb&logoColor=white" alt="иконка mongoDB">
  <img src="https://img.shields.io/badge/nginx-009639?style=for-the-badge&logo=nginx&logoColor=white" alt="иконка nginx">
</div>

<h2>3. Процесс создания</h2>

* Созданы модели и контроллеры. Роуты защищены авторизацией. Валидация построена на `celebrate`.

* Реализована аутентификация пользователей с помощью `JWT` и `Cookies`.

* Настроены логирование и централизованный обработчик ошибок.

* Деплой. Виртуальная машина собрана на базе `yandex.cloud`. Настроены `Nginx`, `pm2`, выпущены `SSL` сертификаты.

<h2>4. Ссылки на проект</h2>

* Backend https://api.movies-explorer.nomoredomainsmonster.ru

* Чеклист и кретирии оценки https://code.s3.yandex.net/web-developer/static/new-program/web-diploma-criteria-2.0/index.html#backend

* Pull request https://github.com/BRoman22/movies-explorer-api/pull/2
