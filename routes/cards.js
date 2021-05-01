const express = require("express");
const cardsRoutes = require("./cards_controllers");

const router = express.Router();

router.route("/").post(cardsRoutes.createCard).get(cardsRoutes.getAllCards);
router
  .route("/:id")
  .get(cardsRoutes.getSingleCard)
  .patch(cardsRoutes.updateCard)
  .delete(cardsRoutes.deleteCard);

module.exports = router;
