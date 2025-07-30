-- Create Database
CREATE DATABASE expense_tracker;
USE expense_tracker;

-- Users Table
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    status ENUM('active', 'inactive') DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Categories Table
CREATE TABLE categories (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Expenses Table
CREATE TABLE expenses (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    category_id INT NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    date DATE NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE RESTRICT
);

-- Insert Sample Data
INSERT INTO users (name, email) VALUES 
('John Doe', 'john@example.com'),
('Jane Smith', 'jane@example.com'),
('Mike Johnson', 'mike@example.com');

INSERT INTO categories (name) VALUES 
('Food & Dining'),
('Transportation'),
('Entertainment'),
('Shopping'),
('Bills & Utilities'),
('Healthcare'),
('Travel'),
('Education');

-- Sample Expenses (for testing statistics)
INSERT INTO expenses (user_id, category_id, amount, date, description) VALUES 
(1, 1, 25.50, '2025-01-15', 'Lunch at restaurant'),
(1, 2, 45.00, '2025-01-15', 'Gas station'),
(1, 1, 30.00, '2025-01-16', 'Grocery shopping'),
(2, 3, 50.00, '2025-01-16', 'Movie tickets'),
(2, 1, 20.00, '2025-01-17', 'Fast food');