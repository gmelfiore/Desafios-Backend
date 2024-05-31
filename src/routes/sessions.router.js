import { Router } from 'express';
import { UsuariosManagerMongo as UsuariosManager } from '../dao/usuariosManagerMongo.js';
import { generaHash, validaPasword } from '../utils.js';
import passport from 'passport';
export const router=Router()

const usuariosManager=new UsuariosManager()

router.post('/registro', passport.authenticate("registro", {failureRedirect:"/api/sessions/error"}),async(req,res)=>{

    let {nombre, email, password}=req.body
    if(!nombre || !email || !password){
        res.setHeader('Content-Type','application/json');
        return res.status(400).json({error:`Complete nombre, email, y password`})
    }

    let existe=await usuariosManager.getBy({email})
    if(existe){
        res.setHeader('Content-Type','application/json');
        return res.status(400).json({error:`Ya existe ${email}`})
    }

    password=generaHash(password)

    try {
        let nuevoUsuario=await usuariosManager.create({nombre, email, password, rol:"user"})
        res.setHeader('Content-Type','application/json')
        res.status(200).json({
            message:"Registro exitoso", nuevoUsuario
        })
    } catch (error) {
        console.log(error);
        res.setHeader('Content-Type','application/json');
        return res.status(500).json(
            {
                error:`Error inesperado en el servidor - Intente más tarde, o contacte a su administrador`,
                detalle:`${error.message}`
            }
        )
    }
    res.setHeader('Content-Type','application/json');
    return res.status(201).json({mensaje:"Registro OK", nuevoUsuario:req.user});

})
router.post("/login", passport.authenticate("registro", {failureRedirect:"/api/sessions/error"}), async(req, res)=>{
    let {email, password, web}=req.body

    console.log(req.body)
    if(!email || !password){
        if(web){
            return res.redirect(`/login?error=Complete email, y password`)
        }else{
            res.setHeader('Content-Type','application/json');
            return res.status(400).json({error:`Complete email, y password`})
        }
    }
   


    usuario={...req.user}
    delete usuario.password
    req.session.usuario=usuario

    if(web){
        res.redirect("/products")
    }else{
        res.setHeader('Content-Type','application/json');
        return res.status(200).json({payload:"Login correcto", usuario});
    }

    

})

router.get("/logout", (req, res)=>{
    req.session.destroy(e=>{
        if(e){
            console.log(error);
            res.setHeader('Content-Type','application/json');
            return res.status(500).json(
                {
                    error:`Error inesperado en el servidor - Intente más tarde, o contacte a su administrador`,
                    detalle:`${error.message}`
                }
            )
            
        }
    })

    res.setHeader('Content-Type','application/json');
    return res.status(200).json({payload:"La sesión se cerró correctamente"});
})

router.get("/error", (req, res)=>{
    res.setHeader('Content-Type','application/json');
    return res.status(500).json(
        {
            error:`Error inesperado en el servidor - Intente más tarde, o contacte a su administrador`,
            detalle:`Fallo de autenticación`
        }
    )
    
})
router.get('/github', passport.authenticate("github", {}), (req,res)=>{})

router.get('/callbackGithub', passport.authenticate("github", {failureRedirect:"/api/sessions/error"}), (req,res)=>{
    req.session.usuario=req.user

    res.setHeader('Content-Type','application/json');
    return res.status(200).json({payload:req.user});
})
