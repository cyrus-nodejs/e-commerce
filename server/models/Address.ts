import mongoose from 'mongoose';
const Schema = mongoose.Schema;



const AddressSchema = new Schema({ 
    owner : {
        type: String,
         required: true,
         ref: 'User'
       },
        firstname: {
            type: String ,
            required: true,
             
        },
        lastname: {
            type: String ,
            required: true,
            
        },
        mobile:  {
            type: String ,
            required: true,
        },
        mobile2:  {
            type: String ,
            required: true,
        },
        address: {
            type: String ,
            required: true,       
        },
        nation: {
            type: String ,
            required: true,
        },
        region: {
            type: String ,
            required: true,
        },
        postalcode: {
            type: String ,
            required: true,
        },
        province: {
            type: String ,
            required: true,
        },
        ordernote: {
            type: String ,
            required: true,
        },
  });


  export const Address:any = mongoose.model("Address", AddressSchema);