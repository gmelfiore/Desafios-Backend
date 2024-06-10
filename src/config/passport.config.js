import passport from "passport"
import local from "passport-local"
import github from "passport-github2"
import { UsuariosManagerMongo } from "../dao/usuariosManagerMongo.js"
import { generaHash } from "../utils.js"
import config from "./config.js"

const usuariosManager=new UsuariosManagerMongo()

// paso 1
export const initPassport=()=>{

    passport.use(
        "registro",
        new local.Strategy(
            {
                usernameField:"email", 
                passReqToCallback: true
            },
            async(req, username, password, done)=>{
                try {
                    let {nombre}=req.body
                    if(!nombre){

                        return done(null, false);
                    }
                    if (
                        username= "adminCoder@coder.com"
                    ){
                        user ={nombre: "admin", email: username, rol: "admin"}
                    }
                
                    let existe=await usuariosManager.getBy({email: username})
                    if(existe){

                        return done(null, false);
                    }
                    
                
                
                    password=generaHash(password)
                
                    let nuevoUsuario=await usuariosManager.create({nombre, email:username, password, rol:"user"})
                    
                    return done(null, nuevoUsuario)
                    
                } catch (error) {
                    return done(error)
                }
            }
        )
    )
    passport.use(
        "github",
        new github.Strategy(
            {
                clientID:config.clientId,
                clientSecret:config.githubSecret,
                callbackUrl:config.callbackUrl
            },
            async(tokenAcceso, tokenRefresh, profile, done)=>{
                try {
                    let email=profile._json.email
                    let nombre=profile._json.name
                    if(!nombre || !email){
                        return done(null, false)
                    }
                    let usuario=await usuariosManager.getBy({email})
                    if(!usuario){
                        usuario=await usuariosManager.create({
                            nombre, email, profile
                        })
                } 
                return done(null, usuario)
            }catch (error) {
                return done(error)
            }
        }
                
    )
)
    passport.use(
        "login",
        new local.Strategy(
            {usernameField:"email"},
            async(username, password, done)=>{
                try {
                    let usuario=await usuariosManager.getBy({email: username})
                    if(!usuario){
                       return done(null, false)
                    }
                    if(!validaPasword(password, usuario.password)){
                        return done(null, false)
                    }
                    return done(null, usuario)
                } catch (error) {
                    return done (error)
                    
                }
            }
        )
    )

    passport.serializeUser((usuario, done)=>{
        return done(null, usuario._id)
    })

    passport.deserializeUser(async(id, done)=>{
        let usuario=await usuariosManager.getBy({_id:id})
        return done(null, usuario)
    })

}