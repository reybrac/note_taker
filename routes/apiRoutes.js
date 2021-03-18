const fs = require('fs');
const path = require('path');




module.exports = (app) => {
    let noteData = JSON.parse(fs.readFileSync('./db/db.json', 'utf8'));
    app.get('/api/notes', (req, res) => res.json(noteData));

   
    app.post('/api/notes', (req, res) => {
        let noteID;
        const id = noteID + 1;
        
        if (noteData.length) {
            noteID = Math.max(...(noteData.map(note => note.id)));
        } else {
            noteID = 0;
        }
        let addedNote = req.body;
        noteData.push({id, ...addedNote});
        res.json(noteData.slice(-1));
        
        fs.writeFileSync(path.join(__dirname, "../db/db.json"), JSON.stringify(noteData, '\t'));
        console.log(noteData);
        //res.json(true);
        return true;
    
      });
      app.delete('/api/notes/:id', (req, res) => {
        let currentNotesearch = noteData.find(({ id }) => id === JSON.parse(req.params.id));

       noteData.splice(noteData.indexOf(currentNotesearch), 1);
        fs.writeFileSync(path.join(__dirname, "../db/db.json"), JSON.stringify(noteData));
        res.end("Note was deleted");
    });
};