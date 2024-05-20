import mysql2 from 'mysql2/promise';

const DB_HOST = 'localhost';
const DB_USER = 'root';
const DB_PASSWORD = 'root';
const DB_NAME = 'task'; 

console.log('Creating connection pool...');

const connectionPool = mysql2.createPool({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
  charset: 'utf8mb4' 
});



connectionPool.getConnection()
  .then(conn => {
    console.log('Successfully connected to the DB.');
    conn.release(); // Release the connection back to the pool
  })
  .catch(err => {
    console.error('Unable to connect to the DB:', err.message);
  });

export default connectionPool;
