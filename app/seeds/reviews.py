from app.models import db, Review, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_reviews():
    reviews = [
        {
            "user_id": 3,
            "product_id": 1,
            "rating": 1,
            "review": "Review for product 1"
        },
        {
            "user_id": 7,
            "product_id": 1,
            "rating": 4,
            "review": "Review for product 1"
        },
        {
            "user_id": 3,
            "product_id": 1,
            "rating": 1,
            "review": "Review for product 1"
        },
        {
            "user_id": 11,
            "product_id": 1,
            "rating": 1,
            "review": "Review for product 1"
        },
        {
            "user_id": 3,
            "product_id": 1,
            "rating": 4,
            "review": "Review for product 1"
        },
        {
            "user_id": 11,
            "product_id": 2,
            "rating": 5,
            "review": "Review for product 2"
        },
        {
            "user_id": 6,
            "product_id": 2,
            "rating": 5,
            "review": "Review for product 2"
        },
        {
            "user_id": 14,
            "product_id": 2,
            "rating": 2,
            "review": "Review for product 2"
        },
        {
            "user_id": 15,
            "product_id": 2,
            "rating": 1,
            "review": "Review for product 2"
        },
        {
            "user_id": 5,
            "product_id": 2,
            "rating": 4,
            "review": "Review for product 2"
        },
        {
            "user_id": 10,
            "product_id": 3,
            "rating": 5,
            "review": "Review for product 3"
        },
        {
            "user_id": 4,
            "product_id": 3,
            "rating": 5,
            "review": "Review for product 3"
        },
        {
            "user_id": 6,
            "product_id": 3,
            "rating": 2,
            "review": "Review for product 3"
        },
        {
            "user_id": 12,
            "product_id": 3,
            "rating": 1,
            "review": "Review for product 3"
        },
        {
            "user_id": 15,
            "product_id": 3,
            "rating": 2,
            "review": "Review for product 3"
        },
        {
            "user_id": 2,
            "product_id": 4,
            "rating": 1,
            "review": "Review for product 4"
        },
        {
            "user_id": 15,
            "product_id": 4,
            "rating": 3,
            "review": "Review for product 4"
        },
        {
            "user_id": 9,
            "product_id": 4,
            "rating": 3,
            "review": "Review for product 4"
        },
        {
            "user_id": 5,
            "product_id": 4,
            "rating": 5,
            "review": "Review for product 4"
        },
        {
            "user_id": 8,
            "product_id": 4,
            "rating": 4,
            "review": "Review for product 4"
        },
        {
            "user_id": 8,
            "product_id": 5,
            "rating": 5,
            "review": "Review for product 5"
        },
        {
            "user_id": 1,
            "product_id": 5,
            "rating": 3,
            "review": "Review for product 5"
        },
        {
            "user_id": 14,
            "product_id": 5,
            "rating": 3,
            "review": "Review for product 5"
        },
        {
            "user_id": 3,
            "product_id": 5,
            "rating": 2,
            "review": "Review for product 5"
        },
        {
            "user_id": 5,
            "product_id": 5,
            "rating": 1,
            "review": "Review for product 5"
        },
        {
            "user_id": 12,
            "product_id": 6,
            "rating": 1,
            "review": "Review for product 6"
        },
        {
            "user_id": 11,
            "product_id": 6,
            "rating": 3,
            "review": "Review for product 6"
        },
        {
            "user_id": 7,
            "product_id": 6,
            "rating": 3,
            "review": "Review for product 6"
        },
        {
            "user_id": 9,
            "product_id": 6,
            "rating": 5,
            "review": "Review for product 6"
        },
        {
            "user_id": 7,
            "product_id": 6,
            "rating": 3,
            "review": "Review for product 6"
        },
        {
            "user_id": 12,
            "product_id": 7,
            "rating": 5,
            "review": "Review for product 7"
        },
        {
            "user_id": 15,
            "product_id": 7,
            "rating": 3,
            "review": "Review for product 7"
        },
        {
            "user_id": 7,
            "product_id": 7,
            "rating": 5,
            "review": "Review for product 7"
        },
        {
            "user_id": 8,
            "product_id": 7,
            "rating": 1,
            "review": "Review for product 7"
        },
        {
            "user_id": 9,
            "product_id": 7,
            "rating": 2,
            "review": "Review for product 7"
        },
        {
            "user_id": 10,
            "product_id": 8,
            "rating": 4,
            "review": "Review for product 8"
        },
        {
            "user_id": 15,
            "product_id": 8,
            "rating": 3,
            "review": "Review for product 8"
        },
        {
            "user_id": 12,
            "product_id": 8,
            "rating": 1,
            "review": "Review for product 8"
        },
        {
            "user_id": 6,
            "product_id": 8,
            "rating": 1,
            "review": "Review for product 8"
        },
        {
            "user_id": 10,
            "product_id": 8,
            "rating": 4,
            "review": "Review for product 8"
        },
        {
            "user_id": 2,
            "product_id": 9,
            "rating": 4,
            "review": "Review for product 9"
        },
        {
            "user_id": 3,
            "product_id": 9,
            "rating": 3,
            "review": "Review for product 9"
        },
        {
            "user_id": 4,
            "product_id": 9,
            "rating": 2,
            "review": "Review for product 9"
        },
        {
            "user_id": 13,
            "product_id": 9,
            "rating": 4,
            "review": "Review for product 9"
        },
        {
            "user_id": 10,
            "product_id": 9,
            "rating": 5,
            "review": "Review for product 9"
        },
        {
            "user_id": 6,
            "product_id": 10,
            "rating": 3,
            "review": "Review for product 10"
        },
        {
            "user_id": 2,
            "product_id": 10,
            "rating": 2,
            "review": "Review for product 10"
        },
        {
            "user_id": 13,
            "product_id": 10,
            "rating": 5,
            "review": "Review for product 10"
        },
        {
            "user_id": 6,
            "product_id": 10,
            "rating": 1,
            "review": "Review for product 10"
        },
        {
            "user_id": 12,
            "product_id": 10,
            "rating": 2,
            "review": "Review for product 10"
        },
        {
            "user_id": 7,
            "product_id": 11,
            "rating": 3,
            "review": "Review for product 11"
        },
        {
            "user_id": 2,
            "product_id": 11,
            "rating": 1,
            "review": "Review for product 11"
        },
        {
            "user_id": 10,
            "product_id": 12,
            "rating": 2,
            "review": "Review for product 12"
        },
        {
            "user_id": 11,
            "product_id": 12,
            "rating": 2,
            "review": "Review for product 12"
        },
        {
            "user_id": 6,
            "product_id": 13,
            "rating": 3,
            "review": "Review for product 13"
        },
        {
            "user_id": 6,
            "product_id": 13,
            "rating": 2,
            "review": "Review for product 13"
        },
        {
            "user_id": 10,
            "product_id": 14,
            "rating": 5,
            "review": "Review for product 14"
        },
        {
            "user_id": 8,
            "product_id": 14,
            "rating": 5,
            "review": "Review for product 14"
        },
        {
            "user_id": 13,
            "product_id": 15,
            "rating": 5,
            "review": "Review for product 15"
        },
        {
            "user_id": 10,
            "product_id": 15,
            "rating": 4,
            "review": "Review for product 15"
        },
        {
            "user_id": 4,
            "product_id": 16,
            "rating": 5,
            "review": "Review for product 16"
        },
        {
            "user_id": 8,
            "product_id": 16,
            "rating": 1,
            "review": "Review for product 16"
        },
        {
            "user_id": 10,
            "product_id": 17,
            "rating": 4,
            "review": "Review for product 17"
        },
        {
            "user_id": 2,
            "product_id": 17,
            "rating": 1,
            "review": "Review for product 17"
        },
        {
            "user_id": 8,
            "product_id": 18,
            "rating": 3,
            "review": "Review for product 18"
        },
        {
            "user_id": 12,
            "product_id": 18,
            "rating": 4,
            "review": "Review for product 18"
        },
        {
            "user_id": 7,
            "product_id": 19,
            "rating": 4,
            "review": "Review for product 19"
        },
        {
            "user_id": 14,
            "product_id": 19,
            "rating": 5,
            "review": "Review for product 19"
        },
        {
            "user_id": 5,
            "product_id": 20,
            "rating": 4,
            "review": "Review for product 20"
        },
        {
            "user_id": 3,
            "product_id": 20,
            "rating": 1,
            "review": "Review for product 20"
        },
        {
            "user_id": 5,
            "product_id": 21,
            "rating": 2,
            "review": "Review for product 21"
        },
        {
            "user_id": 7,
            "product_id": 22,
            "rating": 5,
            "review": "Review for product 22"
        },
        {
            "user_id": 10,
            "product_id": 23,
            "rating": 1,
            "review": "Review for product 23"
        },
        {
            "user_id": 14,
            "product_id": 23,
            "rating": 2,
            "review": "Review for product 23"
        },
        {
            "user_id": 7,
            "product_id": 24,
            "rating": 2,
            "review": "Review for product 24"
        },
        {
            "user_id": 9,
            "product_id": 24,
            "rating": 4,
            "review": "Review for product 24"
        },
        {
            "user_id": 7,
            "product_id": 24,
            "rating": 4,
            "review": "Review for product 24"
        },
        {
            "user_id": 10,
            "product_id": 25,
            "rating": 2,
            "review": "Review for product 25"
        },
        {
            "user_id": 7,
            "product_id": 26,
            "rating": 4,
            "review": "Review for product 26"
        },
        {
            "user_id": 15,
            "product_id": 26,
            "rating": 3,
            "review": "Review for product 26"
        },
        {
            "user_id": 15,
            "product_id": 26,
            "rating": 2,
            "review": "Review for product 26"
        },
        {
            "user_id": 8,
            "product_id": 27,
            "rating": 3,
            "review": "Review for product 27"
        },
        {
            "user_id": 1,
            "product_id": 27,
            "rating": 3,
            "review": "Review for product 27"
        },
        {
            "user_id": 13,
            "product_id": 28,
            "rating": 5,
            "review": "Review for product 28"
        },
        {
            "user_id": 12,
            "product_id": 28,
            "rating": 5,
            "review": "Review for product 28"
        },
        {
            "user_id": 3,
            "product_id": 29,
            "rating": 3,
            "review": "Review for product 29"
        },
        {
            "user_id": 14,
            "product_id": 29,
            "rating": 3,
            "review": "Review for product 29"
        },
        {
            "user_id": 11,
            "product_id": 30,
            "rating": 5,
            "review": "Review for product 30"
        },
        {
            "user_id": 12,
            "product_id": 30,
            "rating": 4,
            "review": "Review for product 30"
        },
        {
            "user_id": 15,
            "product_id": 30,
            "rating": 3,
            "review": "Review for product 30"
        },
        {
            "user_id": 8,
            "product_id": 31,
            "rating": 1,
            "review": "Review for product 31"
        },
        {
            "user_id": 3,
            "product_id": 31,
            "rating": 1,
            "review": "Review for product 31"
        },
        {
            "user_id": 15,
            "product_id": 31,
            "rating": 3,
            "review": "Review for product 31"
        },
        {
            "user_id": 6,
            "product_id": 32,
            "rating": 4,
            "review": "Review for product 32"
        },
        {
            "user_id": 1,
            "product_id": 32,
            "rating": 2,
            "review": "Review for product 32"
        },
        {
            "user_id": 12,
            "product_id": 32,
            "rating": 1,
            "review": "Review for product 32"
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
