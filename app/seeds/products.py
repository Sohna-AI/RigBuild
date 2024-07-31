from app.models import db, Product, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_products():
    
    products = [
        {
            'name': 'GeForce RTX 3080',
            'description': 'Graphics card with ray-tracing',
            'price': 699.99,
            'stock_quantity': 10,
            'category_id': 1,
            'user_id': 1
        },
        {
            'name': 'Radeon RX 6800 XT',
            'description': 'High-performance graphics card',
            'price': 649.99,
            'stock_quantity': 8,
            'category_id': 1,
            'user_id': 1
        },
        {
            'name': 'GeForce RTX 3070',
            'description': 'Graphics card with excellent performance for 1440p gaming',
            'price': 499.99,
            'stock_quantity': 12,
            'category_id': 1,
            'user_id': 1
        },
        {
            'name': 'Radeon RX 6700 XT',
            'description': 'Mid-range graphics card for 1440p gaming',
            'price': 479.99,
            'stock_quantity': 15,
            'category_id': 1,
            'user_id': 1
        },
        {
            'name': 'Intel Core i9-11900K',
            'description': 'High-performance CPU for gaming and productivity',
            'price': 539.99,
            'stock_quantity': 15,
            'category_id': 2,
            'user_id': 2
        },
        {
            'name': 'AMD Ryzen 9 5900X',
            'description': '12-core processor for unparalleled gaming performance',
            'price': 499.99,
            'stock_quantity': 12,
            'category_id': 2,
            'user_id': 2
        },
        {
            'name': 'Intel Core i7-11700K',
            'description': '8-core CPU for gaming and productivity',
            'price': 399.99,
            'stock_quantity': 20,
            'category_id': 2,
            'user_id': 2
        },
        {
            'name': 'AMD Ryzen 7 5800X',
            'description': '8-core processor for high performance in games and applications',
            'price': 449.99,
            'stock_quantity': 18,
            'category_id': 2,
            'user_id': 2
        },
        {
            'name': 'Corsair Vengeance LPX 16GB',
            'description': 'High-performance DDR4 RAM',
            'price': 89.99,
            'stock_quantity': 20,
            'category_id': 3,
            'user_id': 1
        },
        {
            'name': 'G.Skill Trident Z RGB 32GB',
            'description': 'RGB DDR4 RAM for high-speed performance',
            'price': 159.99,
            'stock_quantity': 15,
            'category_id': 3,
            'user_id': 1
        },
        {
            'name': 'Kingston HyperX Fury 16GB',
            'description': 'High-speed DDR4 RAM for gaming and productivity',
            'price': 79.99,
            'stock_quantity': 25,
            'category_id': 3,
            'user_id': 1
        },
        {
            'name': 'Crucial Ballistix 32GB',
            'description': 'High-performance DDR4 RAM for gaming and content creation',
            'price': 149.99,
            'stock_quantity': 20,
            'category_id': 3,
            'user_id': 1
        },
        {
            'name': 'Samsung 970 Evo 1TB',
            'description': 'NVMe SSD with fast read/write speeds',
            'price': 149.99,
            'stock_quantity': 25,
            'category_id': 4,
            'user_id': 1
        },
        {
            'name': 'Western Digital Blue 2TB',
            'description': 'Reliable and affordable HDD',
            'price': 54.99,
            'stock_quantity': 30,
            'category_id': 4,
            'user_id': 1
        },
        {
            'name': 'Crucial MX500 1TB',
            'description': 'SATA SSD with great performance and reliability',
            'price': 99.99,
            'stock_quantity': 40,
            'category_id': 4,
            'user_id': 3
        },
        {
            'name': 'Seagate Barracuda 4TB',
            'description': 'High-capacity HDD for storage needs',
            'price': 94.99,
            'stock_quantity': 35,
            'category_id': 4,
            'user_id': 3
        },
        {
            'name': 'ASUS ROG Strix Z590-E',
            'description': 'High-performance motherboard for gaming',
            'price': 329.99,
            'stock_quantity': 10,
            'category_id': 5,
            'user_id': 1
        },
        {
            'name': 'MSI MPG B550 Gaming Edge',
            'description': 'Motherboard with Wi-Fi 6 and robust power delivery',
            'price': 189.99,
            'stock_quantity': 12,
            'category_id': 5,
            'user_id': 1
        },
        {
            'name': 'Gigabyte Z490 AORUS Master',
            'description': 'High-end motherboard with advanced features',
            'price': 379.99,
            'stock_quantity': 8,
            'category_id': 5,
            'user_id': 3
        },
        {
            'name': 'ASRock B450M Pro4',
            'description': 'Affordable motherboard with great features for gaming',
            'price': 84.99,
            'stock_quantity': 20,
            'category_id': 5,
            'user_id': 1
        },
        {
            'name': 'Cooler Master Hyper 212',
            'description': 'Affordable and efficient CPU cooler',
            'price': 39.99,
            'stock_quantity': 20,
            'category_id': 6,
            'user_id': 2
        },
        {
            'name': 'NZXT Kraken X63',
            'description': 'High-performance liquid cooler with RGB',
            'price': 149.99,
            'stock_quantity': 10,
            'category_id': 6,
            'user_id': 2
        },
        {
            'name': 'Corsair H100i RGB Platinum',
            'description': 'High-performance liquid cooler with vibrant RGB lighting',
            'price': 159.99,
            'stock_quantity': 12,
            'category_id': 6,
            'user_id': 2
        },
        {
            'name': 'Noctua NH-D15',
            'description': 'Premium CPU cooler with exceptional performance',
            'price': 89.99,
            'stock_quantity': 15,
            'category_id': 6,
            'user_id': 2
        },
        {
            'name': 'NZXT H510',
            'description': 'Compact mid-tower ATX case',
            'price': 79.99,
            'stock_quantity': 15,
            'category_id': 7,
            'user_id': 1
        },
        {
            'name': 'Corsair iCUE 4000X',
            'description': 'Mid-tower ATX case with tempered glass',
            'price': 129.99,
            'stock_quantity': 10,
            'category_id': 7,
            'user_id': 1
        },
        {
            'name': 'Fractal Design Meshify C',
            'description': 'Mid-tower case with high airflow and sleek design',
            'price': 89.99,
            'stock_quantity': 12,
            'category_id': 7,
            'user_id': 2
        },
        {
            'name': 'Phanteks Eclipse P400A',
            'description': 'High-airflow mid-tower case with RGB lighting',
            'price': 94.99,
            'stock_quantity': 14,
            'category_id': 7,
            'user_id': 3
        },
        {
            'name': 'Dell UltraSharp U2720Q',
            'description': '27-inch 4K monitor for professional use',
            'price': 539.99,
            'stock_quantity': 8,
            'category_id': 8,
            'user_id': 1
        },
        {
            'name': 'ASUS TUF Gaming VG27AQ',
            'description': '27-inch gaming monitor with 165Hz refresh rate',
            'price': 429.99,
            'stock_quantity': 10,
            'category_id': 8,
            'user_id': 1
        },
        {
            'name': 'LG UltraGear 27GN950-B',
            'description': '27-inch 4K gaming monitor with 144Hz refresh rate',
            'price': 799.99,
            'stock_quantity': 5,
            'category_id': 8,
            'user_id': 2
        },
        {
            'name': 'Acer Predator X34',
            'description': '34-inch curved ultrawide gaming monitor',
            'price': 999.99,
            'stock_quantity': 6,
            'category_id': 8,
            'user_id': 3
        }
    ]
    
    for product_data in products:
        product = Product(
            name=product_data['name'],
            description=product_data['description'],
            price=product_data['price'],
            stock_quantity=product_data['stock_quantity'],
            category_id=product_data['category_id'],
            user_id=product_data['user_id']
        )
        db.session.add(product)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_products():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.products RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM products"))
        
    db.session.commit()
