//responsavel por chamar o Banco de Dados
import mongooseDateFormat from "mongoose-date-format";
// import bcrypt from "bcrypt";

export default(mongoose)=>{ 
const userSchema = mongoose.Schema({
  name: String,
  email:String,
  password: String,
  type:{
    type: Number,
    default:1
  },
    
  lastModified: {
    type: Date,
    default: Date.now(),
  },
},{
  timestamp: true,
});

// studentSchema.pre("save", function (next) {
//   if(!this.isModified("password")){
//     return next();
//   }
//   this.password = bcrypt.hashSync(this.password,10)
// })

const userModel = mongoose.model("user", userSchema, "user"); //para criar user no singular
userSchema.plugin(mongooseDateFormat)
return userModel;
}