var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var userRoute = require('./routers/user.route');
var authRoute = require('./routers/auth.route');
var authMiddleware = require('./middleware/auth.middleware');
var productRoute = require('./routers/product.route');
var sessionMiddleware = require('./middleware/session.middleware');
var cartRoute = require('./routers/cart.route');
var port = 3000;

var app = express();

require('dotenv').config();

app.set('view engine', 'pug')
app.set('views', './views')

app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(cookieParser(process.env.SECRET_Cookie));
app.use(express.static('public'));

app.use(sessionMiddleware);

app.get('/', (req, res) => { res.render('index', { name: 'kienz' }) });

app.use('/users',authMiddleware.requireAuth,userRoute);
app.use('/auth',authRoute);
app.use('/products',productRoute);
app.use('/cart', cartRoute);

app.listen(port, () => { console.log('Server listening on port ' + port); })