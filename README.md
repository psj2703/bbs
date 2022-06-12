# bbs

## DB

```
CREATE DATABASE bbs_user_db;

USE bbs_user_db;

CREATE TABLE user
(   id    INT(10) NOT NULL PRIMARY KEY,
    name  VARCHAR(30) NOT NULL,
    age   INT NOT NULL
);

INSERT INTO user VALUES (101, 'jisung', 41);
INSERT INTO user VALUES (102, 'heungmin', 33);
```

## ready

```
npm i -g nodemon
npm i
```

## run

```
npm run start
```