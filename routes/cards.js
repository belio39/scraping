const express = require("express");
const cardsRoutes = require("./cards_controllers");

const router = express.Router();

router
  .route("/")
  .post(cardsRoutes.createCard)
  .get(cardsRoutes.getAllEventsCards);
router
  .route("/:id")
  .get(cardsRoutes.getSingleCard)
  .patch(cardsRoutes.updateUserEvent)
  .delete(cardsRoutes.deleteUserEvent);

module.exports = router;
