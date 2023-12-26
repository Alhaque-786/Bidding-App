const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const PORT = 5000;

app.use(bodyParser.json());

mongoose.connect('', {useNewUrlParser: true, useUnifiedTopology: true});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});