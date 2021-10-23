var db = require("../conf/database");
const PostModel = {};

PostModel.search = (searchTerm, location, pricefrom, priceto) => {
  let sqlReadySearchTerm = "%" + searchTerm + "%";
  parameters = [sqlReadySearchTerm];

  let baseSQL = `SELECT * 
    FROM post 
    WHERE caption like ? AND deleted = 0 `;

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

  baseSQL += ` LIMIT 20 `;

  console.log(baseSQL);

  return db
    .execute(baseSQL, parameters)
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
  creator_id
) => {
  let baseSQL = `INSERT INTO post 
  (caption, description, photo, thumbnail, location, price, creator_id, deleted) 
  VALUES 
  (?,?,?,?,?,?,?,0);`;

  return db
    .execute(baseSQL, [
      caption,
      description,
      photo,
      thumbnail,
      location,
      price,
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
  .then(([results, fields])=> {
    return Promise.resolve(results && results.affectedRows);
  })
  .catch((err) => Promise.reject(err));
};

module.exports = PostModel;
