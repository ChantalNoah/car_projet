const { role } = require("../database/db.js");
const db = require("../database/db.js");
const carmodel = db.carmodel;
const mark = db.mark;


// Post a resevation
exports.create = (req, res) => {
    // Save to MySQL database

    const {
        model_name,
        MarkId
,
    } = req.body ;
    console.log({
        model_name,
        MarkId
    });
    console.log(req.body);
   carmodel.findOne({
        where :{
            model_name,
            MarkId
        }
    }) .then((carmodels) => {
        console.log(carmodel);
        carmodel.create({
            model_name,
            MarkId
        }).then((carmodels) => {
                //carmodel.add;
                res.status(200).json({
                    status: true,
                    message: "carmodel created successfully",
                    data: carmodels,
                });
            }); 
    });
    
    return 'ok';
};

exports.findAll = (req, res) => {
    carmodel.findAll(
        {
            include: [
                {
                    model: mark,
                    as: "marks",
                    attributes: ["id", "brand_name"],
                },
               
               
            ],
            
                
            
    
        }
        
    )
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(200).send({
            message:
            err.message || "Some error occurred while retrieving reservatio."
        });
    });
};


exports.findByPk = (req, res) => {
    const id = req.params.carmodelId;
    carmodel.findByPk
    .then((carmodel) => {
        if (carmodel === null) {
            res.status(200).json({
                status: false,
                message: "carmodel not found",
            });
        } else {
            res.status(200).json({
                status: true,
                data: carmodel,
            });
        }
    });
    return "ok";
}; 

// Update a resevation
exports.update = (req, res) => {
    const id = req.params.carmodelId;
    carmodel.update(
        {
            model_name: req.body.model_name
           
    
        
        },
        { where: { id: req.params.carmodelId } }
    ).then(() => {
        res.status(200).json({
            status: true,
            message: "carmodel updated successfully with id = " + id,
        });
    });
};

// Delete a carmodel by Id
exports.delete = (req, res) => {
    const id = req.params.carmodelId;
    carmodel.destroy({
        where: { id: id },
    }).then(() => {
        res.status(200).json({
            status: true,
            message: "carmodel deleted successfully with id = " + id,
        });
    });
};


