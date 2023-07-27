const express=require('express')
const Port=process.env.PORT||8000

const app=express()
const cookieParser = require('cookie-parser');
const mongoDb=require('./config/mongoose')
const passport=require('passport')
const passportLocal=require('./config/passport')
const MongoStore=require('connect-mongo')
const session = require('express-session')
const expressLayouts=require('express-html-layouts')





// const request = require('request');

// const options = {
//   method: 'GET',



//   url: 'https://hotels-com-provider.p.rapidapi.com/v2/domains',
//   headers: {
//     'X-RapidAPI-Key': '92c0db195dmsha4147c2f61e81f6p1fe6e6jsna5a386199245',
//     'X-RapidAPI-Host': 'hotels-com-provider.p.rapidapi.com',
//     useQueryString: true
//   }
// };

// request(options, function (error, response, body) {
// 	if (error) throw new Error(error);

// 	console.log(body);
// });


app.use(express.urlencoded({extended:true}));

app.use(cookieParser());

app.use(express.static('./assets'));
//make the uploads path available to the browser
// app.use('/uploads', express.static(__dirname + '/uploads'));

app.use(expressLayouts);
// extract style and scripts from sub pages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);




// set up the view engine
app.set('view engine', 'html');
app.set('views', './views');



app.use(session({
    name: 'Placement_Cell',
    // TODO change the secret before deployment in production mode

    secret: 'anything',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100)
    },

    store: MongoStore.create({
        //options)
    // store : new MongoStore({
       mongoUrl : "mongodb://0.0.0.0:27017/Placement_Cell",
        autoremove : "disabled",
    },function(err){
        console.log("error at mongo store",err || "connection established to store cookie");
    })
}))





app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

app.use('/',require('./routes/index'))
app.listen(Port,function(err){
    if(err){
        console.log(err)
    }
    console.log("Server is Running Over Port: ",Port)
})