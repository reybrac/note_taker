const fs = require('fs');
const path = require('path');
const uniqid = require('uniqid');
const noteData = require('../db/db.json');




module.exports = (app) => {
    //let noteData = JSON.parse(fs.readFileSync('./db/db.json', 'utf8'));
    app.get('/api/notes', (req, res) => res.json(noteData));

   
    app.post('/api/notes', (req, res) => {
        let noteID;
        // let noteID = req.body;
        const id = noteID + 1;
        //noteID.id;
        
        if(noteData.length){
            noteID = parseInt(Math.max(0, noteData.length));
        } else{
            noteID = 0;
        }

        // for (let i = 0; i < noteData.length; i++) {
        //     noteID.id = i;
        // }
        let addedNote = req.body;
        addedNote.id = uniqid();
        noteData.push(addedNote);
        //noteData.push({id, ...addedNote});
        res.json(noteData.slice(-1));
        
        fs.writeFileSync(path.join(__dirname, "../db/db.json"), JSON.stringify(noteData, '\t'));
        console.log(noteData);
        //res.json(true);
        //return true;
    
      });
      app.delete('/api/notes/:id', (req, res) => {
        let currentNotesearch = req.params.id;
        //let currentNotesearch = noteData.find(({ id }) => id === JSON.parse(req.body.id));
        //let currentNotesearch = req.body.id;

        // noteData.splice(noteData.indexOf(currentNotesearch), 1);
        var deleteNote = noteData.map(function(item) { return item.id; }).indexOf(currentNotesearch);
        //fs.writeFileSync(path.join(__dirname, "../db/db.json"), JSON.stringify(noteData));
        noteData.splice(deleteNote, 1);
        res.json(true);
    //     // res.end("Note was deleted");
        });
};