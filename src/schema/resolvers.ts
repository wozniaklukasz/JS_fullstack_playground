import pool from '../database/db';

export const resolvers = {
  Query: {
    users: async () => {
      const resp = await pool.query('SELECT * FROM users');
      return resp.rows.map(user => {
        return {
          id: user.id,
          name: user.name,
          authProvider: user.auth_provider,
          userRole: user.user_role
        }
      });
    },
  },
};
