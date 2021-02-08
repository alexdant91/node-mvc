const express = require('express');
const app = express();

const fs = require('fs');

const TemplateEngine = require('./vendor/Template/engine');

app.engine('mvc', function (filePath, options, callback) {
  fs.readFile(filePath, function (err, content) {
    if (err) return callback(new Error(err));

    content = Buffer.from(content).toString('ascii')

    const rendered = TemplateEngine(content, options)

    return callback(null, rendered);

  });
});

app.set('views', './views');
app.set('view engine', 'mcv');

app.get('/', (req, res) => {
  res.render('index', { title: 'Hey', message: 'Hello there!', isDone: undefined, array: ['uno', 'due', 'tre'] });
})

app.listen(8000)
