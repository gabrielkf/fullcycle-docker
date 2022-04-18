const express = require('express');
const {
  createTable,
  insertPerson,
  getPeople,
} = require('./dbOperations');

const PORT = 3030;
const PERSON = 'Michael Jackson the King';
createTable();

const app = express();

app.get('/', (req, res) => {
  insertPerson(PERSON);

  return getPeople()
    .then(peopleList =>
      res.send(`<h1>Full Cycle Rocks!</h1>${peopleList}`)
    )
    .catch(message => res.send(`<p>${message}</p>`));
});

app.listen(PORT, () => {
  console.log(`Running on localhost:${PORT}`);
});
