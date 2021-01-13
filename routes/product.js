//helps with try catch for admin in controllers product
const expressPromise = require("express-promise-router");
const router = expressPromise();

const productControllers = require("../controllers/product");

router.route("/")
    .get(productControllers.getIndex);

router.route("/products")
    .get(productControllers.getProducts);

router.route("/product/:productId")
    .get(productControllers.getProduct);

router.route("/cart")
    .get(productControllers.getCart);

router.route("/cart")
    .post(productControllers.postCart);

router.route("/order")
    .get(productControllers.getOrder);



module.exports = router;