from app.models import db, OrderItem, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_order_items():
    order_items = [
        {
            'order_id': 1,
            'product_id': 5,
            'quantity': 1,
            'unit_price': 539.99
        },
        {
            'order_id': 1,
            'product_id': 7,
            'quantity': 2,
            'unit_price': 399.99 * 2
        },
        {
            'order_id': 1,
            'product_id': 15,
            'quantity': 1,
            'unit_price': 99.99
        },
        {
            'order_id': 1,
            'product_id': 16,
            'quantity': 2,
            'unit_price': 94.99 * 2
        },
        {
            'order_id': 2,
            'product_id': 28,
            'quantity': 1,
            'unit_price': 94.99
        },
        {
            'order_id': 1,
            'product_id': 32,
            'quantity': 4,
            'unit_price': 999.99 * 4
        },
        {
            'order_id': 2,
            'product_id': 2,
            'quantity': 1,
            'unit_price': 649.99
        },
        {
            'order_id': 2,
            'product_id': 9,
            'quantity': 2,
            'unit_price': 89.99 * 2
        },
        {
            'order_id': 2,
            'product_id': 13,
            'quantity': 2,
            'unit_price': 149.99 * 2
        },
        {
            'order_id': 2,
            'product_id': 14,
            'quantity': 3,
            'unit_price': 54.99 * 3
        },
        {
            'order_id': 3,
            'product_id': 18,
            'quantity': 1,
            'unit_price': 189.99
        },
        {
            'order_id': 3,
            'product_id': 26,
            'quantity': 2,
            'unit_price': 129.99 * 2
        },
        {
            'order_id': 3,
            'product_id': 31,
            'quantity': 2,
            'unit_price': 799.99 * 2
        }
    ]
    
    for item in order_items:
        newItem = OrderItem(
            order_id=item['order_id'],
            product_id=item['product_id'],
            quantity=item['quantity'],
            unit_price=item['unit_price']
        )
        db.session.add(newItem)
    db.session.commit()
   


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_order_items():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.order_items RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM order_items"))
        
    db.session.commit()
