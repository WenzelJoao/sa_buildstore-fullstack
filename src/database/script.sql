DROP TABLE IF EXISTS products;
DROP TABLE IF EXISTS users;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  senha VARCHAR(100) NOT NULL,
  criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  preco NUMERIC(10, 2) NOT NULL,
  quantidade INTEGER NOT NULL,
  criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO products (nome, preco, quantidade) VALUES
('Cimento', 35.90, 50),
('Tijolo', 1.20, 1000),
('Areia', 120.00, 20),
('Brita', 140.00, 15),
('Tinta', 89.90, 30),
('Ferro', 45.00, 80),
('Bloco', 3.50, 500);
