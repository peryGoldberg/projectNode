
import { Product, productValidator } from "../modells/product.js";
import mongoose from "mongoose";

export const getAllProducts = async (req, res) => {
    let { search, page, itemPerPage = 20 } = req.query;
    try {
        let filter = {}
        if (search)
            filter.name = new RegExp(search, "i");
        let allproduct = await Product.find(filter)
            .skip((page - 1) * itemPerPage)
            .limit(itemPerPage)
            .sort({ "name": 1 });

        res.json(allproduct);
    }
    catch (err) {
        res.status(500).send("cannot find the products");
    }
}
export const updateProductById = async (req, res) => {
    let { id } = req.params;
    if (!mongoose.isValidObjectId(id))
        return res.status(400).send("their is not valid id");
    try {
        let productToUpdate = await Product.findOne({ _id: id });
        if (!productToUpdate)
            return res.status(400).send("their is not product with this id");
        let validate = productValidator(req.body);
        if (validate.error)
            return res.status(400).send("error in params");
        let { imgUrl, productionDate, description, productName } = req.body;
        productToUpdate.productName = productName || productToUpdate.productName;
        productToUpdate.description = description || productToUpdate.description;
        productToUpdate.productionDate = productionDate || productToUpdate.productionDate;
        productToUpdate.imgUrl = imgUrl || productToUpdate.imgUrl;
        await productToUpdate.save();
        res.json(productToUpdate);
    }
    catch (err) {
        res.status(500).send("cannot find product to update");
    }
}
export const addProduct = async (req, res) => {
    try {
        let newProduct = productValidator(req.body);
        if (newProduct.error)
            return res.status(400).send("invalid details");
        newProduct = await Product.create(req.body);
        res.json(newProduct);
    }
    catch (err) {
        res.status(500).send("cannot find addw product");
    }
}
export const deleteProductById = async (req, res) => {
    let { id } = req.params;
    if (!mongoose.isValidObjectId(id))
        return res.status(400).send("their is not valid id");
    try {
        let delProduct = await Product.findByIdAndDelete({ _id: id });
        if (!delProduct)
            return res.status(400).send("their id is not exist");
        res.json(delProduct)
    }
    catch (err) {
        res.status(500).send("cannot find the products to delete");
    }
}
export const getProductById = async (req, res) => {
    let { id } = req.params;
    if (!mongoose.isValidObjectId(id))
        return res.status(400).send("their is not valid id");
    try {
        let product = await Product.findOne({ _id: id });
        if (!product)
            return res.status(400).send("their is no a product with this id");
        res.json(product);
    }
    catch (err) {
        res.status(500).send("cannot find this product");
    }
}

