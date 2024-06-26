import { Router } from "express";
import productsController from "../controllers/products.controller.js";
import { auth } from "../middleware/auth.js";

export const router = Router();


router.get('/products', productsController.getProducts);
router.get ('/products/:id', productsController.getProductsById);
router.post('/', auth(['admin']), productsController.addProduct)
router.put('/:id', auth(['admin']), productsController.updateProduct)
router.delete('/:id',auth(['admin']),  productsController.deleteProduct)


