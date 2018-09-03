const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(cors());

mongoose.connect('mongodb://Fisher:admin1@ds123852.mlab.com:23852/recipes-book', { useNewUrlParser: true });
mongoose.connection.once('open', () => {
    console.log('connected to db');
});

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true,
}));

app.listen(4000, () => {console.log('listen 4000');});