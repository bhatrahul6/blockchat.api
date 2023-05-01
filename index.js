const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const config = require('./config')
const middleware = require('./middleware') // Auth Middleware

// Controllers
const dataController = require('./controllers/dataController');

const app = express();
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());
app.use(middleware.decodeToken);

const session = require('express-session');
app.set('view engine', 'ejs');

app.use(session({
  resave: false,
  saveUninitialized: true,
  secret: 'SECRET' 
}));

app.get('/', function(req, res) {
  res.render('pages/auth');
});


app.get('/chats', (req,res)=>{
  res.json({
    chats: [{
      id: 1,
      userName: 'Jai Singh',
      avatar: `https://api.dicebear.com/6.x/initials/svg?seed=JaiSingh`,
    },
    {
      id: 2,
      userName: 'Anisha Singh',
      avatar: `https://api.dicebear.com/6.x/initials/svg?seed=AnishaSingh`,
    },
    {
      id: 3,
      userName: 'Rahul Bhat',
      avatar: `https://api.dicebear.com/6.x/initials/svg?seed=RahulBhat`,
    },
    {
      id: 4,
      userName: 'Arya Karemore',
      avatar: `https://api.dicebear.com/6.x/initials/svg?seed=AryaKaremore`,
    },
    {
      id: 5,
      userName: 'Artistson Syngwan',
      avatar: `https://api.dicebear.com/6.x/initials/svg?seed=ArtistsonSyngwan`,
    },
    {
      id: 6,
      userName: 'Dhiraj',
      avatar: `https://api.dicebear.com/6.x/initials/svg?seed=Dhiraj`,
    }]
  });
})













/*  PASSPORT SETUP  */
const passport = require('passport');
var userProfile;

app.use(passport.initialize());
app.use(passport.session());

app.set('view engine', 'ejs');

app.get('/success', (req, res) => res.send(userProfile));
app.get('/error', (req, res) => res.send("error logging in"));

passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});

/*  Google AUTH  */
 
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const GOOGLE_CLIENT_ID = 'our-google-client-id';
const GOOGLE_CLIENT_SECRET = 'our-google-client-secret';
passport.use(new GoogleStrategy({
    clientID: "176306068694-04v9t6sifofuh2hglf36kafg0f8cs0sn.apps.googleusercontent.com",
    clientSecret: "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",
    callbackURL: "http://localhost:3000/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, done) {
      userProfile=profile;
      return done(null, userProfile);
  }
));
 
app.get('/auth/google', 
  passport.authenticate('google', { scope : ['profile', 'email'] }));
 
app.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/error' }),
  function(req, res) {
    // Successful authentication, redirect success.
    res.redirect('/success');
  });



app.listen(config.port , () => console.log('App listening on port ' + config.port));