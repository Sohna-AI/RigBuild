from app.models import db, ProductImage, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_product_images():
    product_images = [
        {
            'product_id': 1,
            'image_url': 'https://rigbuild-productimages.s3.us-east-2.amazonaws.com/Nvidia-GeForce-RTX-3080.jpg',
        },
        {
            'product_id': 2,
            'image_url': 'https://rigbuild-productimages.s3.us-east-2.amazonaws.com/8b05cadf525e4e2a94a91c460603effd.png',
        },
        {
            'product_id': 3,
            'image_url': 'https://rigbuild-productimages.s3.us-east-2.amazonaws.com/Geforce_RTX-3070.jpg',
        },
        {
            'product_id': 4,
            'image_url': 'https://rigbuild-productimages.s3.us-east-2.amazonaws.com/Radeon-RX-6700XT.jpeg',
        },
        {
            'product_id': 5,
            'image_url': 'https://rigbuild-productimages.s3.us-east-2.amazonaws.com/Intel-core-i9-11900K.jpg',
        },
        {
            'product_id': 6,
            'image_url': 'https://rigbuild-productimages.s3.us-east-2.amazonaws.com/AMD-Ryzen-9-5900X.jpg',
        },
        {
            'product_id': 7,
            'image_url': 'https://rigbuild-productimages.s3.us-east-2.amazonaws.com/Intel-core-i7-11700K.jpg',
        },
        {
            'product_id': 8,
            'image_url': 'https://rigbuild-productimages.s3.us-east-2.amazonaws.com/AMD-Ryzen-7-5800X.jpg',
        },
        {
            'product_id': 9,
            'image_url': 'https://rigbuild-productimages.s3.us-east-2.amazonaws.com/Corsair-vengeance-LPX-16GB.jpg',
        },
        {
            'product_id': 10,
            'image_url': 'https://rigbuild-productimages.s3.us-east-2.amazonaws.com/G.Skill-trident-Z-RGB-32GB.jpg',
        },
        {
            'product_id': 11,
            'image_url': 'https://rigbuild-productimages.s3.us-east-2.amazonaws.com/Kingston-HyperX-Fury-16GB.jpg',
        },
        {
            'product_id': 12,
            'image_url': 'https://rigbuild-productimages.s3.us-east-2.amazonaws.com/Crucial-Ballistix-32GB.jpg',
        },
        {
            'product_id': 13,
            'image_url': 'https://rigbuild-productimages.s3.us-east-2.amazonaws.com/SAMSUNG-SSD-970-EVO-1TB.jpg',
        },
        {
            'product_id': 14,
            'image_url': 'https://rigbuild-productimages.s3.us-east-2.amazonaws.com/Western-Digital-2TB-HDD.png',
        },
        {
            'product_id': 15,
            'image_url': 'https://rigbuild-productimages.s3.us-east-2.amazonaws.com/Crucial-MX500-1TB.jpg',
        },
        {
            'product_id': 16,
            'image_url': 'https://rigbuild-productimages.s3.us-east-2.amazonaws.com/Seagate-Barracuda-4TB-HDD.jpg',
        },
        {
            'product_id': 17,
            'image_url': 'https://rigbuild-productimages.s3.us-east-2.amazonaws.com/ASUS-ROG-Strix-Z590-E.jpg',
        },
        {
            'product_id': 18,
            'image_url': 'https://rigbuild-productimages.s3.us-east-2.amazonaws.com/MSI-MPG-B550.jpg',
        },
        {
            'product_id': 19,
            'image_url': 'https://rigbuild-productimages.s3.us-east-2.amazonaws.com/Gigabyte-Z490-AORUS-Master.png',
        },
        {
            'product_id': 20,
            'image_url': 'https://rigbuild-productimages.s3.us-east-2.amazonaws.com/ASRock-B450M-Pro4.jpg',
        },
        {
            'product_id': 21,
            'image_url': 'https://rigbuild-productimages.s3.us-east-2.amazonaws.com/Cooler-Master-Hyper-212.png',
        },
        {
            'product_id': 22,
            'image_url': 'https://rigbuild-productimages.s3.us-east-2.amazonaws.com/NZXT-Kraken-X63.jpg',
        },
        {
            'product_id': 23,
            'image_url': 'https://rigbuild-productimages.s3.us-east-2.amazonaws.com/Corsair-H100i-RGB-Platinum.jpg',
        },
        {
            'product_id': 24,
            'image_url': 'https://rigbuild-productimages.s3.us-east-2.amazonaws.com/Noctua-NH-D15.jpg',
        },
        {
            'product_id': 25,
            'image_url': 'https://rigbuild-productimages.s3.us-east-2.amazonaws.com/NZXT-H510.png',
        },
        {
            'product_id': 26,
            'image_url': 'https://rigbuild-productimages.s3.us-east-2.amazonaws.com/Corsair-iCUE-4000X.jpg',
        },
        {
            'product_id': 27,
            'image_url': 'https://rigbuild-productimages.s3.us-east-2.amazonaws.com/Fractal-Design-Meshify-C.jpg',
        },
        {
            'product_id': 28,
            'image_url': 'https://rigbuild-productimages.s3.us-east-2.amazonaws.com/Phanteks-Eclipse-P400A.jpg',
        },
        {
            'product_id': 29,
            'image_url': 'https://rigbuild-productimages.s3.us-east-2.amazonaws.com/Dell-UltraSharp-U2720Q-27.jpg',
        },
        {
            'product_id': 30,
            'image_url': 'https://rigbuild-productimages.s3.us-east-2.amazonaws.com/ASUS-TUF-Gaming-VG27AQ.png',
        },
        {
            'product_id': 31,
            'image_url': 'https://rigbuild-productimages.s3.us-east-2.amazonaws.com/LG-UltraGear-27GN950-B.jpg',
        },
        {
            'product_id': 32,
            'image_url': 'https://rigbuild-productimages.s3.us-east-2.amazonaws.com/Acer-Predator-X34.jpg',
        },
        {
            'product_id': 33,
            'image_url': 'https://rigbuild-productimages.s3.us-east-2.amazonaws.com/Corsair+CX450.jpg',
        },
        {
            'product_id': 34,
            'image_url': 'https://rigbuild-productimages.s3.us-east-2.amazonaws.com/EVGA+500W1.jpg',
        },
        {
            'product_id': 35,
            'image_url': 'https://rigbuild-productimages.s3.us-east-2.amazonaws.com/Thermaltake+Smart+600W.webp',
        },
        {
            'product_id': 36,
            'image_url': 'https://rigbuild-productimages.s3.us-east-2.amazonaws.com/Cooler+Master+MWE+650W.jpg',
        },
        {
            'product_id': 37,
            'image_url': 'https://rigbuild-productimages.s3.us-east-2.amazonaws.com/Seasonic+S12III+500+SSR-500GB3.webp',
        },
        {
            'product_id': 38,
            'image_url': 'https://rigbuild-productimages.s3.us-east-2.amazonaws.com/Corsair+RM850X.jpg',
        },
        {
            'product_id': 39,
            'image_url': 'https://rigbuild-productimages.s3.us-east-2.amazonaws.com/EVGA+SuperNOVA+850+G5.png',
        }
    ]
    
    for product_image in product_images:
        newImage = ProductImage(
            product_id=product_image['product_id'],
            image_url=product_image['image_url']
        )
        db.session.add(newImage)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_product_images():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.product_images RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM product_images"))
        
    db.session.commit()
