-- Seeding sample shoe data for SPK system
INSERT INTO shoes (name, brand, color, material, price, occasion, image_url, description) VALUES
-- Nike shoes
('Air Force 1', 'Nike', 'White', 'Leather', 1299000, 'Casual', '/placeholder.svg?height=300&width=300', 'Sepatu klasik Nike dengan desain ikonik dan kenyamanan maksimal'),
('Air Max 90', 'Nike', 'Black', 'Mesh', 1599000, 'Sport', '/placeholder.svg?height=300&width=300', 'Sepatu lari dengan teknologi Air Max untuk performa optimal'),
('Blazer Mid', 'Nike', 'Navy', 'Suede', 1399000, 'Casual', '/placeholder.svg?height=300&width=300', 'Sepatu vintage dengan gaya retro yang timeless'),

-- Adidas shoes
('Stan Smith', 'Adidas', 'White', 'Leather', 1199000, 'Casual', '/placeholder.svg?height=300&width=300', 'Sepatu tenis klasik dengan desain minimalis'),
('Ultraboost 22', 'Adidas', 'Black', 'Primeknit', 2299000, 'Sport', '/placeholder.svg?height=300&width=300', 'Sepatu lari premium dengan teknologi Boost'),
('Gazelle', 'Adidas', 'Blue', 'Suede', 1099000, 'Casual', '/placeholder.svg?height=300&width=300', 'Sepatu retro dengan gaya vintage yang autentik'),

-- Converse shoes
('Chuck Taylor All Star', 'Converse', 'Red', 'Canvas', 699000, 'Casual', '/placeholder.svg?height=300&width=300', 'Sepatu kanvas klasik dengan desain ikonik'),
('Chuck 70', 'Converse', 'Black', 'Canvas', 899000, 'Casual', '/placeholder.svg?height=300&width=300', 'Versi premium dari Chuck Taylor dengan detail vintage'),

-- Vans shoes
('Old Skool', 'Vans', 'Black', 'Canvas', 799000, 'Casual', '/placeholder.svg?height=300&width=300', 'Sepatu skate klasik dengan stripe samping yang ikonik'),
('Authentic', 'Vans', 'White', 'Canvas', 699000, 'Casual', '/placeholder.svg?height=300&width=300', 'Sepatu kanvas sederhana dengan desain timeless'),

-- Formal shoes
('Oxford Classic', 'Clarks', 'Brown', 'Leather', 1899000, 'Formal', '/placeholder.svg?height=300&width=300', 'Sepatu formal klasik untuk acara resmi'),
('Derby Shoes', 'Clarks', 'Black', 'Leather', 1799000, 'Formal', '/placeholder.svg?height=300&width=300', 'Sepatu bisnis dengan desain elegan dan nyaman'),

-- Casual/lifestyle
('Desert Boot', 'Clarks', 'Tan', 'Suede', 1599000, 'Casual', '/placeholder.svg?height=300&width=300', 'Sepatu boot kasual dengan gaya desert yang klasik'),
('Slip-On Classic', 'Vans', 'Navy', 'Canvas', 649000, 'Casual', '/placeholder.svg?height=300&width=300', 'Sepatu tanpa tali yang praktis dan stylish'),

-- Sport/running
('React Infinity', 'Nike', 'Gray', 'Mesh', 1899000, 'Sport', '/placeholder.svg?height=300&width=300', 'Sepatu lari dengan teknologi React untuk kenyamanan maksimal'),
('NMD R1', 'Adidas', 'White', 'Primeknit', 1799000, 'Sport', '/placeholder.svg?height=300&width=300', 'Sepatu lifestyle dengan teknologi Boost yang responsif')
ON CONFLICT DO NOTHING;
