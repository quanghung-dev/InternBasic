const db = require('../db');

const getAllProducts = async (search) => {
  if (search) {
    const result = await db.query(
      'SELECT * FROM products WHERE name ILIKE $1 OR category ILIKE $1 ORDER BY id DESC',
      [`%${search}%`]
    );
    return result.rows;
  } else {
    const result = await db.query('SELECT * FROM products ORDER BY id DESC');
    return result.rows;
  }
};

const getProductById = async (id) => {
  const result = await db.query('SELECT * FROM products WHERE id = $1', [id]);
  return result.rows[0];
};

const createProduct = async (data) => {
  const { name, price, category, stock } = data;
  const result = await db.query(
    'INSERT INTO products (name, price, category, stock) VALUES ($1, $2, $3, $4) RETURNING *',
    [name, price, category, stock || 0]
  );
  return result.rows[0];
};

const updateProduct = async (id, data) => {
  const fields = [];
  const values = [];
  let index = 1;

  const allowedFields = ['name', 'price', 'category', 'stock'];
  for (const field of allowedFields) {
    if (data[field] !== undefined) {
      fields.push(`${field} = $${index}`);
      values.push(data[field]);
      index++;
    }
  }

  if (fields.length === 0) {
    return null; // Nothing to update
  }

  values.push(id);
  const query = `UPDATE products SET ${fields.join(', ')} WHERE id = $${index} RETURNING *`;
  const result = await db.query(query, values);
  return result.rows[0];
};

const deleteProduct = async (id) => {
  const result = await db.query('DELETE FROM products WHERE id = $1 RETURNING *', [id]);
  return result.rows[0];
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
