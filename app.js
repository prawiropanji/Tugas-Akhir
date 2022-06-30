const path = require('path');

const express = require('express');
const session = require('express-session');
const mongoDBStore = require('connect-mongodb-session');

const authenticationRoutes = require('./routes/authentication.route');
const baseRoutes = require('./routes/base.route');
const kelolaAkunRoutes = require('./routes/kelola-akun.route');
const kelolaProdukRoutes = require('./routes/kelola-produk.route');
const kelolaTransaksiBeliRoutes = require('./routes/kelola-beli.route');
const kelolaTransaksiJualRoutes = require('./routes/kelola-jual.route');
const laporanRoutes = require('./routes/laporan.route');

const authMiddleware = require('./middlewares/check-auth');
const errorMiddleware = require('./middlewares/default-error');
const routeProtectionMiddleware = require('./middlewares/route-protection');
const notFoundMiddleware = require('./middlewares/not-found');

const db = require('./data/database');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const MongoDBStore = mongoDBStore(session);
const sessionStore = new MongoDBStore({
  uri: 'mongodb://localhost:27017',
  databaseName: 'okoonodb',
  collection: 'sessions',
});

app.use(
  session({
    secret: 'super secret',
    saveUninitialized: false,
    resave: false,
    store: sessionStore,
  })
);

app.use(authMiddleware);
app.use(authenticationRoutes);
app.use(routeProtectionMiddleware);
app.use(baseRoutes);
app.use('/admin', kelolaAkunRoutes);
app.use('/admin', kelolaProdukRoutes);
app.use('/admin', kelolaTransaksiBeliRoutes);
app.use('/admin', kelolaTransaksiJualRoutes);
app.use('/admin', laporanRoutes);

app.use(notFoundMiddleware);

app.use(errorMiddleware);

db.connectDatabase().then(function () {
  app.listen(3000);
});
