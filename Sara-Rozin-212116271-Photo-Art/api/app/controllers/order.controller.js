const db = require("../models");
const Order = db.order;


// Create and Save a new Note
exports.create = (req, res) => {
    // Validate request
    if (!req.body.userId) {
        return res.status(400).send({
            message: "Order name can not be empty"
        });
    }

    // Create
    const order = new Order({
        userId:req.body.userId,
        date:req.body.date,
        totalPrice:req.body.totalPrice,
    });

    // Save in the database
    order.save()
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
    Order.find()
        .then(orders => {
            res.send(orders);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving orders."
            });
        });
};

// Find a single note with a noteId
exports.findOne = (req, res) => {
    Order.findById(req.params.id)
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
    Order.find().skip(req.params.page).limit(5).exec().then(note => {
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
    if (!req.body.className) {
        return res.status(400).send({
            message: "order content can not be empty"
        });
    }

    // Find note and update it with the request body
    Order.findByIdAndUpdate(req.query.id, {
        cityName: req.body.cityName,
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
    City.findByIdAndRemove(req.query.id)
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
