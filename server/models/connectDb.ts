import mongoose from "mongoose"

export const connectDB = async  (url:any) => {

   mongoose.set("strictQuery", true)
  
await  mongoose.connect(url).then(() => console.log("Database Connected"))
  .catch((err) => console.log(err))
}

