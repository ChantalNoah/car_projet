const db = require("../database/db.js");
const statut = db.statut;



exports.create = (req, res) => {
    statut.create(
        {
            description:  req.body.description,
            
        }
        
    ).then((statuts) => {
        
        res.status(200).json({
            status: true,
            message: "statuts created successfully",
        });
    });
    return 'ok';
};

exports.findAll = (req, res) => {
    const title = req.query.title;
    var condition = title ? { title} : null;
    statut.findAll({ where: condition })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(200).send({

          
          message:
            err.message || "Some error occurred while retrieving stauts."
        });
      });
  };

  
  exports.findByPk = (req, res) => {
    statut.findByPk(req.params.statutId)
    .then((statuts) => {
        if (statuts === null) {
            const message = `The statut does not exist. Please return to the statut list`
            return res.status(404).json(message)
        } 
        return res.status(200).json(statuts);
    })
    .catch(err => {
        res.status(500).send({
        message: "Error retrieving statut with id=" + req.params.statutId
        });
    });
    return "ok";
};
  

// Update a Statut
exports.update = (req, res) => {
    const id = req.params.statutId;
    statut.update(
        {
            
            description:  req.body.description,
           
        },
        { where: { id: req.params.statutId } }
    ).then(() => {
        res.status(200).json({
            status: true,
            message: "Statut updated successfully with id = " + id,
        });
    });
};

// Delete a Statut by Id
exports.delete = (req, res) => {
    const id = req.params.statutId;
    statut.destroy({
        where: { id: id },
    }).then(() => {
        res.status(200).json({
            status: true,
            message: "Statut deleted successfully with id = " + id,
        });
    });
};


