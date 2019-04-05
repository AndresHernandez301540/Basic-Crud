const mongoose=require('mongoose');
const schema=mongoose.Schema;
const mongoosePaginate=require('mongoose-paginate-v2');

const UserSchema = new schema({
    user_type : String,
    first_name: String,
    last_name: String,
    nick_name: String,
    email: String,
    password: String,
    birthdayDate: String,
});

UserSchema.plugin(mongoosePaginate);
module.exports=mongoose.model('User',UserSchema);