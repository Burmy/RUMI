var db = require("../conf/database");
const UserModel = {};

UserModel.search = (
    school,
    major,
    pets,
    smoker,
    gender
) => {
    return null;
}

UserModel.create = (
    id,
    username,
    password,
    last_name,
    first_name,
    email,
    phone,
    birthday,
    school,
    major,
    smoker,
    pets,
    language,
    interests,
    hobbies
) => {
    let baseSQL = `INSERT INTO post 
  (caption, description, photo, thumbnail, location, price, parking, pet, smoking, gender, creator_id, deleted) 
  VALUES 
  (?,?,?,?,?,?,?,?,?,?,?,0);`;
    return db
        .execute(baseSQL, [
            id,
            username,
            password,
            last_name,
            first_name,
            email,
            phone,
            birthday,
            school,
            major,
            smoker,
            pets,
            language,
            interests,
            hobbies
        ])
        .then(([results, fields]) => {
            return Promise.resolve(results);
        })
        .catch((err) => Promise.reject(err));
};

module.exports = UserModel;
