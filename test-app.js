// This application uses express as its web server
// for more info, see: http://expressjs.com
const express = require('express');

//Filesystem manipulation
const fs = require('fs');
const path = require('path');

//Lodash is awesome
const _ = require('lodash');

//Load damage calc config from file
var config = require('./config/main.json');
config.filters = require('./config/matchup-filters.json');

//Mustache template engine
const expressHandlebars = require('express-handlebars');
handlebarsHelpers = require('handlebars-helpers')();

const handlebarsEngine = expressHandlebars.create({
    defaultLayout: 'test-layout',
    viewsDir: __dirname + '/views',
    layoutsDir: __dirname + '/views/layouts',
    partialsDir: __dirname + '/views/partials',
    helpers: handlebarsHelpers
});

// create a new express server
var app = express();

// Register '.mustache' extension with The Mustache Express
app.engine('handlebars', handlebarsEngine.engine);
app.set('view engine', 'handlebars');
app.set('views', handlebarsEngine.viewsDir);

// serve the files out of ./public as our main files
app.use(express.static(__dirname + '/public', { redirect : false }));

// start server on the specified port and binding host
app.listen(3000, '0.0.0.0', function() {
    // print a message when the server starts listening
    console.log('KageroCalc Starting on port 3000. Test at http://localhost:3000');
});

app.get('/', function(req, res, next) {

    //Register configuration variables from config file
    _.forIn(config, function(config, key) {
        res.locals[key] = config;
    });

    res.locals.ads = false;

    res.locals.data = JSON.stringify(loadJson('public/data'));

    res.locals.pageCSS = [
        { stylesheet: 'sorter' },
        { stylesheet: 'calc-style' },
        { stylesheet: 'outdated-browser' }

    ];
    res.locals.bottomJS = [
        'lib/outdated-browser.min.js',
        'lib/clipboard.min.js',
        'lib/jquery.min.js',
        'tsorter.js',
        'util.js',
        'character-tabs.js',
        'combat-functions.js',
        'stat-functions.js',
        'display/update-handlers.js',
        'reddit-markdown.js',
        'main.js',
        'init/setup-heroes.js',
        'init/event-listeners.js',
        'init/init.js'
    ];
    res.render('damage-calc', res.locals);
});

function loadJson(dir) {
    var filenames = fs.readdirSync(dir);

    var data = {};

    filenames.forEach(function(filename) {

        var file = `${dir}/${filename}`;
        var parts = filename.split('.');
        if (parts.length === 1) {
            data[filename] = loadJson(file);
        }
        else {
            var contents = fs.readFileSync(`${dir}/${filename}`, 'utf-8');

            data[parts[0]] = JSON.parse(contents);
        }
    });

    return data;
}
