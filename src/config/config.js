import dotenv from 'dotenv';

dotenv.config();

export default{
    port:process.env.PORT,
    mongoUrl: process.env.MONGO_URL,
    secret: process.env.SECRET,
    clientId: process.env.GITHUB_CLIENT_ID,
    githubSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackUrl: process.env.CALLBACK_URL
}