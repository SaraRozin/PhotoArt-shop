const db = require("../models");
const UserPicture = db.userPicture;


// Create and Save a new Note
exports.create = (req, res) => {
    // Create
    const userPicture = new UserPicture({
        userId: req.body.userId,
        pictureId: req.body.pictureId,
        pictureSize: req.body.pictureSize,
        pictureCount: req.body.pictureCount,
    });
    // Save in the database
    userPicture.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the order."
            });
        });
};

// Retrieve and return all notes from the database.
exports.findAll = (req, res) => {
    UserPicture.find()
        .then(orders => {
            res.send(orders);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving orders."
            });
        });
};

exports.findCond = (req, res) => {
    UserPicture.find(req.query)
        .then(orders => {
            res.send(orders);
        }).catch(err => {
            res.send([]
               
            );
        });
};

//exports.findCond = (req, res) => {
//     UserPicture.find(req.query)
//         .then(orders => {
//             res.send(orders);
//         }).catch(err => {
//             res.status(500).send({
//                 message: err.message || "Some error occurred while retrieving Pictures."
//             });
//         });
// };

// Find a single note with a noteId
exports.findOne = (req, res) => {
    UserPicture.findById(req.params.id)
        .then(note => {
            if (!note) {
                return res.status(404).send({
                    message: "order not found with id " + req.params.id
                });
            }
            res.send(note);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "order not found with id " + req.params.id
                });
            }
            return res.status(500).send({
                message: "Error retrieving order with id " + req.params.id
            });
        });
};

exports.pageinator = (req, res) => {
    UserPicture.find().skip(req.params.page).limit(4).exec().then(note => {
        if (!note) {
            return res.status(404).send({
                message: "order not found with id " + req.params.id
            });
        }
        res.send(note)
    }
    )
}

// Update a note identified by the noteId in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.query.id) {
        return res.status(400).send({
            message: "order content can not be empty"
        });
    }

    // Find note and update it with the request body
    UserPicture.findByIdAndUpdate(req.query.id, {
        userId: req.body.userId,
        pictureId: req.body.pictureId,
        pictureSize: req.body.pictureSize,
        pictureCount: req.body.pictureCount,
    }, { new: true })
        .then(note => {
            if (!note) {
                return res.status(404).send({
                    message: "city not found with id " + req.params.id
                });
            }
            res.send(note);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "city not found with id " + req.params.id
                });
            }
            return res.status(500).send({
                message: "Error updating city with id " + req.params.id
            });
        });
};

// Delete a note with the specified noteId in the request
exports.delete = (req, res) => {
    UserPicture.findByIdAndRemove(req.query.id)
        .then(note => {
            if (!note) {
                return res.status(404).send({
                    message: "city not found with id " + req.params.id
                });
            }
            res.send({ message: "Class deleted successfully!" });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "city not found with id " + req.params.id
                });
            }
            return res.status(500).send({
                message: "Could not delete city with id " + req.params.id
            });
        });
};
