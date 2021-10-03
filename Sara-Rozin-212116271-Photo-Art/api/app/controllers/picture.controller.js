process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
const db = require("../models");
const Picture = db.picture;


// Create and Save a new Note
exports.create = (req, res) => {
    // Validate request
    // Create
    const picture = new Picture({
        // id: req.body.id,
        pictureName: req.body.pictureName,
        pictureSrcImage: req.body.pictureSrcImage,
        pictureType: req.body.pictureType,
        picturePrice: req.body.picturePrice,
        pictureColor: req.body.pictureColor,
    });

    // Save in the database
    picture.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Picture."
            });
        });
};

// Retrieve and return all notes from the database.
exports.findAll = (req, res) => {
    Picture.find()
      .then(notes => {
        res.send(notes);
      }).catch(err => {
        res.status(500).send({
          message: err.message || "Some error occurred while retrieving Users."
        });
      });
  };


exports.findCond = (req, res) => {
    Picture.find(req.query)
        .then(orders => {
            res.send(orders);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving Pictures."
            });
        });
};

// Find a single note with a noteId
exports.findOne = (req, res) => {
    Picture.findById(req.params.id)
        .then(note => {
            if (!note) {
                return res.status(404).send({
                    message: "Picture not found with id " + req.params.id + req
                });
            }
            res.send(note);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Picture not found with id " + req.params.id + req
                });
            }
            return res.status(500).send({
                message: "Error retrieving Picture with id " + req.params.id + req
            });
        });
};

exports.pageinator = (req, res) => {
    Picture.find().skip(req.params.page).limit(5).exec().then(note => {
        if (!note) {
            return res.status(404).send({
                message: "Picture not found with id " + req.params.id
            });
        }
        res.send(note)
    }
    )
}

// Update a note identified by the noteId in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body.count) {
        return res.status(400).send({
            message: "Picture content can not be empty"
        });
    }

    // Find note and update it with the request body
    Picture.findByIdAndUpdate(req.query.id, {
        pictureName: req.body.pictureName,
        pictureSrcImage: req.body.pictureSrcImage,
        pictureType: req.body.pictureType,
        picturePrice: req.body.picturePrice,
        pictureColor: req.body.pictureColor,
    }, { new: true })
        .then(note => {
            if (!note) {
                return res.status(404).send({
                    message: "Picture not found with id " + req.params.id
                });
            }
            res.send(note);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Picture not found with id " + req.params.id
                });
            }
            return res.status(500).send({
                message: "Error updating Picture with id " + req.params.id
            });
        });
};

// Delete a note with the specified noteId in the request
exports.delete = (req, res) => {
    Picture.findByIdAndRemove(req.query.id)
        .then(note => {
            if (!note) {
                return res.status(404).send({
                    message: "Picture not found with id " + req.params.id
                });
            }
            res.send({ message: "Class deleted successfully!" });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "Picture not found with id " + req.params.id
                });
            }
            return res.status(500).send({
                message: "Could not delete Picture with id " + req.params.id
            });
        });
};
