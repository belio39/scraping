const Card = require("./cards_models");
const mongoose = require("mongoose");

exports.createCard = (req, res) => {
  let { name, message, DateTime } = req.body;
  name = name.toLowerCase();
  if (!name && !message) {
    return res
      .status(404)
      .json({ message: "Event Name and Message are required" });
  }

  //   save card
  const cards = new Card({
    name,
    message,
    DateTime,
  });
  cards
    .save()
    .then((card) => {
      return res
        .status(200)
        .json({ message: "Event has been created", data: card });
    })
    .catch((err) => {
      console.log(err);
      return res
        .status(500)
        .json({ message: "Something went wrong. Try again", error: err });
    });
};
// fetch cards in the DB
exports.getAllEventsCards = (req, res) => {
  Card.cards().then((cards) => {
    if (cards.length === 0) {
      return res.status(404).json({ message: "No Event Cards available" });
    }
    return res.status(200).json({
      message: `${cards.length > 1 ? `All Events Cards` : `Event Card`}`,
      data: cards,
    });
  });
};

// single card
exports.getUserEventCards = (req, res) => {
  const userId = mongoose.Types.ObjectId(req.id);
  Card.find()
    .then((cards) => {
      if (cards.length === 0) {
        return res
          .status(404)
          .json({ message: "You Haven't Created any Events yet." });
      }
      return res.status(200).json({
        message: `${
          cards.length > 1 ? `All User Events Cards` : `User Event Card`
        }`,
        data: cards,
      });
    })
    .catch((err) => {
      return res.status(500).json({ error: err });
    });
};

// get single events
exports.getSingleCard = (req, res) => {
  Card.findOne({ _id: req.params.id }).then((card) => {
    if (!card) {
      return res.status(404).json({ message: "No Events Cards Available" });
    }
    return res.status(200).json({ message: "Single Event Card", data: card });
  });
};

// update card
exports.updateUserEvent = (req, res) => {
  const id = req.params.id;
  const userId = mongoose.Types.ObjectId(req.id);

  Card.updateOne({ _id: id }, req.body).then((updatedCard) => {
    if (updatedCard.nModified === 0) {
      return res
        .status(404)
        .json({ message: `Event does not exists or your not the author` });
    }
    Card.findOne({ _id: id }).then((card) => {
      return res
        .status(200)
        .json({ message: `Event Card has been updated`, data: card });
    });
  });
};

// delete single user card
exports.deleteUserEvent = (req, res) => {
  const id = req.params.id;
  Card.deleteOne({ _id: id }).then((deletedCard) => {
    if (deletedCard.nModified === 0) {
      return res
        .status(404)
        .json({ message: `Event does not exists or your not the author` });
    }
    return res.status(200).json({
      message: `Event Card has been Deleted Successfully`,
    });
  });
};
