import dotenv from 'dotenv';

dotenv.config({
    path: "./src/.env", override:true
});

const config={
    port:process.env.PORT,
    mongoUrl: process.env.MONGO_URL,
    secret: process.env.SECRET,
    clientId: process.env.GITHUB_CLIENT_ID,
    githubSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackUrl: process.env.CALLBACK_URL
}

export default config