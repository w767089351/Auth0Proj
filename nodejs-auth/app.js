const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const authConfig = require("./auth_config.json");
const jwt = require("express-jwt");
const jwksRsa = require("jwks-rsa");
const { auth } = require('express-oauth2-jwt-bearer');
const axios = require('axios');
const app = express();

const port = process.env.API_PORT || 3001;
const appPort = process.env.SERVER_PORT || 3000;
const appOrigin = authConfig.appOrigin || `http://localhost:${appPort}`;

var jwtCheck = jwt({
      secret: jwksRsa.expressJwtSecret({
          cache: true,
          rateLimit: true,
          jwksRequestsPerMinute: 5,
          jwksUri: 'https://clique2046.us.auth0.com/.well-known/jwks.json'
    }),
    audience: 'https://nodejs-auth/api',
    issuer: 'https://clique2046.us.auth0.com/',
    algorithms: ['RS256']
});

app.use(morgan("dev"));
app.use(helmet());
app.use(cors({ origin: appOrigin }));


app.get("/api/protected", jwtCheck, async(req, res) => {

    try {
        const accessToken = req.headers.authorization.split(' ')[1];
        const response = await axios.get('https://clique2046.us.auth0.com/userinfo', {
            headers: {
                authorization: `Bearer ${accessToken}`
            }
        });
        const userinfo = response.data
        console.log(userinfo)
        res.send({
            msg: "You called the protected endpoint!",
            userInfo: userinfo
        });

    } catch (error) {

    }


});

app.listen(port, () => console.log(`API Server listening on port ${port}`));
