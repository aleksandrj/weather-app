const express = require('express');
const cors = require('cors');

const app = express();

const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const db = require('./app/model');

let url;
if (
  process.env.DB_HOST &&
  process.env.DB_PORT &&
  process.env.DB_USER &&
  process.env.DB_PASSWORD &&
  process.env.DB_NAME
) {
  url =
    'mongodb://' +
    process.env.DB_USER +
    ':' +
    process.env.DB_PASSWORD +
    '@' +
    process.env.DB_HOST +
    ':' +
    process.env.DB_PORT +
    '/' +
    process.env.DB_NAME;
} else {
  url = db.url;
}

db.mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected.');
  })
  .catch((err) => {
    console.log('Failed to connect.', err);
    process.exit();
  });

app.get('/', (req, res) => {
  res.json();
});

require('./app/routes/log.routes.js')(app);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
