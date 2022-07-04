const sequelize = require('sequelize');
const { role } = require("../database/db.js");
const db = require("../database/db.js");
const history = db.history;
const reservation = db.reservation;
const statut = db.statut;


module.exports.findAll = (req, res) => {
    console.log('test');
    history.findAll(
        {
        attributes: ["ReservationId", "id_statut", "createdAt"],
        orderBy: "createdAt",
        include: 
            [
                {
                    model:reservation,
                    as: "reservations",
                },
                {
                    model:statut,
                    as: "statuts"
                },

            ],
            /*group: "ReservationId",*/
            
        }
    ).then((data) => {
        console.log(data);
        if (data.length != 0) {
            res.status(201).json({ data: data, success: true });
        } else {
            console.log('fdsf');
            res.status(404).json({
                error: "history is empty"
            });
            console.log('fdsf2');
        }
    }).catch(err => {
        console.log(err.message);
        res.status(200).send({
            message:
                err.message || "Some error occurred while retrieving ."
        });
    });
};


exports.findOne = (req, res) => {
    history.findOne(req.params.historyId)
        .then((histories) => {
            if (histories === null) {
                const message = `The history does not exist. Please return to the history list`
                return res.status(404).json(message)
            }
            return res.status(200).json(histories);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving history with id=" + req.params.historyId
            });
        });
    return "ok";
};

exports.create = (ReservationId, id_statut) => {
    history.create({
        ReservationId,
        id_statut
    }).then((resp) => resp).catch((err) => err);
    //return history_resp;
};


