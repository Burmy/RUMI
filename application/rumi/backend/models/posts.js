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

  console.log(location);

  if (location) {
    baseSQL += ` AND ( `;
    for (var i = 0; i < location.length; i++) {
      if (i != 0) {
        baseSQL += ` OR `;
      }
      baseSQL += `p.location = ? `;
      parameters.push(location[i]);
    }

    baseSQL += ` ) `;
  }
  if (major) {
    baseSQL += ` AND ( `;
    for (var i = 0; i < major.length; i++) {
      if (i != 0) {
        baseSQL += ` OR `;
      }
      baseSQL += `u.major = ? `;
      parameters.push(major[i]);
    }

    baseSQL += ` ) `;
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

  console.log(baseSQL);

  return db
    .execute(baseSQL, parameters)
    .then(([results, fields]) => {
      return Promise.resolve(results);
    })
    .catch((err) => Promise.reject(err));
};

module.exports = PostModel;
