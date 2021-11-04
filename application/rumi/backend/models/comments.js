var db = require("../conf/database");
const CommentModel = {};

CommentModel.search = (
    id,
    creator_id,
    post_id,
) => {
  parameters = [];

  let baseSQL = `SELECT c.*, u.username
    FROM comment c  
    JOIN user u 
    ON c.creator_id = u.id
    WHERE c.deleted = 0 and u.deleted = 0 and u.activated = 1 `;
  
  if (id) {
    baseSQL += ` AND c.id = ? `;
    parameters.push(id);
  }
  if (creator_id) {
    baseSQL += ` AND creator_id = ? `;
    parameters.push(creator_id);
  }
  if (post_id) {
    baseSQL += ` AND post_id = ? `;
    parameters.push(post_id);
  }

  return db
    .execute(baseSQL, parameters)
    .then(([results, fields]) => {
      return Promise.resolve(results);
    })
    .catch((err) => Promise.reject(err));
};

module.exports = CommentModel;


