from app.models import db, CartItem, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_cart_items():
    cart_items = [
        {
            'cart_id': 1,
            'product_id': 5,
            'quantity': 1
        },
        {
            'cart_id': 1,
            'product_id': 7,
            'quantity': 1
        },
        {
            'cart_id': 1,
            'product_id': 15,
            'quantity': 1
        },
        {
            'cart_id': 1,
            'product_id': 16,
            'quantity': 1
        },
        {
            'cart_id': 1,
            'product_id': 28,
            'quantity': 1
        },
        {
            'cart_id': 1,
            'product_id': 32,
            'quantity': 1
        },
        {
            'cart_id': 2,
            'product_id': 2,
            'quantity': 1
        },
        {
            'cart_id': 2,
            'product_id': 9,
            'quantity': 1
        },
        {
            'cart_id': 2,
            'product_id': 13,
            'quantity': 1
        },
        {
            'cart_id': 2,
            'product_id': 14,
            'quantity': 1
        },
        {
            'cart_id': 3,
            'product_id': 18,
            'quantity': 1
        },
        {
            'cart_id': 3,
            'product_id': 26,
            'quantity': 1
        },
        {
            'cart_id': 3,
            'product_id': 31,
            'quantity': 1
        }
    ]
   
    for item in cart_items:
        newCart = CartItem(
            cart_id=item['cart_id'],
            product_id=item['product_id'],
            quantity=item['quantity']
        )
        db.session.add(newCart)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_cart_items():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.cart_items RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM cart_items"))
        
    db.session.commit()
