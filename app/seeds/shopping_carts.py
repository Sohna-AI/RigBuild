from app.models import db, ShoppingCart, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_shopping_carts():
    carts = [
        {
            'user_id': 1
        },
        {
            'user_id': 2
        },
        {
            'user_id': 3
        },
        {
            'user_id': 4
        },
        {
            'user_id': 5
        },
        {
            'user_id': 6
        },
        {
            'user_id': 7
        },
        {
            'user_id': 8
        },
        {
            'user_id': 9
        },
        {
            'user_id': 10
        },
        {
            'user_id': 12
        },
        {
            'user_id': 13
        },
        {
            'user_id': 14
        },
        {
            'user_id': 15
        },
        {
            'user_id': 16
        },
        {
            'user_id': 17
        },
        {
            'user_id': 18
        },
        {
            'user_id': 19
        },
        {
            'user_id': 20
        },
        {
            'user_id': 21
        },
        {
            'user_id': 22
        },
        {
            'user_id': 23
        },
        {
            'user_id': 24
        },
        {
            'user_id': 25
        },
        {
            'user_id': 26
        },
        {
            'user_id': 27
        },
        {
            'user_id': 28
        },
    ]
   
    for cart in carts:
        newCart = ShoppingCart(
            user_id=cart['user_id']
        )
        db.session.add(newCart)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_shopping_carts():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.shopping_carts RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM shopping_carts"))
        
    db.session.commit()
