-- Creating database schema for SPK shoe selection system
-- Create shoes table to store shoe data
CREATE TABLE IF NOT EXISTS shoes (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    brand VARCHAR(100) NOT NULL,
    color VARCHAR(50) NOT NULL,
    material VARCHAR(100) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    occasion VARCHAR(100) NOT NULL,
    image_url VARCHAR(500),
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create criteria table to store evaluation criteria
CREATE TABLE IF NOT EXISTS criteria (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    weight DECIMAL(3, 2) NOT NULL DEFAULT 0.20,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create evaluations table to store user evaluations
CREATE TABLE IF NOT EXISTS evaluations (
    id SERIAL PRIMARY KEY,
    session_id VARCHAR(255) NOT NULL,
    shoe_id INTEGER REFERENCES shoes(id),
    color_score DECIMAL(3, 2) DEFAULT 0,
    material_score DECIMAL(3, 2) DEFAULT 0,
    price_score DECIMAL(3, 2) DEFAULT 0,
    brand_score DECIMAL(3, 2) DEFAULT 0,
    occasion_score DECIMAL(3, 2) DEFAULT 0,
    total_score DECIMAL(5, 2) DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create user_preferences table to store user criteria preferences
CREATE TABLE IF NOT EXISTS user_preferences (
    id SERIAL PRIMARY KEY,
    session_id VARCHAR(255) NOT NULL,
    preferred_colors TEXT[], -- Array of preferred colors
    preferred_materials TEXT[], -- Array of preferred materials
    min_price DECIMAL(10, 2),
    max_price DECIMAL(10, 2),
    preferred_brands TEXT[], -- Array of preferred brands
    preferred_occasions TEXT[], -- Array of preferred occasions
    color_weight DECIMAL(3, 2) DEFAULT 0.20,
    material_weight DECIMAL(3, 2) DEFAULT 0.20,
    price_weight DECIMAL(3, 2) DEFAULT 0.20,
    brand_weight DECIMAL(3, 2) DEFAULT 0.20,
    occasion_weight DECIMAL(3, 2) DEFAULT 0.20,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert default criteria
INSERT INTO criteria (name, weight, description) VALUES
('Color', 0.20, 'Warna sepatu sesuai preferensi'),
('Material', 0.20, 'Bahan sepatu (kulit, kanvas, sintetis, dll)'),
('Price', 0.20, 'Harga sepatu sesuai budget'),
('Brand', 0.20, 'Merek sepatu'),
('Occasion', 0.20, 'Kesempatan penggunaan (formal, casual, sport, dll)')
ON CONFLICT DO NOTHING;
