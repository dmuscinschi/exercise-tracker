import sqlite3 from 'sqlite3';

const DBSOURCE = 'db.sqlite';
const db = new sqlite3.Database(DBSOURCE, (err) => {
  if (err) {
    // Cannot open database
    console.error('ERROR WHILE OPENING', err.message);
    throw err;
  } else {
    console.log('Connected to the SQLite database.');

    const createTableUser = `
      CREATE TABLE user (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username text 
        );`;

    const createTableExercises = `
      CREATE TABLE exercises (
        exerciseId INTEGER PRIMARY KEY AUTOINCREMENT,
        userId INTEGER,
        description text,
        duration INTEGER,
        date text
        );`;

    const tables = [createTableUser, createTableExercises];

    tables.forEach((table, index) => {
      db.run(table, (err) => {
        if (err) {
          // Table already created
          console.log('ANY ERROR:', err);
        } else {
          // Table just created, creating some rows
          if (index === 0) {
            // just for users
            var insertUser = 'INSERT INTO user (id, username) VALUES (?,?)';
            db.run(insertUser, ['1', 'nicko']);
            db.run(insertUser, ['2', 'mockey']);
          }
        }
      });
    });
  }
});

export default db;

// INSERT INTO exercises (exerciseid, userid, description, duration, date) VALUES (4, 1, 'Hello', 323, 2012-02-02)

// select * from exercises where userId = 1 and date(date) > 2003-10-10
