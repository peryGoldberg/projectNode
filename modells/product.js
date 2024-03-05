import Joi from "joi";
import mongoose from "mongoose";


const productSchema = mongoose.Schema({
    productName: { type: String, required: true },
    description: String,
    price:{ type: Number, required: true },
   productionDate : { type: Date, default: Date.now() },
   imgUrl : { type: String, required: true }
   
})

export const Product = mongoose.model("products", productSchema);
export const productValidator = (_productToValidate) => {

    let productJoi = Joi.object({
        productName: Joi.string().required(),
        description: Joi.string(),
        price: Joi.number().required(),
        productionDate : Joi.date().default(Date.now()),
        imgUrl : Joi.string().required()
       
    })

    return productJoi.validate(_productToValidate);
}