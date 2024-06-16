import { Router } from "express";
import productsController from "../controllers/products.controller";

export const router = Router();


router.get('/products', productsController.getProducts);
router.get ('/products/:id', productsController.getProductsById);
router.post('/', productsController.addProduct)
router.put('/:id', productsController.updateProduct)
router.delete('/:id', productsController.deleteProduct)


