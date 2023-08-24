import sqlite3 from 'sqlite3';
import { Database } from 'sqlite-async';

const DBSOURCE = 'db.sqlite';
const db = new sqlite3.Database(DBSOURCE, (err) => {
  if (err) {
    // Cannot open database
    console.error(err.message);
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
        userId INTEGER,
        exerciseId INTEGER,
        duration INTEGER,
        PRIMARY KEY (userId, exerciseId)
        );`;

    const tables = [createTableUser, createTableExercises];

    tables.forEach((table) => {
      db.run(table, (err) => {
        if (err) {
          // Table already created
          console.log('ANY ERROR:', err);
        } else {
          // Table just created, creating some rows
          var insertUser = 'INSERT INTO user (id, username) VALUES (?,?)';
          db.run(insertUser, ['1', 'nicko']);
          db.run(insertUser, ['2', 'mockey']);
        }
      });
    });
  }
});

export default db;
