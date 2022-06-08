// CREATE DATABASE bbs_user_db;

// USE bbs_user_db;

// CREATE TABLE user
// (   id    INT(10) NOT NULL PRIMARY KEY,
//     name  VARCHAR(30) NOT NULL,
//     age   INT NOT NULL
// );

// INSERT INTO user VALUES (101, 'hyunjae', 35);
// INSERT INTO user VALUES (102, 'jinsuk', 35);
// INSERT INTO user VALUES (103, 'dongil', 41);
// INSERT INTO user VALUES (104, 'seongjae', 38);




const column = {
    findAll : function (data) {
        let result = {
            "user": []
        };
        let i = 0;
        while(i < data.length) {
            newUser = {
                "id": Number(data[i].id),
                "name" : data[i].name,
                "age": Number(data[i].age)
            }
            result.user.push(newUser);
            i++
        }
        return result.user;
    },
    
    findOne : function (data, fvalue) {
        let result = {
            "user": []
        };
        let i = 0;
        while(i < data.length) {
            newUser = {
                "id": Number(data[i].id),
                "name" : data[i].name,
                "age": Number(data[i].age)
            }
            result.user.push(newUser);
            i++
        }
        result = result.user.find( element => element.id == fvalue);
        return result;
    },
    
    insert : function (data, req) {
        const users = this.findAll(data);
        const ids = users.map(user => user.id)
        const maxId = Math.max(...ids) + 1
      
        const { body } = req
        const { name, age } = body
      
        const newUser = {
            "id": Number(maxId),
            "name" : name,
            "age": Number(age)
        }
        return newUser;
    },
    
    remove : function (data) {
        const users = this.findAll(data)
        return users;
    },
    
    update : function (data, req, fvalue) {
        const users = this.findAll(data)
        const found = users.findIndex(element => element.id == fvalue);
        const newUser = {
          "id": Number(fvalue),
          "name": req.body.name,
          "age": req.body.age
        }
        users.splice(found, 1, newUser);
        const userJSON = JSON.stringify(users)
        return users;
    }
}

module.exports = column;