const db = require("../database/db.js");
const mark = db.mark;


// Post a statust
exports.create = (req, res) => {
    // Save to MySQL database
    mark.create(
        {
            brand_name: req.body.brand_name,
            
        }
        
    ).then((marks) => {
        //user.add;
        res.status(200).json({
            status: true,
            message: "mark created successfully",
        });
    });
    return 'ok';
};

exports.findAll = (req, res) => {
    const title = req.query.title;
    var condition = title ? { title} : null;
    mark.findAll({ where: condition })
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
    const id = req.params.id;
    mark.findByPk(id)
      .then((marks) => {
        if (marks !=null) {
            res.status(200).send({
                data: marks,
              });
        } else {
          res.status(200).send({
            message: `Cannot find Tutorial with id=${id}.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving mark with id=" + id
        });
      });
      return "ok";
  };
  

// Update a User
exports.update = (req, res) => {
    const id = req.params.markId;
    mark.update(
        {
            
            brand_name: req.body.brand_name,
        },
        { where: { id: req.params.markId } }
    ).then(() => {
        res.status(200).json({
            marks: true,
            message: "mark updated successfully with id = " + id,
        });
    });
};

// Delete a Statut by Id
exports.delete = (req, res) => {
    const id = req.params.markId;
    mark.destroy({
        where: { id: id },
    }).then(() => {
        res.status(200).json({
            status: true,
            message: "mark deleted successfully with id = " + id,
        });
    });
};


