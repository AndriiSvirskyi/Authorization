const http = require('http');
const app = require('express')();
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');

const routes = require('./routes');

mongoose.connect('mongodb://localhost:27017/users', { useNewUrlParser: true });
const db = mongoose.connection;
db.once('open', () => console.log('MongoDB connection'));
db.on('error', console.error.bind(console, 'MongoDB connection error:'));


app.use(morgan('combined'));
app.use(cors());
app.use(bodyParser.json({ type: 'application/json' }));
app.use('/api', routes);


const server = http.createServer(app);
server.listen(3001, () => console.log('Server listening on port: 3001'));
