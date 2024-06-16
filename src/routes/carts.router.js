import { Router } from 'express';
import cartsController from '../controllers/carts.controller.js';

export const router = Router();

router.get('/carts', cartsController.getCarts)
router.get('/:cid', cartsController.getCartById)
router.post('/', cartsController.createCart)
router.post('/:cid/products/:pid', cartsController.addProductsInCart)

