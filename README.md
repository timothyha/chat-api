chat-api
========

API for chat server at jesuschrist.ru

- SSL only
- JSON format, POST requests
- Responses will always contain "err" property for error code; error code is mnemonic, ERR_USERNOTFOUND, ERR_DBNOTFOUND, etc.

*Login, logout:*
- /chapi/login
- /chapi/logout

*Main functionality:*
- /chapi/users - list of logged in users
- /chapi/private - application can choose to load only private messages, thus chat server/app would become something like a pager
- /chapi/public - load main room messages
- /chapi/send - send a message, either public or private

*Moderator/admin:*
- /chapi/admin_notify - send global notification
- /chapi/admin_kick - kick a user out of chat
- /chapi/admin_restore - restore a user to normal