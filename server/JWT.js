const { sign, verify } = require("jsonwebtoken");
require("dotenv").config();

const create_tokens= (user) => {
    const access_token = sign({ 
        name: user.name, 
        email: user.email, 
        password: user.password,
        posts: user.posts,
        username : user.username,
        dark_mode : user.dark_mode,} , process.env.JWT_ACCESS_TOKEN);

    return access_token;
}

const verify_tokens = (token) => {
    const access_token = verify(token, process.env.JWT_ACCESS_TOKEN);

    return access_token;
}

module.exports = { create_tokens , verify_tokens };
