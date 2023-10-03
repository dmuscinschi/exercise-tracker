import db from '../database';
import { Exercise, User, UserExerciseLog } from '../types';
import { dateIsValid, userExists, userExistsById } from '../utils';
const moment = require('moment'); // require

export const usersList = (_, res) => {
  let sql = 'select * from user';
  let params = [];
  db.all(sql, params, (err, rows: User[]) => {
    if (err) {
      return res.status(400).json({ status: 'error', error: err.message });
    }
    res.status(200).json({
      status: 'success',
      data: rows,
    });
  });
};

export const user_create_post = async (req, res) => {
  let sqlQuery = 'INSERT INTO user (username) VALUES (?)';
  const { username } = req.body;
  if (typeof username !== 'string') {
    return res.status(400).json({ status: 'error', message: 'Username must not be empty' });
  }

  let params = [username];

  if (username === '') {
    return res.status(400).json({ status: 'error', message: 'Username must not be empty' });
  }

  if (!(await userExists(params))) {
    return res.status(400).json({ status: 'error', error: 'User already exists' });
  }

  if (username.length < 4) {
    return res
      .status(400)
      .json({ status: 'error', message: 'Username must be at least 4 characters' });
  }

  db.run(sqlQuery, params, function (this, err) {
    if (err) {
      return res.status(400).json({ status: 'error', error: err.message });
    }

    res.status(200).json({
      status: 'success',
      data: {
        username: req.body.username,
        id: this.lastID,
      },
    });
  });
};

export const user_get = (req, res) => {
  const sqlQuery = 'select * from user where username = ?';
  const { username } = req.body;
  const params = [username];

  if (username.length < 4) {
    return res
      .status(400)
      .json({ status: 'error', message: 'Username must be at least 4 characters' });
  }

  db.get(sqlQuery, params, (err, row) => {
    if (err) {
      return res.status(400).json({ status: 'error', error: err.message });
    }
    res.json({
      status: 'success',
      data: row,
    });
  });
};

export const user_exercises_post = async (req, res) => {
  const dateIsEmpty = req.body.date === '' ? true : false;
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/; // should be format YYYY-MM-DD

  if (Object.keys(req.body).length === 0) {
    return res.status(400).json({ status: 'error', message: 'Filds must be filled' });
  }

  if (!(await userExistsById(req.params.userId))) {
    return res.status(400).json({ status: 'error', message: 'User does not exist' });
  }

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

  const exerciseDate = dateIsEmpty
    ? new Date().toISOString().slice(0, 10)
    : new Date(req.body.date).toISOString().slice(0, 10);

  if (!moment(req.body.date).isValid()) {
    return res.status(400).json({ status: 'error', message: 'Date should be valid' });
  }

  if (!dateIsEmpty && !dateRegex.test(req.body.date)) {
    return res
      .status(400)
      .json({ status: 'error', message: 'Date should be in format: YYYY-MM-DD' });
  }

  if (!exerciseDate) {
    return res
      .status(400)
      .json({ status: 'error', message: 'Date should be valid in format: YYYY-MM-DD' });
  }

  if (!dateIsEmpty && !dateIsValid(req.body.date)) {
    return res.status(400).json({ status: 'error', message: 'Date is not valid' });
  }

  const params = [req.params.userId, req.body.duration, req.body.description, exerciseDate];
  let sqlQuery = 'INSERT INTO exercises (userId, duration, description, date) VALUES (?,?,?,?)';

  db.run(sqlQuery, params, function (this, err) {
    if (err) {
      return res.status(400).json({ status: 'error', message: err.message });
    }
    return res.status(200).json({
      status: 'success',
      data: {
        userid: req.params.userId,
        duration: req.body.duration,
        description: req.body.description,
        date: new Date(exerciseDate).toDateString(),
        id: this.lastID,
      },
    });
  });
};

export const user_logs_get = async (req, res) => {
  const params = [req.params.userId];
  const limit = req.query.limit ? req.query.limit : Infinity;
  const fromDate = req.query.from;
  const to = req.query.to;
  let sqlQuery = `select * from ( select * from exercises where userId = ? order by datetime(date) asc) as ordered_exercises
   ${fromDate ? `where date >= '${fromDate}'` : ''} 
   ${to ? (!fromDate ? `where date <= '${to}'` : `and date <= '${to}'`) : ''}
   `;

  let sqlQuery1 = 'select * from user where id = ?';

  let exercisesLog: UserExerciseLog;

  let id, username, count;

  if (isNaN(req.params.userId)) {
    return res.status(400).json({ status: 'error', message: 'User id should be number' });
  }

  await new Promise((resolve) => {
    db.get(sqlQuery1, params, (err, row: User) => {
      if (err) {
        res.status(400).json({ status: 'error', message: err.message });
        return;
      }
      if (!row) {
        res.status(400).json({ status: 'error', message: 'User does not exist' });
        return;
      }
      id = row.id;
      username = row.username;
      resolve(true);
    });
  });

  let exercies: any = [];
  await new Promise((resolve) => {
    db.all(sqlQuery, params, (err, row: Exercise[]) => {
      if (err) {
        return res.status(400).json({ status: 'error', message: err.message });
      }
      exercies = row.map((item) => ({
        date: new Date(item.date).toDateString(),
        description: item.description,
        duration: item.duration,
      }));
      count = exercies.length;
      resolve(true);
    });
  });

  exercisesLog = {
    id,
    username,
    logs: exercies.slice(0, limit),
    count,
  };

  res.status(200).json({
    status: 'success',
    data: exercisesLog,
  });
};
