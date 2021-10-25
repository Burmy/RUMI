var db = require("../conf/database");
const UserModel = {};

UserModel.getById = (id) => {
    let baseSQL = `SELECT * FROM user WHERE id = ?;`;
    
    return db
    .execute(baseSQL, [id])
    .then(([results, fields]) => {
      return Promise.resolve(results);
    })
    .catch((err) => Promise.reject(err));
}

module.exports = UserModel;
