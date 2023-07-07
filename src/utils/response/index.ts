import message from './message';

/**
 * response util
 * @param res
 * @param statusCode : int ex) 200, 400, 401, 409, 500, ...
 * @param resCode : string ex) '0000', '0001', ...
 * @param msg : string 메세지
 * @param body : object statusCode = 200: body로 활용, statusCode = 500: error로 활용 ex) {userpkey: 1, username: ''}
 * @returns {*}
 */
export const response = (res, statusCode, resCode, msg = '', body = {}) => {
  if (statusCode === 500) {
    return res.status(statusCode).json({
      resCode: resCode,
      msg:
        msg === ''
          ? message[resCode] !== undefined
            ? message[resCode]
            : ''
          : msg,
      error: body,
    });
  } else {
    return res.status(statusCode).json({
      resCode: resCode,
      msg:
        msg === ''
          ? message[resCode] !== undefined
            ? message[resCode]
            : ''
          : msg,
      body: body,
    });
  }
};
