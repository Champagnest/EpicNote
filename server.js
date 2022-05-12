const apiRoutes = require('./routes/apiRoutes');
const htmlRoutes = require('./routes/htmlRoutes');
const fs = require('fs');

const PORT = process.env.PORT || 3001;
const app = express();

app.listen(PORT, () => {
  console.log(`API server now on port ${PORT}!`);
});

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/api', apiRoutes);
app.use('/', htmlRoutes);