const express = require("express");
const fetchuser = require("../Middleware/fetchuser");
const router = express.Router();
const Notes = require("../Models/Notes");
const { query, validationResult, body } = require("express-validator");

// ROUTE 1 : to get all the notes of a user using /api/auth/fetchallnotes  login  required
router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Notes.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Some error occured.");
  }
});

// ROUTE 2 : to get add the notes of a user using /api/auth/addnote  login  required
router.post(
  "/addnote",
  fetchuser,
  [
    body("title", "add title").exists(),
    body("description", "add description").exists(),
    body("tag", "add tag").exists(),
  ],
  async (req, res) => {
    try {
      const { title, description, tag } = req.body; //destructuring
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const note = new Notes({
        title,
        description,
        tag,
        user: req.user.id,
      });
      const savednote = await note.save();
      res.json(savednote);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Some error occured.");
    }
  }
);

// ROUTE 3 : to get update the notes of a user using /api/auth/addnote  login  required
router.put("/updatenotes/:id", fetchuser, async (req, res) => {
  const { title, description, tag } = req.body;
  const newnote = {};

  // Update newnote object based on provided values
  if (title !== undefined) {
    newnote.title = title;
  }
  if (description !== undefined) {
    newnote.description = description;
  }
  if (tag !== undefined) {
    newnote.tag = tag;
  }

  try {
    // Find the note and update it
    let note = await Notes.findById(req.params.id);
    if (!note) {
      return res.status(404).send("Not Found");
    }

    // Check if the user owns the note
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not allowed");
    }

    // Update the note
    note = await Notes.findByIdAndUpdate(
      req.params.id,
      { $set: newnote },
      { new: true }
    );
    res.json({ note });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});
// ROUTE 4 : to delete the notes of a user using /api/notes/deletenote/:id  login  required
router.delete("/deletenote/:id", fetchuser, async (req, res) => {


  try {
    // Find the note and delete it
    let note = await Notes.findById(req.params.id);
    if (!note) {
      return res.status(404).send("Not Found");
    }

    // Check if the user owns the note
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not allowed");
    }

    // Update the note
    note = await Notes.findByIdAndDelete(req.params.id);
    res.json("Sucess Note has been deleted");
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
