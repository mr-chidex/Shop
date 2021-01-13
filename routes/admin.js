//helps with try catch for admin in controllers folder
const expressPromise = require("express-promise-router");

const router = expressPromise();

const adminControllers = require("../controllers/admin");
const fileupload = require("../middleware/ImageFileUpload");

router.route("/add-product")
    .get(adminControllers.getAddProduct);

router.route("/add-product")
    .post(fileupload.single("image"), adminControllers.postProduct);

router.route("/admin-products")
    .get(adminControllers.getProducts);

router.route("/delete-product")
    .post(adminControllers.deleteProduct);

router.route("/edit-product")
    .post(fileupload.single("image"), adminControllers.postEditProduct);

router.route("/edit-product/:id")
    .get(adminControllers.editProduct);

module.exports = router;