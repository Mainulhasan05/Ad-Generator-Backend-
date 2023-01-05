const router=require("express").Router();
const verifyToken=require("../Middleware/verifyToken")
const ProductsControler=require('../Controller/ProductsController')

router.get("/getproducts",verifyToken,ProductsControler.getProducts)
router.post("/uploadproducts",verifyToken,ProductsControler.uploadProducts)


module.exports=router;