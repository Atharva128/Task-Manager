require('dotenv').config();
const app = require('./app');

const PORT = 3000;

app.listen(3000, '0.0.0.0' () => {
  console.log(`Server running on port 3000`);
});
