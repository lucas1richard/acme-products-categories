const express = require('express');
const nunjucks = require('nunjucks');
const path = require('path');
const methodOverride = require('method-override');
const chalk = require('chalk');

const port = process.env.PORT || 3000;
const app = express();

app.use('/vendor', express.static(path.join(__dirname, 'node_modules')));


app.set('view engine', 'html');
app.engine('html', nunjucks.render);
nunjucks.configure('views', { noCache: true });

app.use(methodOverride('_method'));

app.use('/', require('./routes/categories'));

app.get('/', (req, res) => {
  res.render('index');
});

app.listen(port, () => {
  console.log(chalk.bold.yellow(`Server is listening on port ${port}`));
});
