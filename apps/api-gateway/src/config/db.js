import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const { Pool } = pg;

const pool = new Pool({
	connectionString: process.env.DATABASE_URL,
	ssl: {
		rejectUnauthorized: false,
	},
	max: 10,
	idleTimeoutMillis: 30000,
	connectionTimeoutMillis: 10000,
});

pool.on("error", (err) => {
	console.error("Unexpected PostgreSQL pool error:", err);
});

/**
 * Execute a parameterized query against the database.
 * @param {string} text - SQL query string
 * @param {Array} params - Query parameters
 * @returns {Promise<import('pg').QueryResult>}
 */
export const query = async (text, params) => {
	const start = Date.now();
	const result = await pool.query(text, params);
	const duration = Date.now() - start;
	if (process.env.NODE_ENV === "development") {
		console.log("Executed query", {
			text: text.substring(0, 80),
			duration,
			rows: result.rowCount,
		});
	}
	return result;
};

/**
 * Get a client from the pool for transactions.
 */
export const getClient = () => pool.connect();

export default pool;
