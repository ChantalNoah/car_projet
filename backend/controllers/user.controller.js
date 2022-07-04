const db = require("../database/db.js");
const bcrypt = require('bcrypt');
const models = require("../models");
const nodemailer =require("nodemailer");
"use strict";

const userRole = {
  CUSTOMER : 'CUSTOMER',
  PRESTATAIRE : 'PRESTATAIRE'
};


const user = db.user;

  exports.create = (req, res) => {
        let {
            password,
            email,
            firstname,
            lastname,
            number,
            num_cni,
            country,
            role,
        } = req.body ;
        console.log(req.body);
        //ici add user role 
        switch(role.toUpperCase()){
          case userRole.CUSTOMER : role = userRole.CUSTOMER;
          break;
          default : role = userRole.PRESTATAIRE;
          break;
        }
    
        user.findOne({
            where :{
                email 
            }
        })
        .then((user) => {
            
            if (!user) {
            bcrypt
                .hash(password, 10)
                .then((bcryptedPassword) => {  
                    models.User.create({
                        email,
                        password: bcryptedPassword,
                        firstname,
                        lastname,
                        number,
                        num_cni,
                        country,
                        role ,
                    }).then((newUser) => { console.log('okgkghjg');res.status(200).json({success:true, newUser});})
                        .catch((error) => {res.status(500).json({error});});
                })
                .catch((error) => {
                    console.log(error);
                    res.status(500).json({                    
                    error:"password", success:false 
                });});
            } else return res.status(402).json({
            error: "Email already exists !" , success:false
            });
        })
        .catch(err => 
        {
            /*res.status(500).json({
            error: "An error occured !"
        })*/
       console.log(err.message);
        });
    }
    
    exports.findAll = (req, res) => {
        const title = req.query.title;
        var condition = title ? { title} : null;
        user.findAll({ where: condition })
        .then(data => {
        res.status(200).send(data);
        })
        .catch(err => {
        res.status(400).send({
            message:
            err.message || "Some error occurred while retrieving user."
        });
        });
    };

  
    exports.findByPk = (req, res) => {
        user.findByPk(req.params.userId)
        .then((users) => {
            if (users === null) {
                const message = `The user does not exist. Please return to the user list`
                return res.status(404).json(message)
            } 
            const message = `User ${users.lastname} has been found`
            // res.json({message, data: users})
            return res.status(200).json(users);
        })
        .catch(err => {
            res.status(500).send({
            message: "Error retrieving user with id=" + req.params.userId
            });
        });
        return "ok";
    };
    
    
  


    exports.update = (req, res) => {
        const id = req.params.userId;
        user.update(
            {
               
                email: req.body.email,
                password: req.body.password,
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                number: req.body.number,
                num_cni: req.body.num_cni,
                country: req.body.country,
                role: req.body.role,
                },
            { where: { id: req.params.userId } }
        ).then(() => {
            res.status(200).json({
                status: true,
                message: "user updated successfully with id = " + id,
            });
        });
    };
        
    

    exports.delete = (req, res) => {
        const id = req.params.userId;
        user.destroy({
            where: { id: id },
        }).then(() => {
            res.status(200).json({
                status: true,
                message: "user deleted successfully with id = " + id,
            });
        });
    };



        exports.sendEmail = (req, res) => {
     // let testAccount = await nodemailer.createTestAccount();
    
     
      
      // send mail with defined transport object
      var mailOptions = {
        from: 'iutguiigiui@gmail.com',
        to:'lhjkhjghbjgkj@gmail.com' ,
        subject: 'Sending Email using Node.js',
        text: 'That was easy!'
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
          return error;
        } else {
          console.log('Email sent: ' + info.response);
          return info.response;
        }
      });
      
    }


    //count the users
    exports.count = async (req, res) => {
        user.count(req.params.userId)
        .then((count) => {      
                 res.status(200).json(count);          
        }).catch(err => {
            res.status(500).send({
          throw: error
            });
        })

    };
    
    exports.findAllrole = (req, res) => {
        const role = req.params.userrole;
        console.log(role);
        var condition = role ? { role} : null;
        user.findAll({ where: {role : role} })
        .then(data => {
        res.status(200).send(data);
        })
        .catch(err => {
        res.status(400).send({
            message:
            err.message || "Some error occurred while retrieving user."
        });
        });
    };
