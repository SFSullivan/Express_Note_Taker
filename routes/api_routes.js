const notes_router = require('express').Router();
const fs = require('fs');
const path = require('path');
const uuid = require('uuid').v4;
const db_path = path.join(__dirname, '../db/db.json');


function getNoteData() {
    return fs.promises.readFile(db_path, 'utf8')
        .then(data => JSON.parse(data));
}


//gets the saved notes
notes_router.get('/notes', (request, response) => {
    getNoteData()
        .then(note_data => {
            response.json(note_data);
        })
        .catch(err => console.log(err));
});

notes_router.post('/notes', (request, response) => {
    getNoteData()
        .then(note_data => {
            const new_note = request.body;
            new_note.id = uuid().slice(0, 4);

            note_data.push(new_note);

            fs.promises.writeFile(db_path, JSON.stringify(note_data, null, 2))
                .then(() => {
                    console.log('note added successfully!');
                    response.json(note_data);
                })
                .catch(err => console.log(err));
        });
});

notes_router.delete('/notes:/id', (request, response) => {
    getNoteData()
        .then(note => {
            const id = request.params.id;
            const obj = note.find(note => note.id === id);
            const index = note.indexOf(obj);

            note.splice(index, 1);

            fs.promises.writeFile(db_path, JSON.stringify(note, null, 2))
                .then(() => {
                    console.log('todos updated successfully!');
                    response.json(note);
                })
                .catch(err => console.log(err));
        });
});

module.exports = notes_router;