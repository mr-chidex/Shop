const Product = require("../model/product");

module.exports = {
    getIndex: async (req, res, next) => {
        console.log(req.user)
        const products = await Product.find();
        res.render("shop/index", {
            pageTitle: "Home",
            path: "/",
            products: products
        });
    },

    getProducts: async (req, res, next) => {
        const products = await Product.find();

        res.render("shop/products", {
            pageTitle: "Products",
            path: "/products",
            products: products
        });
    },

    getProduct: async (req, res, next) => {
        const id = req.params.productId;
        const product = await Product.findById(id);
        if (!product) {
            return res.redirect("/")
        }

        res.render("shop/product-details", {
            path: "/products",
            pageTitle: "Product Details",
            product: product
        })
    },

    getCart: async (req, res, next) => {
        res.render("shop/cart", {
            pageTitle: "Your Cart",
            path: "/cart"
        })
    },

    postCart: async (req, res, next) => {
        const prodId = req.body.productId;
        console.log("post cart")
        res.render("shop/order", {
            pageTitle: "Your Order",
            path: "/order"
        })
    },

    getOrder: async (req, res, next) => {
        res.render("shop/order", {
            pageTitle: "Your Order",
            path: "/order"
        })
    },


}