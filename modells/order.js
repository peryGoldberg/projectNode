import Joi from "joi";
import mongoose from "mongoose";

 const minimalProduct = mongoose.Schema({
    productName:{type: String ,required:true},
    qty:{type:Number,required:true},
    sum:Number
 })

const orderSchema = mongoose.Schema({
    //service: "", qty: "", date: "", name: "", email: "", phone: ""
    service : { type: String, require:true },
    qty : { type: String,  require:true },    
    date: {type:String,required:true},
    name: {type:String,required:true},
    email:{type:String,required:true},
    phone:{type:String.apply,required:true} 

})

export const Order = mongoose.model("orders", orderSchema);
export const orderValidator = (_orderToValidate) => {

    let orderJoi = Joi.object({
        service : Joi.string(),
        dueDate :Joi.date() ,    
        address: Joi.string().required(),
        userId: Joi.string().required(),
        products: Joi.array().items(Joi.object({
            productName:Joi.string().required(),
            qty:Joi.number().required(),
            sum:Joi.number()

        })),
        isSetOff: Joi.boolean()

    })

    return orderJoi.validate(_orderToValidate);
}