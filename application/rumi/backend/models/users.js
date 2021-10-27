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
};

UserModel.search = (
  searchTerm,
  major,
  school,
  pet,
  smoker,
  gender,
  page,
  size
) => {
  parameters = [];

  let baseSQL = `SELECT * 
    FROM user 
    WHERE 1=1 `; // TODO delete = 0

  if (searchTerm) {
    baseSQL += ` AND description like ? `;
    let sqlReadySearchTerm = "%" + searchTerm + "%";
    parameters.push(sqlReadySearchTerm);
  }
  if (major) {
    baseSQL += ` AND major = ? `;
    parameters.push(major);
  }
  if (school) {
    baseSQL += ` AND school like ? `;
    parameters.push("%" + school + "%");
  }
  if (pet) {
    baseSQL += ` AND pets = ? `;
    parameters.push(pet);
  }
  if (smoker) {
    baseSQL += ` AND smoker = ? `;
    parameters.push(smoker);
  }
  if (gender) {
    baseSQL += ` AND gender = ? `;
    parameters.push(gender);
  }
  if (page && size && size < 200) {
    baseSQL += ` LIMIT ?, ? `;
    parameters.push(page);
    parameters.push(size);
  } else {
    baseSQL += ` LIMIT 20 `;
  }

  return db
    .execute(baseSQL, parameters)
    .then(([results, fields]) => {
      return Promise.resolve(results);
    })
    .catch((err) => Promise.reject(err));
};

UserModel.create = (
  username,
  password,
  email,
  description,
  gender,
  school,
  major,
  smoker,
  pets
) => {
  let baseSQL = `INSERT INTO user (
      username,
    password,
    email,
    description,
    gender,
    school,
    major,
    smoker,
    pets,
    deleted) 
    VALUES 
    (?,?,?,?,?,?,?,?,?,0);`;

  return db
    .execute(baseSQL, [
      username,
      password,
      email,
      description,
      gender,
      school,
      major,
      parseInt(smoker),
      parseInt(pets),
    ])
    .then(([results, fields]) => {
      if (results && results.affectedRows) {
        return Promise.resolve(results.insertId);
      } else {
        return Promise.resolve(-1);
      }
    })
    .catch((err) => Promise.reject(err));
};

UserModel.usernameExists = (username) => {
  return db
    .execute("SELECT * FROM user WHERE username = ?;", [username])
    .then(([results, fields]) => {
      return Promise.resolve(!(results && results.length == 0));
    })
    .catch((err) => Promise.reject(err));
};

UserModel.emailExists = (email) => {
  return db
    .execute("SELECT * FROM user WHERE email = ?;", [email])
    .then(([results, fields]) => {
      return Promise.resolve(!(results && results.length == 0));
    })
    .catch((err) => Promise.reject(err));
};

UserModel.authenticate = (username, password) => {
  let userId;
  let baseSQL = "SELECT id, username, password FROM user WHERE username = ?";
  return db
    .execute(baseSQL, [username])
    .then(([results, fields]) => {
      if (results && results.length == 1) {
        userId = results[0].id;
        return password == results[0].password;
      } else {
        return Promise.resolve(-1);
      }
    })
    .then((passwordsMatch) => {
      if (passwordsMatch) {
        return Promise.resolve(userId);
      } else {
        return Promise.resolve(-1);
      }
    })
    .catch((err) => Promise.reject(err));
};

module.exports = UserModel;
