const bcrypt=require("bcrypt");
var jwt = require('jsonwebtoken');
const User=require("../Models/userSchema")


const loginController=async(req,res)=>{
    
    if(req.body.email && req.body.password){
        const user=await User.findOne({email:req.body.email})
        if(user){
            const match=await bcrypt.compare(req.body.password,user.password)
            if(match){
                var token = jwt.sign({email:req.body.email}, 'secrect_key', {
                    expiresIn: '2h'
                     });

                     // Store the JWT in the session
                    //  req.session.jwt = token
                    //  res.json(req.session)
                res.json({...{token},user})
            }
            else{
                res.status(404).json({
                    msg:"Invalid Login"
                })
            }
            

        }
        else{
            res.status(404).json({
                msg:"Invalid Login"
            })
        }
        
    }
    else{
        res.status(400).json({
            'msg':"Please fill all the fields"
        })
    }
    
}

const registerController=async(req,res)=>{
    if(req.body.name && req.body.email && req.body.password){
        const {name,email,password}=req.body
    if(name && email && password){
        req.body.password=await bcrypt.hash(req.body.password,10)
        const user=new User(req.body)         
        try{
            const result=await user.save()
            res.send(result)
        }
        catch(err){
            res.send({ exists: true });
        }
        
    }
    else{
        res.status(400).json("Bad request")
    }  
}
else{
    res.json({
        error:"Please fill all the fields"
    })
}
}


module.exports={
    registerController,loginController
}