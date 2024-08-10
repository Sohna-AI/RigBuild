from app.models import db, Review, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_reviews():
    reviews = [
        {
        "user_id": 1,
        "product_id": 5,
        "rating": 5,
        "review": "High-performance CPU for gaming and productivity. Handles multitasking with ease."
        },
        {
        "user_id": 1,
        "product_id": 21,
        "rating": 3,
        "review": "Very compact CPU cooler. Runs a bit loud during demanding games. "
        },
        {
        "user_id": 1,
        "product_id": 36,
        "rating": 4,
        "review": "Very nice and powerful PSU, came with all the necessary cables. Very good for mid-end gaming."
        },
        {
        "user_id": 1,
        "product_id": 28,
        "rating": 5,
        "review": "Awesome case for the price. The airflow is great thorughout the case."
        },
        {
        "user_id": 2,
        "product_id": 1,
        "rating": 5,
        "review": "Incredible performance, perfect for high-end gaming and demanding applications. The Ampere architecture truly shines."
        },
        {
        "user_id": 3,
        "product_id": 1,
        "rating": 5,
        "review": "Amazing gaming experience with excellent ray tracing capabilities. Worth the price for any serious gamer."
        },
        {
        "user_id": 4,
        "product_id": 1,
        "rating": 4,
        "review": "A game-changer in graphics performance. Handles everything I throw at it with ease."
        },
        {
        "user_id": 5,
        "product_id": 1,
        "rating": 3,
        "review": "Stunning visuals and great value for the performance. Highly recommend for enthusiasts."
        },
        {
        "user_id": 6,
        "product_id": 1,
        "rating": 2,
        "review": "Good performance but had some issues with compatibility."
        },
        {
        "user_id": 7,
        "product_id": 2,
        "rating": 5,
        "review": "Great alternative to NVIDIA cards. Performs exceptionally well in all modern games. Highly recommended."
        },
        {
        "user_id": 8,
        "product_id": 2,
        "rating": 4,
        "review": "Solid performance and great value. DirectX 12 Ultimate support is a big plus."
        },
        {
        "user_id": 9,
        "product_id": 2,
        "rating": 4,
        "review": "Impressive performance and good price point. Runs games smoothly at high settings."
        },
        {
        "user_id": 10,
        "product_id": 2,
        "rating": 5,
        "review": "Amazing graphics card with excellent features and performance."
        },
        {
        "user_id": 11,
        "product_id": 2,
        "rating": 3,
        "review": "Very happy with this purchase. The card handles everything from gaming to video editing flawlessly."
        },
        {
        "user_id": 12,
        "product_id": 3,
        "rating": 5,
        "review": "Excellent value for money. Provides high-end performance at a more affordable price."
        },
        {
        "user_id": 13,
        "product_id": 3,
        "rating": 5,
        "review": "Perfect for 1440p gaming. The 3070 delivers smooth performance across all games."
        },
        {
        "user_id": 14,
        "product_id": 3,
        "rating": 4,
        "review": "A fantastic card for gamers on a budget. Great performance for the price."
        },
        {
        "user_id": 15,
        "product_id": 3,
        "rating": 3,
        "review": "Decent performance but had some minor issues."
        },
        {
        "user_id": 16,
        "product_id": 3,
        "rating": 5,
        "review": "Exceptional performance for the price. Highly recommended for anyone looking to upgrade."
        },
        {
        "user_id": 17,
        "product_id": 4,
        "rating": 5,
        "review": "Fantastic mid-range card. Runs all games smoothly and supports DirectX 12 Ultimate."
        },
        {
        "user_id": 18,
        "product_id": 4,
        "rating": 4,
        "review": "Great performance for the price. Handles 1440p gaming very well."
        },
        {
        "user_id": 19,
        "product_id": 4,
        "rating": 4,
        "review": "A solid choice for gamers. Offers good performance without breaking the bank."
        },
        {
        "user_id": 20,
        "product_id": 4,
        "rating": 3,
        "review": "Runs cool and quiet, but had some driver issues."
        },
        {
        "user_id": 21,
        "product_id": 4,
        "rating": 5,
        "review": "Excellent graphics card for the price. Highly recommend for budget-conscious gamers."
        },
        {
        "user_id": 22,
        "product_id": 5,
        "rating": 5,
        "review": "High-performance CPU for gaming and productivity. Handles multitasking with ease."
        },
        {
        "user_id": 23,
        "product_id": 5,
        "rating": 5,
        "review": "Blazing fast and great for gaming. Boosts up to 5.3 GHz effortlessly."
        },
        {
        "user_id": 24,
        "product_id": 5,
        "rating": 4,
        "review": "Excellent CPU for high-end builds. Perfect for gaming and heavy workloads."
        },
        {
        "user_id": 25,
        "product_id": 5,
        "rating": 3,
        "review": "A beast of a processor, but runs hot under load."
        },
        {
        "user_id": 26,
        "product_id": 5,
        "rating": 4,
        "review": "Great performance, but a bit pricey. Worth it for serious users."
        },
        {
        "user_id": 27,
        "product_id": 6,
        "rating": 5,
        "review": "12-core powerhouse. Handles everything from gaming to video editing effortlessly."
        },
        {
        "user_id": 28,
        "product_id": 6,
        "rating": 5,
        "review": "Amazing performance, smooth multitasking, and fast processing speeds."
        },
        {
        "user_id": 2,
        "product_id": 6,
        "rating": 4,
        "review": "Great for gaming and content creation, but quite expensive."
        },
        {
        "user_id": 3,
        "product_id": 6,
        "rating": 4,
        "review": "Fantastic CPU, but the cooler could be better."
        },
        {
        "user_id": 4,
        "product_id": 6,
        "rating": 4,
        "review": "Excellent processor for demanding applications. Highly recommend."
        },
        {
        "user_id": 5,
        "product_id": 7,
        "rating": 5,
        "review": "Blazing fast CPU. Great for both gaming and productivity."
        },
        {
        "user_id": 6,
        "product_id": 7,
        "rating": 5,
        "review": "Handles everything I throw at it. Fantastic performance."
        },
        {
        "user_id": 7,
        "product_id": 7,
        "rating": 4,
        "review": "Solid processor with good multitasking capabilities."
        },
        {
        "user_id": 8,
        "product_id": 7,
        "rating": 4,
        "review": "Great performance, but runs a bit hot."
        },
        {
        "user_id": 9,
        "product_id": 7,
        "rating": 3,
        "review": "Good CPU but expected better cooling efficiency."
        },
        {
        "user_id": 10,
        "product_id": 8,
        "rating": 5,
        "review": "High-performance processor with great features. Highly recommended."
        },
        {
        "user_id": 11,
        "product_id": 8,
        "rating": 5,
        "review": "Amazing CPU, perfect for gaming and content creation."
        },
        {
        "user_id": 12,
        "product_id": 8,
        "rating": 4,
        "review": "Great performance for the price. Handles all tasks smoothly."
        },
        {
        "user_id": 13,
        "product_id": 8,
        "rating": 4,
        "review": "Good value for money. Performs well in all scenarios."
        },
        {
        "user_id": 14,
        "product_id": 8,
        "rating": 3,
        "review": "Decent performance, but had some issues with installation."
        },
        {
        "user_id": 15,
        "product_id": 9,
        "rating": 5,
        "review": "High-performance DDR4 RAM. Excellent for gaming and productivity."
        },
        {
        "user_id": 16,
        "product_id": 9,
        "rating": 5,
        "review": "Great RAM, runs smoothly at high speeds."
        },
        {
        "user_id": 17,
        "product_id": 9,
        "rating": 4,
        "review": "Solid performance and good value for the price."
        },
        {
        "user_id": 18,
        "product_id": 9,
        "rating": 3,
        "review": "Good RAM but had some stability issues initially."
        },
        {
        "user_id": 19,
        "product_id": 9,
        "rating": 4,
        "review": "Reliable and fast. Perfect for my gaming setup."
        },
        {
        "user_id": 20,
        "product_id": 10,
        "rating": 5,
        "review": "RGB DDR4 RAM with excellent performance and stunning looks."
        },
        {
        "user_id": 21,
        "product_id": 10,
        "rating": 5,
        "review": "Great RAM for high-speed performance. RGB lighting looks amazing."
        },
        {
        "user_id": 22,
        "product_id": 10,
        "rating": 4,
        "review": "Good performance, but the RGB software is a bit buggy."
        },
        {
        "user_id": 23,
        "product_id": 10,
        "rating": 4,
        "review": "Solid RAM with good speed. RGB effects are a nice touch."
        },
        {
        "user_id": 24,
        "product_id": 10,
        "rating": 3,
        "review": "Decent performance but a bit pricey for the features."
        },
        {
        "user_id": 25,
        "product_id": 11,
        "rating": 5,
        "review": "High-speed DDR4 RAM for gaming and productivity. Works flawlessly."
        },
        {
        "user_id": 26,
        "product_id": 11,
        "rating": 4,
        "review": "Good RAM for the price. Reliable and fast."
        },
        {
        "user_id": 27,
        "product_id": 11,
        "rating": 4,
        "review": "Solid performance, but the design could be better."
        },
        {
        "user_id": 28,
        "product_id": 11,
        "rating": 3,
        "review": "Decent RAM but had some compatibility issues."
        },
        {
        "user_id": 2,
        "product_id": 11,
        "rating": 4,
        "review": "Reliable and performs well. Good value for money."
        },
        {
        "user_id": 3,
        "product_id": 12,
        "rating": 5,
        "review": "High-performance DDR4 RAM for gaming and content creation. Highly recommended."
        },
        {
        "user_id": 4,
        "product_id": 12,
        "rating": 5,
        "review": "Amazing performance and reliable. Perfect for my setup."
        },
        {
        "user_id": 5,
        "product_id": 12,
        "rating": 4,
        "review": "Great RAM but a bit expensive."
        },
        {
        "user_id": 6,
        "product_id": 12,
        "rating": 4,
        "review": "Solid performance and good value. Works well in my system."
        },
        {
        "user_id": 7,
        "product_id": 12,
        "rating": 3,
        "review": "Good RAM but had some minor issues with installation."
        },
        {
        "user_id": 8,
        "product_id": 13,
        "rating": 5,
        "review": "NVMe SSD with fast read/write speeds. Excellent for gaming and productivity."
        },
        {
        "user_id": 9,
        "product_id": 13,
        "rating": 4,
        "review": "Great SSD, but a bit pricey."
        },
        {
        "user_id": 10,
        "product_id": 13,
        "rating": 5,
        "review": "Amazing performance and fast load times. Highly recommend."
        },
        {
        "user_id": 11,
        "product_id": 13,
        "rating": 4,
        "review": "Solid performance and reliable. Good value for money."
        },
        {
        "user_id": 12,
        "product_id": 13,
        "rating": 3,
        "review": "Decent SSD but had some initial setup issues."
        },
        {
        "user_id": 13,
        "product_id": 14,
        "rating": 5,
        "review": "Reliable and affordable HDD. Perfect for storage needs."
        },
        {
        "user_id": 14,
        "product_id": 14,
        "rating": 4,
        "review": "Good HDD with decent speed. Great for backups."
        },
        {
        "user_id": 15,
        "product_id": 14,
        "rating": 4,
        "review": "Solid performance and good value for the price."
        },
        {
        "user_id": 16,
        "product_id": 14,
        "rating": 3,
        "review": "Decent performance but a bit noisy."
        },
        {
        "user_id": 17,
        "product_id": 14,
        "rating": 3,
        "review": "Good HDD but had some reliability issues."
        },
        {
        "user_id": 18,
        "product_id": 15,
        "rating": 5,
        "review": "SATA SSD with great performance and reliability. Highly recommend."
        },
        {
        "user_id": 19,
        "product_id": 15,
        "rating": 4,
        "review": "Great SSD for the price. Works flawlessly."
        },
        {
        "user_id": 20,
        "product_id": 15,
        "rating": 4,
        "review": "Solid performance and good value. Perfect for my needs."
        },
        {
        "user_id": 21,
        "product_id": 15,
        "rating": 3,
        "review": "Good SSD but had some compatibility issues."
        },
        {
        "user_id": 22,
        "product_id": 15,
        "rating": 3,
        "review": "Decent performance but not the fastest."
        },
        {
        "user_id": 23,
        "product_id": 16,
        "rating": 5,
        "review": "High-capacity HDD for storage needs. Works perfectly."
        },
        {
        "user_id": 24,
        "product_id": 16,
        "rating": 4,
        "review": "Great HDD for backups and large files. Reliable and fast."
        },
        {
        "user_id": 25,
        "product_id": 16,
        "rating": 4,
        "review": "Solid performance and good value for the price."
        },
        {
        "user_id": 26,
        "product_id": 16,
        "rating": 3,
        "review": "Good HDD but had some noise issues."
        },
        {
        "user_id": 27,
        "product_id": 16,
        "rating": 3,
        "review": "Decent performance but not the fastest."
        },
        {
        "user_id": 28,
        "product_id": 17,
        "rating": 5,
        "review": "High-performance motherboard for gaming. Highly recommend."
        },
        {
        "user_id": 2,
        "product_id": 17,
        "rating": 4,
        "review": "Great motherboard with excellent features. Perfect for gaming."
        },
        {
        "user_id": 3,
        "product_id": 17,
        "rating": 4,
        "review": "Solid performance and good value for the price."
        },
        {
        "user_id": 4,
        "product_id": 17,
        "rating": 3,
        "review": "Good motherboard but had some compatibility issues."
        },
        {
        "user_id": 5,
        "product_id": 17,
        "rating": 3,
        "review": "Decent performance but not the best for overclocking."
        },
        {
        "user_id": 6,
        "product_id": 18,
        "rating": 5,
        "review": "Motherboard with Wi-Fi 6 and robust power delivery. Highly recommend."
        },
        {
        "user_id": 7,
        "product_id": 18,
        "rating": 4,
        "review": "Great motherboard for gaming. Solid performance and good features."
        },
        {
        "user_id": 8,
        "product_id": 18,
        "rating": 4,
        "review": "Good value for money. Performs well in all scenarios."
        },
        {
        "user_id": 9,
        "product_id": 18,
        "rating": 3,
        "review": "Decent performance but had some stability issues."
        },
        {
        "user_id": 10,
        "product_id": 18,
        "rating": 3,
        "review": "Good motherboard but could be better in terms of features."
        },
        {
        "user_id": 11,
        "product_id": 19,
        "rating": 5,
        "review": "High-end motherboard with advanced features. Perfect for high-end builds."
        },
        {
        "user_id": 12,
        "product_id": 19,
        "rating": 4,
        "review": "Solid performance and great value for the price."
        },
        {
        "user_id": 13,
        "product_id": 19,
        "rating": 4,
        "review": "Good motherboard with excellent features. Highly recommend."
        },
        {
        "user_id": 14,
        "product_id": 19,
        "rating": 3,
        "review": "Decent performance but had some compatibility issues."
        },
        {
        "user_id": 15,
        "product_id": 19,
        "rating": 3,
        "review": "Good motherboard but not the best for overclocking."
        },
        {
        "user_id": 16,
        "product_id": 20,
        "rating": 5,
        "review": "Affordable motherboard with great features for gaming. Highly recommend."
        },
        {
        "user_id": 17,
        "product_id": 20,
        "rating": 4,
        "review": "Solid performance and good value for the price."
        },
        {
        "user_id": 18,
        "product_id": 20,
        "rating": 4,
        "review": "Good motherboard with excellent features. Perfect for budget builds."
        },
        {
        "user_id": 19,
        "product_id": 20,
        "rating": 3,
        "review": "Decent performance but had some stability issues."
        },
        {
        "user_id": 20,
        "product_id": 20,
        "rating": 3,
        "review": "Good motherboard but could be better in terms of features."
        },
        {
        "user_id": 21,
        "product_id": 21,
        "rating": 5,
        "review": "Affordable and efficient CPU cooler. Excellent cooling performance."
        },
        {
        "user_id": 22,
        "product_id": 21,
        "rating": 4,
        "review": "Great value for money. Keeps my CPU cool under load."
        },
        {
        "user_id": 23,
        "product_id": 21,
        "rating": 4,
        "review": "Solid performance and easy to install."
        },
        {
        "user_id": 24,
        "product_id": 21,
        "rating": 3,
        "review": "Good cooler but a bit noisy."
        },
        {
        "user_id": 25,
        "product_id": 21,
        "rating": 3,
        "review": "Decent cooling but had some installation issues."
        },
        {
        "user_id": 26,
        "product_id": 22,
        "rating": 5,
        "review": "High-performance liquid cooler with RGB. Looks and works great."
        },
        {
        "user_id": 27,
        "product_id": 22,
        "rating": 4,
        "review": "Excellent cooling performance but a bit expensive."
        },
        {
        "user_id": 28,
        "product_id": 22,
        "rating": 4,
        "review": "Great cooler with impressive RGB lighting."
        },
        {
        "user_id": 2,
        "product_id": 22,
        "rating": 3,
        "review": "Good cooling but the software is buggy."
        },
        {
        "user_id": 3,
        "product_id": 22,
        "rating": 3,
        "review": "Solid performance but had some noise issues."
        },
        {
        "user_id": 4,
        "product_id": 23,
        "rating": 5,
        "review": "High-performance liquid cooler with vibrant RGB lighting. Highly recommend."
        },
        {
        "user_id": 5,
        "product_id": 23,
        "rating": 4,
        "review": "Great cooler with good performance and stunning looks."
        },
        {
        "user_id": 6,
        "product_id": 23,
        "rating": 4,
        "review": "Solid cooling but the price is a bit high."
        },
        {
        "user_id": 7,
        "product_id": 23,
        "rating": 3,
        "review": "Good cooler but had some installation issues."
        },
        {
        "user_id": 8,
        "product_id": 23,
        "rating": 3,
        "review": "Decent performance but the RGB software needs improvement."
        },
        {
        "user_id": 9,
        "product_id": 24,
        "rating": 5,
        "review": "Premium CPU cooler with exceptional performance. Highly recommended."
        },
        {
        "user_id": 10,
        "product_id": 24,
        "rating": 4,
        "review": "Great cooler with impressive cooling capabilities."
        },
        {
        "user_id": 11,
        "product_id": 24,
        "rating": 4,
        "review": "Solid performance but a bit pricey."
        },
        {
        "user_id": 12,
        "product_id": 24,
        "rating": 3,
        "review": "Good cooling but had some compatibility issues."
        },
        {
        "user_id": 13,
        "product_id": 24,
        "rating": 3,
        "review": "Decent performance but not the best for overclocking."
        },
        {
        "user_id": 14,
        "product_id": 25,
        "rating": 5,
        "review": "Compact mid-tower ATX case. Perfect for my build."
        },
        {
        "user_id": 15,
        "product_id": 25,
        "rating": 4,
        "review": "Great case with excellent cable management."
        },
        {
        "user_id": 16,
        "product_id": 25,
        "rating": 4,
        "review": "Solid build quality but the airflow could be better."
        },
        {
        "user_id": 17,
        "product_id": 25,
        "rating": 3,
        "review": "Good case but had some issues with the front panel."
        },
        {
        "user_id": 18,
        "product_id": 25,
        "rating": 3,
        "review": "Decent case but the cooling options are limited."
        },
        {
        "user_id": 19,
        "product_id": 26,
        "rating": 5,
        "review": "Mid-tower ATX case with tempered glass. Looks and works great."
        },
        {
        "user_id": 20,
        "product_id": 26,
        "rating": 4,
        "review": "Excellent case with good airflow and cable management."
        },
        {
        "user_id": 21,
        "product_id": 26,
        "rating": 4,
        "review": "Solid build quality but a bit pricey."
        },
        {
        "user_id": 22,
        "product_id": 26,
        "rating": 3,
        "review": "Good case but had some issues with the RGB lighting."
        },
        {
        "user_id": 23,
        "product_id": 26,
        "rating": 3,
        "review": "Decent case but the front panel connectors are flimsy."
        },
        {
        "user_id": 24,
        "product_id": 27,
        "rating": 5,
        "review": "Mid-tower case with high airflow and sleek design. Highly recommend."
        },
        {
        "user_id": 25,
        "product_id": 27,
        "rating": 4,
        "review": "Great case with excellent cooling options."
        },
        {
        "user_id": 26,
        "product_id": 27,
        "rating": 4,
        "review": "Solid build quality but the mesh panel is a bit delicate."
        },
        {
        "user_id": 27,
        "product_id": 27,
        "rating": 3,
        "review": "Good case but had some issues with the side panel."
        },
        {
        "user_id": 28,
        "product_id": 27,
        "rating": 3,
        "review": "Decent case but the cooling options are limited."
        },
        {
        "user_id": 2,
        "product_id": 28,
        "rating": 5,
        "review": "High-airflow mid-tower case with RGB lighting. Looks and works great."
        },
        {
        "user_id": 3,
        "product_id": 28,
        "rating": 4,
        "review": "Excellent case with good airflow and cable management."
        },
        {
        "user_id": 4,
        "product_id": 28,
        "rating": 4,
        "review": "Solid build quality but a bit pricey."
        },
        {
        "user_id": 5,
        "product_id": 28,
        "rating": 3,
        "review": "Good case but had some issues with the RGB lighting."
        },
        {
        "user_id": 6,
        "product_id": 28,
        "rating": 3,
        "review": "Decent case but the front panel connectors are flimsy."
        },
        {
        "user_id": 7,
        "product_id": 29,
        "rating": 5,
        "review": "27-inch 4K monitor for professional use. Highly recommend."
        },
        {
        "user_id": 8,
        "product_id": 29,
        "rating": 4,
        "review": "Great monitor with excellent color accuracy."
        },
        {
        "user_id": 9,
        "product_id": 29,
        "rating": 4,
        "review": "Solid performance but the price is a bit high."
        },
        {
        "user_id": 10,
        "product_id": 29,
        "rating": 3,
        "review": "Good monitor but had some issues with the stand."
        },
        {
        "user_id": 11,
        "product_id": 29,
        "rating": 3,
        "review": "Decent monitor but the HDR performance could be better."
        },
        {
        "user_id": 12,
        "product_id": 30,
        "rating": 5,
        "review": "27-inch gaming monitor with 165Hz refresh rate. Perfect for gaming."
        },
        {
        "user_id": 13,
        "product_id": 30,
        "rating": 4,
        "review": "Excellent monitor with great features for gamers."
        },
        {
        "user_id": 14,
        "product_id": 30,
        "rating": 4,
        "review": "Solid performance but the price is a bit high."
        },
        {
        "user_id": 15,
        "product_id": 30,
        "rating": 3,
        "review": "Good monitor but had some issues with ghosting."
        },
        {
        "user_id": 16,
        "product_id": 30,
        "rating": 3,
        "review": "Decent monitor but the stand could be better."
        },
        {
        "user_id": 17,
        "product_id": 31,
        "rating": 5,
        "review": "27-inch 4K gaming monitor with 144Hz refresh rate. Highly recommend."
        },
        {
        "user_id": 18,
        "product_id": 31,
        "rating": 4,
        "review": "Great monitor with excellent color accuracy and refresh rate."
        },
        {
        "user_id": 19,
        "product_id": 31,
        "rating": 4,
        "review": "Solid performance but the price is a bit high."
        },
        {
        "user_id": 20,
        "product_id": 31,
        "rating": 3,
        "review": "Good monitor but had some issues with backlight bleeding."
        },
        {
        "user_id": 21,
        "product_id": 31,
        "rating": 3,
        "review": "Decent monitor but the HDR performance could be better."
        },
        {
        "user_id": 22,
        "product_id": 32,
        "rating": 5,
        "review": "34-inch curved ultrawide gaming monitor. Perfect for immersive gaming."
        },
        {
        "user_id": 23,
        "product_id": 32,
        "rating": 4,
        "review": "Excellent monitor with great features for gamers."
        },
        {
        "user_id": 24,
        "product_id": 32,
        "rating": 4,
        "review": "Solid performance but the price is a bit high."
        },
        {
        "user_id": 25,
        "product_id": 32,
        "rating": 3,
        "review": "Good monitor but had some issues with ghosting."
        },
        {
        "user_id": 26,
        "product_id": 32,
        "rating": 3,
        "review": "Decent monitor but the stand could be better."
        },
        {
        "user_id": 27,
        "product_id": 33,
        "rating": 5,
        "review": "High-quality power supply unit. Reliable and efficient."
        },
        {
        "user_id": 28,
        "product_id": 33,
        "rating": 4,
        "review": "Great PSU with solid performance. Quiet and efficient."
        },
        {
        "user_id": 2,
        "product_id": 33,
        "rating": 4,
        "review": "Solid power supply but a bit expensive."
        },
        {
        "user_id": 3,
        "product_id": 33,
        "rating": 3,
        "review": "Good PSU but had some installation issues."
        },
        {
        "user_id": 4,
        "product_id": 33,
        "rating": 3,
        "review": "Decent performance but not the best for high-end builds."
        },
        {
        "user_id": 5,
        "product_id": 34,
        "rating": 5,
        "review": "Reliable power supply unit with good performance. Highly recommend."
        },
        {
        "user_id": 6,
        "product_id": 34,
        "rating": 4,
        "review": "Great PSU with solid performance. Quiet and efficient."
        },
        {
        "user_id": 7,
        "product_id": 34,
        "rating": 4,
        "review": "Solid power supply but a bit expensive."
        },
        {
        "user_id": 8,
        "product_id": 34,
        "rating": 3,
        "review": "Good PSU but had some installation issues."
        },
        {
        "user_id": 9,
        "product_id": 34,
        "rating": 3,
        "review": "Decent performance but not the best for high-end builds."
        },
        {
        "user_id": 10,
        "product_id": 35,
        "rating": 5,
        "review": "Perfect blend of performance and value. Highly recommend."
        },
        {
        "user_id": 11,
        "product_id": 35,
        "rating": 4,
        "review": "Great PSU for the price. Reliable and efficient."
        },
        {
        "user_id": 12,
        "product_id": 35,
        "rating": 4,
        "review": "Solid performance but a bit noisy."
        },
        {
        "user_id": 13,
        "product_id": 35,
        "rating": 3,
        "review": "Good PSU but had some installation issues."
        },
        {
        "user_id": 14,
        "product_id": 35,
        "rating": 3,
        "review": "Decent performance but not the best for high-end builds."
        },
        {
        "user_id": 15,
        "product_id": 36,
        "rating": 5,
        "review": "High-efficiency power supply unit. Quiet and reliable."
        },
        {
        "user_id": 16,
        "product_id": 36,
        "rating": 4,
        "review": "Great PSU for the price. Solid performance."
        },
        {
        "user_id": 17,
        "product_id": 36,
        "rating": 4,
        "review": "Good power supply but had some minor issues."
        },
        {
        "user_id": 18,
        "product_id": 36,
        "rating": 3,
        "review": "Decent PSU but the cables are a bit short."
        },
        {
        "user_id": 19,
        "product_id": 36,
        "rating": 3,
        "review": "Good performance but had some compatibility issues."
        },
        {
        "user_id": 20,
        "product_id": 37,
        "rating": 5,
        "review": "High-performance power supply unit. Highly recommend."
        },
        {
        "user_id": 21,
        "product_id": 37,
        "rating": 4,
        "review": "Great PSU with solid performance. Reliable and efficient."
        },
        {
        "user_id": 22,
        "product_id": 37,
        "rating": 4,
        "review": "Good power supply but a bit pricey."
        },
        {
        "user_id": 23,
        "product_id": 37,
        "rating": 3,
        "review": "Decent PSU but had some installation issues."
        },
        {
        "user_id": 24,
        "product_id": 37,
        "rating": 3,
        "review": "Solid performance but not the best for high-end builds."
        },
        {
        "user_id": 25,
        "product_id": 38,
        "rating": 5,
        "review": "High-performance power supply unit. Reliable and efficient."
        },
        {
        "user_id": 26,
        "product_id": 38,
        "rating": 4,
        "review": "Great PSU with solid performance. Quiet and efficient."
        },
        {
        "user_id": 27,
        "product_id": 38,
        "rating": 4,
        "review": "Solid power supply but a bit expensive."
        },
        {
        "user_id": 28,
        "product_id": 38,
        "rating": 3,
        "review": "Good PSU but had some installation issues."
        },
        {
        "user_id": 2,
        "product_id": 38,
        "rating": 3,
        "review": "Decent performance but not the best for high-end builds."
        }
    ]
    for review in reviews:
        newReview = Review(
            user_id=review['user_id'],
            product_id=review['product_id'],
            rating=review['rating'],
            review=review['review']
        )
        db.session.add(newReview)
    db.session.commit()





# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_reviews():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.reviews RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM reviews"))
        
    db.session.commit()
