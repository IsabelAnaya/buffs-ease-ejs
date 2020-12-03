var express = require('express'); //Ensure our express framework has been added
var app = express();
var bodyParser = require('body-parser'); //Ensure our body-parser tool has been added
app.use(bodyParser.json());              // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

//Create Database Connection
var pgp = require('pg-promise')();

let dbConfig = {
 	host: 'localhost',
 	port: 5432,
 	database: 'covid_db',
 	user: 'postgres',
 	password: 'pwd'
};

const isProduction = process.env.NODE_ENV === 'production';
dbConfig = isProduction ? process.env.DATABASE_URL : dbConfig;
let db = pgp(dbConfig);

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/'));

app.get('/', function(req, res) {
	res.render('pages/login');
});

app.get('/login', function(req, res) {
  res.render('pages/login');
});

app.get('/home', function(req, res) {
  res.render('pages/home');
});

app.get('/covid', function(req, res) {
  res.render('pages/covid');
});

app.get('/resources', function(req, res) {
  res.render('pages/resources');
});

app.get('/explore', function(req, res) {
  var topLocations = "SELECT search_location FROM locations ORDER BY count DESC LIMIT 10;";
  var topSearch = "SELECT search FROM searches;";
  var faq = "SELECT search FROM searches ORDER BY count DESC LIMIT 10;";

  db.task('get-everything', task => {
    return task.batch([
	      task.any(topLocations),
	      task.any(topSearch),
	      task.any(faq)
      ]);
  })
  .then(info => {
  	res.render('pages/explore', {
			locations: info[0],
			searches: info[1],
			faq: info[2] //actually currently used
		})
  })
  .catch(err => {
        console.log('error', err);
        res.render('pages/explore', {
            locations: '',
            searches: '',
            faq: ''
        });
    });
});

app.get('/profile', function(req, res) {
    res.render('pages/profile');
});

//app.listen(3000);
const PORT = process.env.PORT || 8080;

const server = app.listen(PORT, () => {
	console.log(`Express running → PORT ${server.address().port}`);
});
