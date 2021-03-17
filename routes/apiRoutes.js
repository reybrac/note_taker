const fs = require('fs');
const noteData = require('../db/db.json');
const path = require('path');
// const waitListData = require('../data/waitinglistData');

module.exports = (app) => {
    app.get('/api/notes', (req, res) => res.json(noteData));

   
    app.post('/api/notes', (req, res) => {
        
          noteData.push(req.body);
          fs.writeFileSync(path.join(__dirname, "../db/db.json"), JSON.stringify(noteData));
          console.log(noteData);
          res.json(true);
    
      });
    app.post('/api/clear', (req, res) => {
    
    noteData.length = 0;


    res.json({ ok: true });
    });
};