const mysql = require('mysql');

const databaseConfig = {
  host: 'db',
  user: 'root',
  password: 'root',
  database: 'nodedb',
};

const TABLE_NAME = 'people';

const dbConnection = () => mysql.createConnection(databaseConfig);

function createTable() {
  const connection = dbConnection();

  connection.query(
    `CREATE TABLE IF NOT EXISTS ${TABLE_NAME} (name VARCHAR(255))`,
    (err, result) => {
      if (err) {
        console.error(err);
        return;
      }

      connection.end();
    }
  );
}

function insertPerson(name) {
  const connection = dbConnection();

  connection.query(
    `INSERT INTO ${TABLE_NAME}(name) values('${name}')`,
    (err, result) => {
      if (err) {
        console.error(err);
        return;
      }

      connection.end();
    }
  );
}

function getPeople() {
  return new Promise((resolve, reject) => {
    const connection = dbConnection();

    connection.query(`SELECT * FROM ${TABLE_NAME}`, (err, rows) => {
      if (err || !rows) reject('Error consulting database');

      connection.end();
      const people = rows.map(person => `<li>${person.name}</li>`);
      resolve(`<ul>${people.join('')}</ul>`);
    });
  });
}

module.exports = {
  createTable,
  insertPerson,
  getPeople,
};
