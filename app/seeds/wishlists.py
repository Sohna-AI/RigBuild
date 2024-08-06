from app.models import db, Wishlist, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_wishlists():
    wishlists = [
        {
            'user_id': 4,
            'product_id': 1, 
        },
        {
            'user_id': 4,
            'product_id': 5,
        },
        {
            'user_id': 4,
            'product_id': 9,
        },
        {
            'user_id': 4,
            'product_id': 14,
        },
        {
            'user_id': 4,
            'product_id': 18,
        },
        {
            'user_id': 4,
            'product_id': 22,
        },
        {
            'user_id': 4,
            'product_id': 26,
        },
        {
            'user_id': 4,
            'product_id': 30,
        },
        {
            'user_id': 1,
            'product_id': 5,
        },
        {
            'user_id': 1,
            'product_id': 15,
        },
        {
            'user_id': 1,
            'product_id': 19,
        },
        {
            'user_id': 1,
            'product_id': 28,
        },
        {
            'user_id': 1,
            'product_id': 32,
        },
        {
            'user_id': 2,
            'product_id': 2,
        },
        {
            'user_id': 2,
            'product_id': 9,
        },
        {
            'user_id': 2,
            'product_id': 13,
        },
        {
            'user_id': 2,
            'product_id': 17,
        },
        {
            'user_id': 2,
            'product_id': 25,
        }
    ]
    for wishlist in wishlists:
        newWishlist = Wishlist(
            user_id=wishlist['user_id'],
            product_id=wishlist['product_id']
        )
        db.session.add(newWishlist)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_wishlists():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.wishlists RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM wishlists"))
        
    db.session.commit()
