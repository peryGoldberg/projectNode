import mongoose from "mongoose";

export const connectToDB = () => {
    const mongoURI = process.env.DB_CONNECTION ||  "mongodb+srv://pery:perymargaliot@cluster0.oilwtyk.mongodb.net/?retryWrites=true&w=majority";
    
    mongoose.connect(mongoURI) 
        .then((suc) => { console.log("mongo db connected sucessfully!!!", suc.connection.host) })
        .catch(err => {
            console.log("cannot connect mongoDB")
            console.log(err)  
            process.exit(1);
        })
        

}