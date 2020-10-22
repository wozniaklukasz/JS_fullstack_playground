import pool from '../database/db';

export const resolvers = {
  Query: {
    users: async () => {
      const users = await pool.query('SELECT * FROM users');
      return users.rows;
    },
  },
};
