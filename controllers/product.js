
import { Product, productValidator } from "../modells/product.js";
import mongoose from "mongoose";



export const getAllProducts = async (req, res) => {
    const { page , perPage , search } = req.query;
    try {
        let allProducts;
        const filter = {};
        if (search) {
            filter.name = search;
        }

         allProducts = await Product.find(filter)
            .skip((page-1)*perPage)
            .limit(perPage);
           

        res.json(allProducts);
    } catch (err) {
        res.status(500).send("Unable to retrieve the products");
    }
}

export const getNumOfPages = async (req, res) => {
    try {
        let allProductsCount = await Product.countDocuments();
        let perPage = parseInt(req.query.perPage) || 12;
        console.log("Total number of products: ", allProductsCount);
        console.log("Products per page: ", perPage);
        
        let numPages = Math.ceil(allProductsCount / perPage);
        console.log("Number of pages: ", numPages);

        return res.json({ numPages });
    } catch (err) {
        console.error("An error occurred: ", err);
        return res.status(400).send("An error occurred: " + err);
    }
}



   
export const updateProductById = async (req, res) => {
    let { id } = req.params;
    if (!mongoose.isValidObjectId(id))
        return res.status(405).send("their is not valid id");
    try {
        let productToUpdate = await Product.findOne({ _id: id });
        if (!productToUpdate)
            return res.status(402).send("their is not product with this id");
        let validate = productValidator(req.body);
        if (validate.error)
            return res.status(403).send("error in params");
        let { imgUrl, price, description, productName } = req.body;
        productToUpdate.productName = productName || productToUpdate.productName;
        productToUpdate.description = description || productToUpdate.description;
        productToUpdate.price = price || productToUpdate.price;
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
        res.status(500).send("cannot  add product");
    }
}
export const deleteProductById = async (req, res) => {
    let { id } = req.params;
    if (!mongoose.isValidObjectId(id))
        return res.status(407).send("their is not valid id");
    try {
        let delProduct = await Product.findByIdAndDelete({ _id: id });
        if (!delProduct)
            return res.status(402).send("their id is not exist");
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

