'use strict';

// load deps
let express = require('express');

module.exports = (Controller) => {
  let router = express.Router();

  /**
   * @apiDefine authenticated Authenticated access only
   * Authentication via oAuth is required for this request.
   */

  /**
   * @apiDefine admin Admin access only
   * Administrator permissions are required for this request.
   */

  /**
   * @apiDefine UserNotFoundError
   *
   * @apiError UserNotFound The <code>id</code> of the User was not found.
   *
   * @apiErrorExample Error-Response:
   *     HTTP/1.1 400 Bad Request
   */

  /**
   * @apiDefine UserNotAuthenticatedError
   *
   * @apiError UserNotAuthenticated Only authencicated users can access the data.
   *
   * @apiErrorExample Error-Response:
   *     HTTP/1.1 403 Forbidden
   */

  /**
   * @api {get} /api/user/ Get a list of User data
   * @apiName ListUsers
   * @apiGroup User
   * @apiPermission none
   *
   * @apiDescription Fetches a list of user profiles.
   *
   * @apiExample Example usage:
   * curl -H "Content-Type: application/json" http://localhost:8080/api/users/
   *
   * @apiSuccess {String}   username        Fullname of the User.
   * @apiSuccess {String}   email           Email address.
   * @apiSuccess {Object}   github          GitHub Profile info.
   * @apiSuccess {String}   github.nick     User handle.
   * @apiSuccess {String}   github.link     Profile link.
   * @apiSuccess {Object}   twitter         Twitter Profilie info.
   * @apiSuccess {String}   twitter.nick    User handle.
   * @apiSuccess {String}   twitter.link    Feed link.
   * @apiSuccess {Object}   linkedin        LinkedIn Profile info.
   * @apiSuccess {String}   linkedin.nick   User handle.
   * @apiSuccess {String}   linkedin.link   Profile link.
   * @apiSuccess {Object}   website         Website Info.
   * @apiSuccess {String}   website.title   Title.
   * @apiSuccess {String}   website.link    URL.
   * @apiSuccess {Object}   account         Internal user options
   * @apiSuccess {Object}   curriculum      Curriculum the user is enrolled in.
   * @apiSuccess {Object}   location        Location information.
   *
   * @apiUse UserNotFoundError
   */
  router.get('/', Controller.show);

  /**
   * @api {get} /api/user/:id Get User
   * @apiName GetUser
   * @apiGroup User
   * @apiPermission none
   *
   * @apiDescription Fetches a user's profile data.
   *
   * @apiParam {String}     id              User's ID.
   *
   * @apiExample Example usage:
   * curl -H "Content-Type: application/json" http://localhost:8080/api/users/[id]
   *
   * @apiSuccess {String}   username        Fullname of the User.
   * @apiSuccess {String}   email           Email address.
   * @apiSuccess {Object}   github          GitHub Profile info.
   * @apiSuccess {String}   github.nick     User handle.
   * @apiSuccess {String}   github.link     Profile link.
   * @apiSuccess {Object}   twitter         Twitter Profilie info.
   * @apiSuccess {String}   twitter.nick    User handle.
   * @apiSuccess {String}   twitter.link    Feed link.
   * @apiSuccess {Object}   linkedin        LinkedIn Profile info.
   * @apiSuccess {String}   linkedin.nick   User handle.
   * @apiSuccess {String}   linkedin.link   Profile link.
   * @apiSuccess {Object}   website         Website Info.
   * @apiSuccess {String}   website.title   Title.
   * @apiSuccess {String}   website.link    URL.
   * @apiSuccess {Object}   account         Internal user options
   * @apiSuccess {Object}   curriculum      Curriculum the user is enrolled in.
   * @apiSuccess {Object}   location        Location information.
   *
   * @apiUse UserNotFoundError
   */
  router.get('/:id', Controller.get);

  /**
   * @api {get} /api/user/ Create User
   * @apiName CreateUser
   * @apiGroup User
   * @apiPermission authenticated
   *
   * @apiDescription Creates a user profile.
   *
   * @apiExample Example usage:
   * curl -H "Content-Type: application/json" -X POST -d '{ "username":"Sam", "email":"samwise@theshire" }' http://localhost:8080/api/users/
   *
   * @apiSuccess {String}   username        Fullname of the User.
   * @apiSuccess {String}   email           Email address.
   * @apiSuccess {Object}   github          GitHub Profile info.
   * @apiSuccess {String}   github.nick     User handle.
   * @apiSuccess {String}   github.link     Profile link.
   * @apiSuccess {Object}   twitter         Twitter Profilie info.
   * @apiSuccess {String}   twitter.nick    User handle.
   * @apiSuccess {String}   twitter.link    Feed link.
   * @apiSuccess {Object}   linkedin        LinkedIn Profile info.
   * @apiSuccess {String}   linkedin.nick   User handle.
   * @apiSuccess {String}   linkedin.link   Profile link.
   * @apiSuccess {Object}   website         Website Info.
   * @apiSuccess {String}   website.title   Title.
   * @apiSuccess {String}   website.link    URL.
   * @apiSuccess {Object}   account         Internal user options
   * @apiSuccess {Object}   curriculum      Curriculum the user is enrolled in.
   * @apiSuccess {Object}   location        Location information.
   *
   * @apiUse UserNotFoundError
   * @apiUse UserNotAuthenticatedError
   */
  router.post('/', Controller.create);

  /**
   * @api {get} /api/user/:id Update User
   * @apiName UpdateUser
   * @apiGroup User
   * @apiPermission authenticated
   *
   * @apiDescription Updates a user profile.
   *
   * @apiParam   {String}   id              User's ID.
   *
   * @apiExample Example usage:
   * curl -H "Content-Type: application/json" -X PUT -d '{ "username":"Sam", "email":"samwise@theshire" }' http://localhost:8080/api/users/[id]
   *
   * @apiSuccess {String}   username        Fullname of the User.
   * @apiSuccess {String}   email           Email address.
   * @apiSuccess {Object}   github          GitHub Profile info.
   * @apiSuccess {String}   github.nick     User handle.
   * @apiSuccess {String}   github.link     Profile link.
   * @apiSuccess {Object}   twitter         Twitter Profilie info.
   * @apiSuccess {String}   twitter.nick    User handle.
   * @apiSuccess {String}   twitter.link    Feed link.
   * @apiSuccess {Object}   linkedin        LinkedIn Profile info.
   * @apiSuccess {String}   linkedin.nick   User handle.
   * @apiSuccess {String}   linkedin.link   Profile link.
   * @apiSuccess {Object}   website         Website Info.
   * @apiSuccess {String}   website.title   Title.
   * @apiSuccess {String}   website.link    URL.
   * @apiSuccess {Object}   account         Internal user options
   * @apiSuccess {Object}   curriculum      Curriculum the user is enrolled in.
   * @apiSuccess {Object}   location        Location information.
   *
   * @apiUse UserNotFoundError
   * @apiUse UserNotAuthenticatedError
   */
  router.put('/:id', Controller.update);

  /** delete a user */
  router.delete('/:id', Controller.destroy);

  return router;
};
