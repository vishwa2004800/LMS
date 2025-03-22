// create a fun that will ineract with mongo db
import mongoose from "mongoose";

// connect to mongo db
const connectDB = async ()=> {
    mongoose.connection.on('connected',()=> console.log('database connected'))

    // add mongo db conn string
    await mongoose.connect(`${process.env.MONGODB_URI}/lms`)
}

export default connectDB