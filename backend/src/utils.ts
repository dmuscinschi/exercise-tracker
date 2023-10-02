import db from './database';

export const userExists = async (username) => {
  const sqlQuery = 'select * from user where username = ?';
  const result = await new Promise<boolean>((resolve) => {
    db.get(sqlQuery, username, (err, row) => {
      if (err) {
        resolve(false);
      } else {
        if (row) {
          resolve(false);
        }
        resolve(true);
      }
    });
  });
  return result;
};

export const userExistsById = async (userId) => {
  const sqlQuery = 'select * from user where id = ?';
  const result = await new Promise<boolean>((resolve) => {
    db.get(sqlQuery, userId, (err) => {
      if (err) {
        return false;
      } else {
        resolve(true);
        return true;
      }
    });
  });
  return result;
};

export const dateIsValid = (date: string) => {
  const [year, month, day] = date.split('-').map(Number);

  if (year >= 0 && month >= 1 && month <= 12 && day >= 1 && day <= 31) {
    return true;
  } else {
    return false;
  }
};
