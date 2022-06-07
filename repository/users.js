const fs = require('fs');

const userData = fs.readFileSync('repository/test.json', "utf8")
const users = JSON.parse(userData);

const column = {
    findAll : function (fvalue) {
        return users.user;
    },
    
    findOne : function (fvalue) {
        const result = users.user.find( element => element.id == fvalue);
        return result;
    },
    
    insert : function (req) {
        const ids = users.user.map(user => user.id)
        const maxId = Math.max(...ids)
      
        const { body } = req
        const { name, age } = body
      
        const newUser = {
          "id": maxId + 1,
          "name": name,
          "age": age
        }
        users.user.push(newUser);

        console.log(users);
        const userJSON = JSON.stringify(users)
        console.log();

        fs.writeFile("./repository/test.json", userJSON, function(err) {
            if (err) {
                console.log(err);
            }
        });

        return newUser;
    },
    
    remove : function (fvalue) {
        const found = users.user.findIndex(element => element.id == fvalue);
        users.user.splice(found, 1);

        const userJSON = JSON.stringify(users)

        fs.writeFile("./repository/test.json", userJSON, function(err) {
            if (err) {
                console.log(err);
            }
        });
        return users.user;
    },
    
    update : function (req, fvalue) {
        const found = users.user.findIndex(element => element.id == fvalue);
        const newUser = {
          "id": Number(fvalue),
          "name": req.body.name,
          "age": req.body.age
        }
        users.user.splice(found, 1, newUser);

        const userJSON = JSON.stringify(users)

        fs.writeFile("./repository/test.json", userJSON, function(err) {
            if (err) {
                console.log(err);
            }
        });

        return users.user;
    }
    
}



module.exports = column;