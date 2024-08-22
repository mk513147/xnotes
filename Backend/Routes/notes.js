const express = require('express')
const Notes = require('../Models/Notes')
const router = express.Router();
var fetchuser = require('../middleware/fetchuser')
const { body, validationResult } = require('express-validator');


// ROute 1: GEt all the notes using: GET "api/notes/fetchallusers" : Login required
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Notes.find({ user: req.user.id });
        res.json(notes);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some error occured");
    }
})

// ROute 2: ADD the notes using: POST "api/notes/addnotes" : Login required
router.get('/addnotes', fetchuser, [
    body('title', 'Enter a valid title.').isLength({ min: 3 }),
    body('description', 'Description should be more than 5 letters').isLength({ min: 6 })
], async (req, res) => {

    try {
        const { title, description, tag } = req.body;

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const note = new Notes({
            title, tag, description, user: req.user.id
        })
        const savedNote = await note.save();
        res.json(savedNote);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some error occured");
    }
})

module.exports = router;