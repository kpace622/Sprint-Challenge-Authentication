/* 
  complete the middleware code to check if the user is logged in
  before granting access to the next middleware/route handler
*/

const jwt = require('jsonwebtoken');


module.exports = (req, res, next) => {
  // res.status(401).json({ you: 'shall not pass!' });

  const token = req.headers.authorization;

  if (!token) {
    res.status(401).json({ message: 'missing token'})
  } else if (token) {
    jwt.verify(token, 'mysecret', (err, decodedToken) => {
      if (err) {
        res.status(401).json({message: 'You shall not pass!'})
      } else {
        req.decodedToken = decodedToken;
        next();
      }
    })
  }
};
