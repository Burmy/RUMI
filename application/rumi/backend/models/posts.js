var db = require("../conf/database");
const PostModel = {};

PostModel.search = (searchTerm, location, major, pricefrom, priceto) => {
  let sqlReadySearchTerm = "%" + searchTerm + "%";
  parameters = [sqlReadySearchTerm];

  let baseSQL = `SELECT p.* 
    FROM post p 
    JOIN user u
    ON u.id = p.creator_id
    WHERE p.caption like ? `;

  if (location) {
    baseSQL += ` AND p.location = ? `;
    parameters.push(location);
  }
  if (major) {
    baseSQL += ` AND u.major = ? `;
    parameters.push(major);
  }
  if (pricefrom) {
    baseSQL += ` AND p.price >= ? `;
    parameters.push(pricefrom);
  }
  if (priceto) {
    baseSQL += ` AND p.price <= ? `;
    parameters.push(priceto);
  }

  baseSQL += ` LIMIT 20 `;
  return db
    .execute(baseSQL, parameters)
    .then(([results, fields]) => {
      return Promise.resolve(results);
    })
    .catch((err) => Promise.reject(err));
};

module.exports = PostModel;
