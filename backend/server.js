const express = require('express');
const cors = require('cors');

const app = express();

const PORT = 8080;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const db = require('./app/model');
db.mongoose
  .connect(db.url, {
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
