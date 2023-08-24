import db from '../database';
import { Exercise, User, UserExerciseLog } from '../types';

export const usersList = (req, res) => {
  let sql = 'select * from user';
  let params = [];
  db.all(sql, params, (err, rows: User[]) => {
    console.log('working');
    if (err) {
      res.status(400).json({ status: 'error', error: err.message });
      return;
    }
    res.json({
      status: 'success',
      data: rows,
    });
  });
};

export const user_create_post = (req, res) => {
  console.log('POST REQUEST');
  console.log('REQ', req.body);
  let sqlQuery = 'INSERT INTO user (username) VALUES (?)';
  let params = ['Micke'];
  db.run(sqlQuery, params, (err, rows) => {
    console.log('add new user');
    if (err) {
      res.status(400).json({ status: 'error', error: err.message });
      return;
    }
    res.json({ status: 'success', data: rows });
  });
};

export const user_get = (req, res) => {
  const sqlQuery = 'select * from user where username = ?';
  const params = [req.params.username];

  db.get(sqlQuery, params, (err, row) => {
    console.log('ROWROW', row);
    if (err) {
      res.status(400).json({ status: 'error', error: err.message });
      return;
    }
    res.json({
      status: 'success',
      data: row,
    });
  });
};

export const user_exercises_post = (req, res) => {
  console.log('NEW REQUEST');
  const params = [req.params.id, req.body.duration, req.body.description, req.body.date];
  let sqlQuery = 'INSERT INTO exercises (id, duration, description, date) VALUES (?,?,?,?)';

  const data = req.body;
  console.log(params, data, 'HELLO');

  db.run(sqlQuery, params, (err, rows) => {
    console.log('add new exercise for user:', req.params.id);
    if (err) {
      res.status(400).json({ status: 'error', error: err.message });
      return;
    }
    res.json({ status: 'success', data: rows });
  });
};

export const user_logs_get = async (req, res) => {
  const params = [req.params.id];
  let sqlQuery = 'select * from exercises where id = ?';
  let sqlQuery1 = 'select * from user where id = ?';

  let exercisesLog: UserExerciseLog;

  let id, username;

  await new Promise((resolve, reject) => {
    db.get(sqlQuery1, params, (err, row: User) => {
      console.log('ROWROW', row);
      if (err) {
        res.status(400).json({ status: 'error', error: err.message });
        reject();
      }

      id = row.id;
      username = row.username;
      resolve(true);
    });
  });

  let exercies: Exercise[] = [];
  await new Promise((resolve, reject) => {
    db.all(sqlQuery, params, (err, row: Exercise[]) => {
      console.log('EXERCISES', row);
      if (err) {
        res.status(400).json({ status: 'error', error: err.message });
        reject();
      }

      exercies = row;
      resolve(true);
    });
  });

  exercisesLog = {
    id,
    username,
    logs: exercies,
    count: exercies.length,
  };

  res.json({
    status: 'success',
    data: exercisesLog,
  });
};
