const express = require ('express'),
	bodyParser = require('body-parser'),
	app = express(),
	port = process.env.PORT || 3000,
	data = require('./data');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use('/includes', express.static(`${__dirname}/public`));
app.use('/', express.static('./'));

app.use( (req, res, next) => {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers",
	"Origin, X-Requested-With, Content-Type, Accept");
	res.set("Content-Type", "application/json");
	next();
});

app.all('*', (req, res, next) => {
  console.log("runs for all HTTP verbs first");
  next();
});

app.get('/', (req,res) => {
	//console.log(`__dirname: ${__dirname}`);
	res.sendFile(`${__dirname}/index.html`);
});

app.get('/getAllBooks', data.getAllBooks);
app.post('/getBooksByCategory/', data.getBooksByCategory);
app.post('/getBooksByBorrowerPhone/', data.getBooksByBorrowerPhone);

app.get('/getBooksByCategoryAndPhone/:category/:phone', data.getBooksByCategoryAndPhone);
app.put('/getBooksByCategoryAndPhone/:category/:phone', data.getBooksByCategoryAndPhone);
app.post('/getBooksByCategoryAndPhone/', data.postBooksByCategoryAndPhone);

app.all('*', function(req, res) {
  var error = {"error":"item not found"};
  res.status(200).json(error);
});

app.listen(port, () => {
	console.log(`listening on port ${port}`);
});