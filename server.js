const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.post('/api/saveHighway', (req, res) => {
    // Simulate saving to MongoDB (replace with actual MongoDB code)
    console.log('Saving highway to the database:', req.body);
    res.sendStatus(200);
});

app.delete('/api/deleteHighway', (req, res) => {
    // Simulate deleting from MongoDB (replace with actual MongoDB code)
    console.log('Deleting highway from the database:', req.body);
    res.sendStatus(200);
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
