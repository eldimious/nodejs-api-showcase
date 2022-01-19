/* eslint-disable no-underscore-dangle */
const passwordComplexity = require('joi-password-complexity');
const {
  body,
  param,
  validationResult,
} = require('express-validator');
const errorHandler = require('../routes/errors');
const errors = require('../../../common/errors');
const {
  PASSWORD_COMPLEXITY,
} = require('../../../common/constants');

const isMongoObjectID = (value) => /^[0-9a-fA-F]{24}$/.test(value);

const requireSameUser = () => [
  param('userId')
    .exists()
    .withMessage('You can manage a user doc for your own user;')
    .custom((value, { req }) => {
      if (value !== req.user._id) {
        return false;
      }
      return true;
    })
    .withMessage({
      message: 'You can manage a user doc for your own user;',
      status: 403,
    }),
];

const requireValidUserBody = () => {
  let passwordErrorMsg;
  return [
    body('email')
      .exists()
      .isEmail()
      .withMessage({
        message: 'email not provided. Make sure you have a "email" property in your body params.',
        status: 400,
      }),
    body('name')
      .exists()
      .withMessage({
        message: 'name not provided. Make sure you have a "name" property in your body params.',
        status: 400,
      }),
    body('username')
      .exists()
      .withMessage({
        message: 'username not provided. Make sure you have a "username" property in your body params.',
        status: 400,
      }),
    body('surname')
      .exists()
      .withMessage({
        message: 'surname not provided. Make sure you have a "surname" property in your body params.',
        status: 400,
      }),
    body('password')
      .exists()
      .withMessage({
        message: 'password not provided. Make sure you have a "password" property in your body params.',
        status: 400,
      })
      .custom((value) => {
        const passwordChecking = passwordComplexity(PASSWORD_COMPLEXITY, 'Password').validate(value);
        passwordErrorMsg = passwordChecking && passwordChecking.error && passwordChecking.error.details && Array.isArray(passwordChecking.error.details)
          ? passwordChecking.error.details[0].message
          : null;
        if (passwordErrorMsg) {
          return false;
        }
        return true;
      })
      .withMessage(() => ({
        message: passwordErrorMsg,
        status: 400,
      })),
  ];
};

const requireBodyParamsForLogin = () => [
  body('email')
    .exists()
    .isEmail()
    .withMessage({
      message: 'email not provided. Make sure you have a "email" property in your body params.',
      status: 400,
    }),
  body('password')
    .exists()
    .withMessage({
      message: 'password not provided. Make sure you have a "password" property in your body params.',
      status: 400,
    }),
];

const requireValidPostId = () => [
  param('postId')
    .exists()
    .withMessage({
      message: 'Add a valid post id.',
      status: 400,
    })
    .custom((value) => {
      if (!isMongoObjectID(value)) {
        return false;
      }
      return true;
    })
    .withMessage({
      message: 'Add a valid post id.',
      status: 400,
    }),
];

const requireValidPostBody = () => [
  body('imageUrl')
    .exists()
    .isURL()
    .withMessage({
      message: 'imageUrl not provided. Make sure you have a "imageUrl" property in your body params.',
      status: 400,
    }),
  body('publisher')
    .exists()
    .withMessage({
      message: 'publisher not provided. Make sure you have a "publisher" property in your body params.',
      status: 400,
    }),
];

const validate = (req, res, next) => {
  const validationErrors = validationResult(req);
  if (validationErrors.isEmpty()) {
    return next();
  }
  const validationError = validationErrors.array({
    onlyFirstError: true,
  })[0];
  const errMsg = validationError?.msg?.message || 'Bad request';
  const errStatus = validationError?.msg?.status || 400;
  return errorHandler(new errors[errStatus](errMsg, 'BAD_BODY_PARAMS'), req, res, next);
};

const validateCreateUserBody = () => [
  requireValidUserBody(),
  validate,
];

const validateUserToken = () => [
  requireSameUser(),
  validate,
];

const validateLoginBodyParams = () => [
  requireBodyParamsForLogin(),
  validate,
];

const validatePostId = () => [
  requireValidPostId(),
  validate,
];

const validateCreatePostBody = () => [
  requireValidPostBody(),
  validate,
];

module.exports = {
  validateUserToken,
  validateCreateUserBody,
  validateLoginBodyParams,
  validatePostId,
  validateCreatePostBody,
};
