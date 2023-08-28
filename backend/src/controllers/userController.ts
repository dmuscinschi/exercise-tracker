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
    res.status(200).json({
      status: 'success',
      data: rows,
    });
  });
};

export const user_create_post = (req, res) => {
  let sqlQuery = 'INSERT INTO user (username) VALUES (?)';
  let params = [req.body.username];

  if (req.body.username === '') {
    return res.status(400).json({ status: 'error', message: 'Username must not be empty' });
  }

  if (req.body.username.length < 4) {
    return res
      .status(400)
      .json({ status: 'error', message: 'Username must be at least 4 characters' });
  }

  db.run(sqlQuery, params, (err, rows) => {
    if (err) {
      res.status(400).json({ status: 'error', error: err.message });
      return;
    }
    res.status(200).json({ status: 'success', data: rows });
  });
};

export const user_get = (req, res) => {
  const sqlQuery = 'select * from user where username = ?';
  const params = [req.params.username];

  if (req.params.username.length < 4) {
    return res
      .status(400)
      .json({ status: 'error', message: 'Username must be at least 4 characters' });
  }

  db.get(sqlQuery, params, (err, row) => {
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
  const params = [req.params.userId, req.body.duration, req.body.description, req.body.date];
  let sqlQuery = 'INSERT INTO exercises (userId, duration, description, date) VALUES (?,?,?,?)';

  if (isNaN(req.params.userId)) {
    return res.status(400).json({ status: 'error', message: 'User id should be number' });
  }

  if (!req.body.duration) {
    return res.status(400).json({ status: 'error', message: 'Duration should not be empty' });
  }

  if (isNaN(req.body.duration)) {
    return res.status(400).json({ status: 'error', message: 'Duration should be number(minutes)' });
  }

  if (!req.body.description) {
    return res.status(400).json({ status: 'error', message: 'Description should not be empty' });
  }

  if (req.body.date === '') {
    return res
      .status(400)
      .json({ status: 'error', message: 'Date should be in format: YYYY:MM:DD' });
  }

  if (isNaN(Date.parse(req.body.date))) {
    return res
      .status(400)
      .json({ status: 'error', message: 'Date should be in format: YYYY:MM:DD' });
  }

  console.log('req.body.date', !new Date(req.body.date));

  db.run(sqlQuery, params, (err, rows) => {
    if (err) {
      return res.status(400).json({ status: 'error', error: err.message });
    }
    return res.status(200).json({ status: 'success', data: rows });
  });
};

export const user_logs_get = async (req, res) => {
  const params = [req.params.userId];
  let sqlQuery = 'select * from exercises where userId = ?';
  let sqlQuery1 = 'select * from user where id = ?';

  let exercisesLog: UserExerciseLog;

  let id, username;

  if (isNaN(req.params.userId)) {
    return res.status(400).json({ status: 'error', message: 'User id should be number' });
  }

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

  res.status(200).json({
    status: 'success',
    data: exercisesLog,
  });
};
