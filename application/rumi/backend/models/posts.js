var db = require("../conf/database");
const PostModel = {};

PostModel.search = (
  searchTerm,
  location,
  pricefrom,
  priceto,
  parking,
  pet,
  smoking,
  gender,
  page,
  size
) => {
  parameters = [];

  let baseSQL = `SELECT p.*, u.username
    FROM post p 
    JOIN user u
    ON p.creator_id = u.id
    WHERE p.deleted = 0 and u.deleted = 0 and u.activated = 1 `;

  if (searchTerm) {
    baseSQL += ` AND (caption like ? OR description like ?) `;
    let sqlReadySearchTerm = "%" + searchTerm + "%";
    parameters.push(sqlReadySearchTerm);
    parameters.push(sqlReadySearchTerm);
  }
  if (location) {
    baseSQL += ` AND ( `;
    for (var i = 0; i < location.length; i++) {
      if (i != 0) {
        baseSQL += ` OR `;
      }
      baseSQL += `location = ? `;
      parameters.push(location[i]);
    }

    baseSQL += ` ) `;
  }
  if (pricefrom) {
    baseSQL += ` AND price >= ? `;
    parameters.push(pricefrom);
  }
  if (priceto) {
    baseSQL += ` AND price <= ? `;
    parameters.push(priceto);
  }
  if (parking) {
    baseSQL += ` AND parking = ? `;
    parameters.push(parking);
  }
  if (pet) {
    baseSQL += ` AND pet = ? `;
    parameters.push(pet);
  }
  if (smoking) {
    baseSQL += ` AND smoking = ? `;
    parameters.push(smoking);
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

PostModel.queryById = (id) => {
  let baseSQL = `SELECT * FROM post WHERE id = ?;`;
  
  return db
    .execute(baseSQL, [id])
    .then(([results, fields]) => {
      return Promise.resolve(results);
    })
    .catch((err) => Promise.reject(err));
};

PostModel.create = (
  caption,
  description,
  photo,
  thumbnail,
  location,
  price,
  parking,
  pet,
  smoking,
  gender,
  creator_id
) => {
  let baseSQL = `INSERT INTO post 
  (caption, description, photo, thumbnail, location, price, parking, pet, smoking, gender, creator_id, deleted) 
  VALUES 
  (?,?,?,?,?,?,?,?,?,?,?,0);`;

  return db
    .execute(baseSQL, [
      caption,
      description,
      photo,
      thumbnail,
      location,
      price,
      parking,
      pet,
      smoking,
      gender,
      creator_id,
    ])
    .then(([results, fields]) => {
      return Promise.resolve(results);
    })
    .catch((err) => Promise.reject(err));
};

PostModel.delete = (id) => {
  let baseSQL = `UPDATE post SET deleted = 1 WHERE id = ?;`;
  return db
    .execute(baseSQL, [id])
    .then(([results, fields]) => {
      return Promise.resolve(results && results.affectedRows);
    })
    .catch((err) => Promise.reject(err));
};

module.exports = PostModel;
