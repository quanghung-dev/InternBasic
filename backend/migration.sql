DROP TABLE IF EXISTS products;

CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    price NUMERIC(10,2) NOT NULL,
    category VARCHAR(100),
    stock INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO products (name, price, category, stock)
VALUES
('iPhone 15 Pro', 28990000, 'Điện thoại', 25),
('Samsung Galaxy S24', 22990000, 'Điện thoại', 18),
('MacBook Air M3', 31990000, 'Laptop', 12),
('Dell XPS 13', 29990000, 'Laptop', 10),
('Logitech MX Master 3S', 2490000, 'Phụ kiện', 40),
('Keychron K8', 2190000, 'Bàn phím', 35),
('Sony WH-1000XM5', 7990000, 'Tai nghe', 22),
('iPad Air M2', 17990000, 'Máy tính bảng', 15),
('Apple Watch Series 10', 11990000, 'Đồng hồ', 20),
('Xiaomi Redmi Note 14', 6990000, 'Điện thoại', 30);
