const { role } = require("../database/db.js");
const db = require("../database/db.js");
const car = db.car;
const user = db.user;
const carmodel = db.carmodel;


exports.create = (req, res) => {
    // Save to MySQL database
const{
            num_imatriculation,
            nb_places,
            speed,
            price_day,
            price_hour,
            assurance,
            thumbnail,
            availability,
            latitude_start,
            longitude_arrival,
            longitude_start,
            latitude_arrival,
            CarModelId,
            UserId,
        } = req.body;

const image = req.file? req.file.filename:null;
console.log(req.file);
        console.log({
            
            num_imatriculation,
            nb_places,
            speed,
            price_day,
            price_hour,
            assurance,
            thumbnail,
            availability,
            latitude_start,
            longitude_arrival,
            longitude_start,
            latitude_arrival,
            image,
            CarModelId,
            UserId,

        });
        car.findOne({where:{num_imatriculation}
           
        }).then((cars) => {
            console.log("cars");
            car.create({
               
            num_imatriculation,
            nb_places,
            speed,
            price_day,
            price_hour,
            assurance,
            thumbnail,
            availability,
            latitude_start,
            longitude_arrival,
            longitude_start,
            latitude_arrival,
            image,
            CarModelId,
            UserId,
            }).then((cars) => {
        //car.add;
        res.status(200).json({
            status: true,
            message: "cars created successfully",
            data: cars,
        })
        });
    });
    return 'ok';
};

exports.findAll = (req, res) => {
    car.findAll(
        {
            include: [
                {
                    model: carmodel,
                    as: "carmodels",
                    attributes: ["id", "model_name"],
                },
                {
                    model: user,
                    as: "users",
                    attributes: ["id", "firstname"],
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
    car.findByPk(req.params.carId)
    .then((cars) => {
        if (cars === null) {
            const message = `The car does not exist. Please return to the car list`
            return res.status(404).json(message)
        } 
        const message = `car ${cars.lastname} has been found`
        // res.json({message, data: cars})
        return res.status(200).json(cars);
    })
    .catch(err => {
        res.status(500).send({
        message: "Error retrieving car with id=" + req.params.carId
        });
    });
    return "ok";
};




// Update a resevation
exports.update = (req, res) => {
    const id = req.params.carId;
    car.update(
        {
        num_imatriculation: req.body. num_imatriculation ,
        nb_places: req.body.nb_places,
        speed: req.body.speed,
        price_day: req.body.price_day,
        price_hour: req.body.price_hour,
        assurance: req.body.assurance,
        thumbnail: req.body.thumbnail,
        availability: req.body.availability,
        latitude_start: req.body.latitude_start,
        longitude_start: req.body.longitude_star,
        
        
        },
        { where: { id: req.params.carId } }
    ).then(() => {
        res.status(200).json({
            status: true,
            message: "car updated successfully with id = " + id,
        });
    });
};

// Delete a car by Id
exports.delete = (req, res) => {
    const id = req.params.carId;
    car.destroy({
        where: { id: id },
    }).then(() => {
        res.status(200).json({
            status: true,
            message: "car deleted successfully with id = " + id,
        });
    });
};

