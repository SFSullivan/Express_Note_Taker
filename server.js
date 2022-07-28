// dependencies
const fs = require("fs")
const express = require("express");
const path = require("path");
const api_routes = require("./routes/api_routes");

// creates the express server
const app = express();

// create a port
const PORT = process.env.PORT || 3333;

// allows to parse JSON
app.use(express.json());

// attach client form data to the request.body
app.use(express.urlencoded({ extended: true}));

// shares static/browser files
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (request, response) => {
    response.sendFile(__dirname + '/public.notes.html');
});

app.get('/notes', (request, response) => {
    response.sendFile(__dirname + '/public/notes.html');
});

app.use('/api', api_routes);

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
})