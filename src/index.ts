import './config'; // Load environment variables
import 'express-async-errors'; // Enable default error handling for async errors

import express, { Express } from 'express';
import session from 'express-session';
import connectSqlite3 from 'connect-sqlite3';
import {
  getAllUserProfiles,
  registerUser,
  logIn,
  getUserProfileData,
  findUser,
  verifyEmail,
  deleteAccount,
  renderMenu,
} from './controllers/UserController.js';
import {
  followUser,
  unfollowUser,
  renderFollowingPage,
  renderFollowersPage,
} from './controllers/FollowController';
import { validateNewUserBody, validateLoginBody } from './validators/authValidator';

const app: Express = express();
app.set('view engine', 'ejs');

const { PORT, COOKIE_SECRET } = process.env;
const SQLiteStore = connectSqlite3(session);

const sessionMiddleware = session({
  store: new SQLiteStore({ db: 'sessions.sqlite' }),
  secret: COOKIE_SECRET,
  cookie: { maxAge: 8 * 60 * 60 * 1000 }, // 8 hours
  name: 'session',
  resave: false,
  saveUninitialized: false,
});

app.use(sessionMiddleware);
app.use(express.static('public', { extensions: ['html'] }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// endpoints
app.get('/api/users', getAllUserProfiles);
app.post('/users', validateNewUserBody, registerUser);

app.post('/login', validateLoginBody, logIn);
app.get('/users/menu', renderMenu);
app.get('/users/:targetUserId', getUserProfileData);
app.post('/users/search', findUser);

// Following/Followers
app.get('/users/follow/:targetUserId', followUser);
app.get('/users/unfollow/:targetUserId', unfollowUser);
app.get('/users/:targetUserId/following', renderFollowingPage);
app.get('/users/:targetUserId/followers', renderFollowersPage);

app.get('/users/verify/:targetUserId', verifyEmail);
app.post('/users/delete', deleteAccount);

// DEBUG
/*
app.get('/api/users/DELETEALL', deleteAllAccounts);
app.get('/api/rulesoflove/DELETEALL', deleteAllROL);
*/

app.listen(PORT, () => {
  console.log(`Listening at http://localhost:${PORT}`);
});
