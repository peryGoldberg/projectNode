import mongoose from "mongoose";

export const connectToDB = () => {
    const mongoURI = process.env.DB_CONNECTION ||  "mongodb+srv://chayakarmel207:<kdckZiQt2HqbNFB2>@cluster0.g2fxp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
    
    mongoose.connect(mongoURI) 
        .then((suc) => { console.log("mongo db connected sucessfully!!!", suc.connection.host) })
        .catch(err => {
            console.log("cannot connect mongoDB")
            console.log(err)  
            process.exit(1);
        })
        
}