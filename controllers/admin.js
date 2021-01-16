const Product = require("../model/product");
const delteFile = require("../middleware/deleteImage");

module.exports = {
    getAddProduct: (req, res, next) => {
        res.render("admin/edit-product", {
            pageTitle: "Add Product",
            path: "/admin/add-product",
            edit: false
        });
    },

    postProduct: async (req, res, next) => {

        const { title, description, amount } = req.body;
        const image = req.file.path;

        const product = await new Product({ title, description, image, amount });
        await product.save();
        res.redirect("/");

    },
    getProducts: async (req, res, next) => {
        const products = await Product.find();

        res.render("admin/product-list", {
            pageTitle: "Admin Products",
            path: "/admin/admin-products",
            products: products
        });
    },

    deleteProduct: async (req, res, next) => {
        const id = req.body.id;
        const product = await Product.findOneAndDelete({ _id: id });
        delteFile(product.image)
        res.redirect("/admin/admin-products")
    },

    editProduct: async (req, res, next) => {
        const id = req.params.id;
        const edit = req.query.edit;

        const product = await Product.findOne({ _id: id });
        if (!product) {
            return res.redirect("/admin/admin-products")
        }
        res.render("admin/edit-product", {
            path: "admin/edit-product",
            pageTitle: "Edit Product",
            product: product,
            edit: edit
        });
    },
    postEditProduct: async (req, res, next) => {

        const { productId } = req.body;
        const product = await Product.findById(productId);
        if (!product) {
            return res.redirect("/admin/admin-products")
        }

        const { title, description, amount } = req.body;
        product.title = title || product.title
        product.amount = amount || product.amount
        product.description = description || product.description
        if (req.file) {
            delteFile(product.image);
            product.image = req.file.path;

        }

        await product.save();
        res.redirect("/admin/admin-products")
    }
}