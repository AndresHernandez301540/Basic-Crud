const User = require('../Models/user');

const createUser=((req,res,next)=>{
    let user=new User({
        user_type : req.body.user_type,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        nick_name: req.body.nick_name,
        email: req.body.email,
        password: req.body.password,
        birthdayDate: req.body.birthdayDate
    });

    User.find({
        $or:[
            {nick_name:user.nick_name},
            {email:user.email}
        ]
    }).exec((err,found)=>{
        if(err){
            return res.status(500).json({
                errors:[{message:"An unexpected error has ocurred"}],
                data:[]
            });
        }
        if(found && found.length>0){
            return res.status(302).json({
                errors:[{message:"The email or nickname are already on use, please try a different one"}],
                data:[]
            });
        }else{
            user.save()
            .then((usr)=>{
                res.status(200).json({
                    errors:[],
                    data:usr
                });
            })
            .catch((err)=>{
                res.status(500).json({
                    errors:[{message:"The user couldn't be saved"}],
                    data:[]
                });
            })
        }
    })
});

const viewAll=((req,res)=>{
    const options={
        page:1,
        limit:100,
        select : '_id user_type first_name last_name nick_name email password birthdayDate'
    };
    User.paginate({},options)
        .then((users) => {
          res.status(200).json({
              errors:[],
            //   data:users,
              users:users
          });
        }).catch((err) => {
            res.status(500).json({
                errors:[{message:"The data couldn't be retrieved"}],
                data:[]
            });
        });
});

const findUser=((req,res)=>{
    User.findById(req.params.id)
    .then((usr)=>{
        res.status(200).json({
            errors:[],
            data:usr
        });
    })
    .catch((err)=>{
        res.status(500).json({
            errors:[{message:"An error has ocurred"}],
            data:[]
        });
    });
});

const updateUser=((req,res)=>{
    User.findById(req.params.id)
    .then((usr)=>{
        usr.user_type=req.body.user_type ? req.body.user_type : usr.user_type;
        usr.first_name= req.body.first_name ? req.body.first_name :usr.first_name;
        usr.last_name=req.body.last_name ? req.body.last_name : usr.last_name;
        usr.nick_name= req.body.nick_name ? req.body.nick_name : usr.nick_name;
        usr.email= req.body.email ? req.body.email : usr.email;
        usr.password= req.body.password ? req.body.password : usr.password;
        usr.birthdayDate= req.body.birthdayDate ? req.body.birthdayDate : usr.birthdayDate;
        usr.save()
            .then((usr)=>{
                res.status(200).json({
                    erros:[],
                    data:usr
                });
            }).catch(()=>{
                res.status(500).json({
                    erros:[{message:"An error ocurred while updating the user"}],
                    data:[]
                });
            });           
    })
    .catch((err)=>{
        res.status(500).json({
            erros:[{message:"An error ocurred while updating the user"}],
            data:[]
        });
    });
});

const deleteUser=((req,res)=>{
    User.deleteOne({_id:req.params.id})
    .then((usr)=>{
        res.status(200).json({
            errors:[],
            data:usr
        });
    })
    .catch((err)=>{
        res.status(500).json({
            errors:[{message:"An error ocurred while deleting the user"}],
            data:[]
        });
    });
});

module.exports={
    viewAll,createUser,findUser,updateUser,deleteUser
};