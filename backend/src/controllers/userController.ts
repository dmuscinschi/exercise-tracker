import db from '../database';
import { Exercise, User, UserExerciseLog } from '../types';

export const usersList = (req, res) => {
  let sql = 'select * from user';
  let params = [];
  db.all(sql, params, (err, rows: User[]) => {
    console.log('working');
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      status: 'success',
      data: rows,
    });
  });
  // res.status(200).json({ id: 1, message: 'U got me' });
};

export const user_create_post = (req, res) => {
  console.log('POST REQUEST');
  console.log('REQ', req.body);
  let sqlQuery = 'INSERT INTO user (name, email, password) VALUES (?,?,?)';
  let params = ['CHECKME', 'CHECKME@gmail.com', 'CHECKME'];
  db.run(sqlQuery, params, (err, rows) => {
    console.log('add new user');
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({ status: 'success', data: rows });
  });
};

export const user_get = (req, res) => {
  const sqlQuery = 'select * from user where id = ?';
  const params = [req.params.id];
  console.log('/api/users/:id');

  db.get(sqlQuery, params, (err, row) => {
    console.log('ROWROW', row);
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: 'success',
      data: row,
    });
  });
  // res.json({ status: 'success', data: 'hello' });
};

export const user_exercises_post = (req, res) => {
  const params = [req.params.id, req.body.exerciseId, req.body.duration];
  let sqlQuery = 'INSERT INTO exercises (userId, exerciseId, duration) VALUES (?,?,?)';

  const data = req.body;
  console.log(params, data, 'HELLO');

  db.run(sqlQuery, params, (err, rows) => {
    console.log('add new exercise for user:', req.params.id);
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({ status: 'success', data: rows });
  });
};

export const user_logs_get = async (req, res) => {
  const params = [req.params.id];
  let sqlQuery = 'select * from exercises where userId = ?';
  let sqlQuery1 = 'select * from user where id = ?';

  let exercisesLog: UserExerciseLog;

  let id, username;

  await db.get(sqlQuery1, params, (err, row: User) => {
    console.log('ROWROW', row);
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }

    id = row.id;
    username = row.username;
  });

  let exercies: Exercise[] = [];
  db.all(sqlQuery, params, (err, row: Exercise[]) => {
    console.log('EXERCISES', row);
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }

    exercies = row;
    return row;
  });

  exercisesLog = {
    id,
    username,
    logs: exercies,
    count: exercies.length,
  };

  res.json({
    message: 'success',
    data: exercisesLog,
  });
};
