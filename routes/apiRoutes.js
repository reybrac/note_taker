const noteData = require('../db/db.json');
// const waitListData = require('../data/waitinglistData');

module.exports = (app) => {
    app.get('/api/notes', (req, res) => res.json(noteData));

    //app.get('/api/waitlist', (req, res) => res.json(waitListData));
    app.post('/api/notes', (req, res) => {
        
          noteData.push(req.body);
          res.json(true);
    
      });
    //   app.post('/api/clear', (req, res) => {
        
    //     tableData.length = 0;
    //     waitListData.length = 0;
    
    //     res.json({ ok: true });
    //   });
};