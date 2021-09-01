var db = require("../conf/database");
const PostModel = {};

PostModel.create = (title, description, img_path, thumbnail, user_Id) => {
  let baseSQL = `INSERT INTO post (title, description, img_path, thumbnail, create_time, user_id) 
                 VALUE (?,?,?,?, now(), ?);`;
  return db
    .execute(baseSQL, [title, description, img_path, thumbnail, user_Id])
    .then(([results, fields]) => {
      return Promise.resolve(results && results.affectedRows);
    })
    .catch((err) => Promise.reject(err));
};

PostModel.search = (searchTerm) => {
  let baseSQL = `SELECT id, title, description, thumbnail, concat_ws(' ', title, description) AS haystack
                 FROM post
                 HAVING haystack like ?;`;
  let sqlReadySearchTerm = "%" + searchTerm + "%";
  return db
    .execute(baseSQL, [sqlReadySearchTerm])
    .then(([results, fields]) => {
      return Promise.resolve(results);
    })
    .catch((err) => Promise.reject(err));
};

PostModel.getNRecentPosts = (numberOfPost) => {
  let baseSQL = `SELECT id, title, description, thumbnail, create_time 
                 FROM post 
                 ORDER BY create_time DESC 
                 LIMIT 10`;
                 
  return db
    .execute(baseSQL, [])
    .then(([results, fields]) => {
      return Promise.resolve(results);
    })
    .catch((err) => Promise.reject(err));
};

PostModel.getPostById = (postId) => {
  var reg = /^\d+$/;
  if(!reg.test(postId)) {
    return Promise.reject("invalid postId");
  }

  let baseSQL = `SELECT u.username, p.title, p.description, p.img_path, p.create_time 
                 FROM user u
                 JOIN post p
                 ON u.id = p.user_id
                 WHERE p.id=?;`;

  return db
    .execute(baseSQL, [postId])
    .then(([results, fields]) => Promise.resolve(results[0]))
    .catch((err) => Promise.reject(err));
};

module.exports = PostModel;
