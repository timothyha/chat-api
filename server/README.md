chat-api, server part
=====================

common.php:
- initializes the DB (using PDO, charset=windows-1251)

API functions in UTF-8, so before putting into query and after exporting from query we have do perform conversion
- input_conv, utf-8 to windows-1251 conversion for DB queries
- output_conv, windows-1251 to utf-8 conversion of DB data for JSON responses