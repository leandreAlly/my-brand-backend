const jwt = require('jsonwebtoken');

        module.exports = (req, res, next) => {

          try {
            const token = req.headers.authorization.split(' ')[1];
            const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
            const userId = decodedToken.userId;
            req.auth = ({ userId });
            
            if (req.body.userId && req.auth.userId !== userId){
                throw 'Invalid user ID';
            }else{
                next();
            }
        } catch{
            res.status(401).json({
                error: new Error('Invalid request!')
            });
        }
         


}
// const token = 

// req.body.token || req.query.token || req.headers["x_access_token"];

// if (!token) {
//   return res.status(403).send("A token is required for authentication");
// }
// try {
//   const decoded = jwt.verify(token, process.env.TOKEN_KEY);
//   req.user = decoded;
// } catch (err) {
//   return res.status(401).send("Invalid Token");
// }
// return next();