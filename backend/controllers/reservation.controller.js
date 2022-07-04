const { role } = require("../database/db.js");
const db = require("../database/db.js");
const reservation = db.reservation;
const {ValidationError, UniqueConstraintError } = require('sequelize');
const { findOne } = require("./history.controller.js");
const statut = db.statut;
const history = db.history;
const car = db.car;
const user = db.user;

function processing(debut, fin)
{
    let diff = {};
    let tmp = fin - debut
    diff.tmp = tmp
    
    tmp = Math.floor(tmp/1000)
    diff.sec = tmp % 60;

    tmp = Math.floor((tmp-diff.sec)/60)
    diff.min = tmp % 60

    tmp = Math.floor((tmp-diff.min)/60)
    diff.hour = tmp % 24

    tmp = Math.floor((tmp-diff.hour)/24)
    diff.day = tmp

    return [diff.tmp, diff.sec, diff.min, diff.hour, diff.day]
}

function Statut (start, end) {
    now = new Date()
    if (!(now.getTime() > start.getTime())) {
        return 'en attente'
    }
    if ((now.getTime() >= start.getTime()) && (now.getTime() <= end.getTime()) ) {
        return "encour";
    }
    if(now.getTime() > end.getTime()){
        return "fin"
    }
}

exports.create = (req, res) => {
    let  Verified = processing(req.body.start, req.body.end)
    if(Verified[0] < 0) {
        res.status(400).json("La date de debut doit etre anterieur a la date de fin")
    }
    let  Verifid = processing(new Date(), req.body.start)
    if(Verifid[0] < 0){
        res.status(400).json("La date de debut doit etre ulterieur ou egale a la date actuel")
    }

    car.findOne({
        where: {
            UserId: req.body.UserId,
            id: req.body.CarId
        },
    })
    .then(car => {
        if (car) {
            const message = "Vous ne pouvez pas effectuer cette reservation car, la voiture vous appartient"
            res.status(400).json({message})            
        } else {
            reservation.create(req.body)
                .then(reservation => {
                    console.log('ok2');
                    /*const message = `La reservation bien été crée`
                    res.json({message, data: reservation})*/
                    // add histories
                   statut.findByPk(1) .then((statut) => {
                    console.log(statut);
                        history.create({
                            id_statut:statut.id,
                            ReservationId:reservation.id
                  
                        }).then((history) => {
                                
                                /*res.status(200).json({
                                    status: true,
                                    message: "histories created successfully",
                                    data: histories,
                                });*/
                                const message = `La reservation bien été crée`;
                                res.json({message, data: reservation});
                            }); 
                    });
                })
               
                
                .catch((error) => {
                    if(error instanceof ValidationError){
                        return res.status(400).json({message: error.message, data: error})
                    }
                    if(error instanceof UniqueConstraintError){
                        return res.status(400).json({message: error.message, data: error})
                    }
                    const message = `La reservation n'a pas pu être ajouté. Veillez réessayez dans quelques instants.`
                    res.status(500).json({message, error})
                })
        }
    })
    .catch(error => {
        const message = `Une erreur s'est produite. Réessayez dans quelques instants.` 
        res.status(500).json({message, data: error})
    })
};

exports.findAll = (req, res) => {
    reservation.findAll(
        {
            include: [
                {
                    model: user,
                    as: "users",
                    attributes: ["id", "firstname"],
                },
                {
                    model: car,
                    as: "cars",
                    attributes: ["id", "num_imatriculation"],
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
            err.message || "Some error occurred while retrieving reservation."
        });
    });
};

exports.findByPk = (req, res) => {
    reservation.findByPk(req.params.reservationId,{
        include: [
            {
                model: user,
                as: "users",
                attributes: ["id", "firstname"],
            },
            {
                model: car,
                as: "cars",
                attributes: ["id", "num_imatriculation"],
            },
                
          
        ],
    })
    .then((reservations) => {
        if (reservations === null) {
            const message = `The reservation does not exist. Please return to the reservation list`
            return res.status(404).json(message)
        } 
        const message = `reservation ${reservations.lastname} has been found`
        return res.status(200).json({data: reservations, statut: Statut(reservations.start, reservations.end), start: reservations.start, end: reservations.end, amount_res: reservations.amount_res, payement_mode: reservations.payement_mode, firstname: reservations.users.firstname });
    })
    .catch(err => {
        res.status(500).send({
        message: "Error retrieving reservation with id=" + req.params.reservationId
        });
    });
    return "ok";
};

// Update a resevation
exports.update = (req, res) => {
    const id = req.params.reservationId;
    reservation.update(
        {
            start: req.body.start,
            end: req.body.end,
            amount_res: req.body.amount_res,
            payement_mode: req.body.payment_mode,
            latitude_start: req.body.latitude_start,
            longitude_start: req.body.longitude_start ,
            
            
        },
        { where: { id: req.params.reservationId } }
    ).then(() => {
        res.status(200).json({
            status: true,
            message: "reservation updated successfully with id = " + id,
        });
    });
};

// Delete a reservation by Id
exports.delete = (req, res) => {
    const id = req.params.reservationId;
    reservation.destroy({
        where: { id: id },
    }).then(() => {
        res.status(200).json({
            status: true,
            message: "reservation deleted successfully with id = " + id,
        });
    });
};


