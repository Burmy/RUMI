var db = require("../conf/database");
const CommentModel = {};

CommentModel.create = (userId, postId, comment) => {

  let baseSQL = `INSERT INTO comment (comment, postId, authorId)
                   VALUES (?,?,?);`;
  return db
    .query(baseSQL, [comment, postId, userId])
    .then(([results, fields]) => {
      if (results && results.affectedRows) {
        return Promise.resolve(results.insertId); // the row id that is just inserted.
      } else {
        return Promise.resolve(-1);
      }
    })
    .catch((err) => Promise.reject(err));
};

CommentModel.getComments = (postId) => {
  let baseSQL = `SELECT u.username, c.comment, c.create_time, c.id 
                 FROM comment c  
                 JOIN user u 
                 ON u.id = c.authorId 
                 WHERE c.postId = ? 
                 ORDER BY c.create_time DESC;`;
  return db
    .query(baseSQL, [postId])
    .then(([results, fields]) => {
      return Promise.resolve(results);
    })
    .catch((err) => Promise.reject(err));
};

module.exports = CommentModel;
