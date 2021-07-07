/* eslint-disable no-console */
const app = require('./src/app');
const { sequelize } = require('./models');

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Listening: http://localhost:${port}`);

  sequelize
    .authenticate()
    .then(() => console.log('Database Connected!!!'))
    .catch((err) => console.log(err));
});
