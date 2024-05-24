import passport from "passport"
import local from "passport-local"
import { UsuariosManagerMongo } from "../dao/usuariosManagerMongo.js"
import { generaHash } from "../utils.js"

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

                        return done(null, false)
                    }
                
                    let existe=await usuariosManager.getBy({email: username})
                    if(existe){

                        return done(null, false)
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

    passport.serializeUser((usuario, done)=>{
        return done(null, usuario._id)
    })

    passport.deserializeUser(async(id, done)=>{
        let usuario=await usuariosManager.getBy({_id:id})
        return done(null, usuario)
    })

}