const express = require('express');
const swig = require('swig');
const sqlite = require('sqlite3');
const path = require('path');
const bodyParser = require('body-parser');

const port = process.env.PORT || 3000;
const app = express();

app.use('/vendor', express.static(path.join(__dirname, 'node_modules')));

// const db = new sqlite.Database('./acmeDB.sql', console.log);


app.set('view engine', 'html');
app.engine('html', swig.renderFile);
swig.setDefaults({ cache: false });

app.use(bodyParser.urlencoded({ extended: false }));

app.use('/categories', require('./routes/categories'));

app.get('/', (req, res) => {
  res.render('index');
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
