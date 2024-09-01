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
router.post('/addnotes', fetchuser, [
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

// ROute 3: Update an existing notes using: PUT "api/notes/updatenotes" : Login required
router.put('/updatenotes/:id', fetchuser, async (req, res) => {
    const { title, description, tag } = req.body;
    //Creating a newNote object
    try {
        const newNote = {};
        if (title) { newNote.title = title };
        if (description) { newNote.description = description };
        if (tag) { newNote.tag = tag };

        // Find the note to be updated and update.
        let note = await Notes.findById(req.params.id);
        if (!note) { return res.status(404).send("Not Found") };
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }

        note = await Notes.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
        res.json({ note });
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("Some error occured");
    }
})


// ROute 4: Delete an existing notes using: DELETE "api/notes/delenotes" : Login required
router.delete('/deletenotes/:id', fetchuser, async (req, res) => {

    try {// Find the note to be deleted.
        let note = await Notes.findById(req.params.id);
        if (!note) { return res.status(404).send("Not Found") };

        // Allow deleteion only if the user owns this note
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }

        note = await Notes.findByIdAndDelete(req.params.id)
        res.json({ "Success": "Note has been deleted" });
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("Some error occured");
    }

})
module.exports = router;