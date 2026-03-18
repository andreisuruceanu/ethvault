const express = require("express");
const {
  createNote,
  getAllNotes,
  getNoteById,
  updateNote,
  deleteNote,
} = require("../controllers/noteController");

const router = express.Router();

router.route("/").get(getAllNotes).post(createNote);
router.route("/:id").get(getNoteById).put(updateNote).delete(deleteNote);

module.exports = router;
