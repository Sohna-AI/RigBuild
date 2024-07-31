from app.models import db, Address, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_addresses():
    addresses = [
        {
            'user_id': 1,
            'street': '951 Work St',
            'city': 'Salinas',
            'state': 'CA',
            'postal_code': '93901',
            'country': 'United Sates'
        },
        {
            'user_id': 1,
            'street': '19800 Main St',
            'city': 'Carson',
            'state': 'CA',
            'postal_code': '90745',
            'country': 'United States'
        },
        {
            'user_id': 2,
            'street': '1800 Epcot Resorts Blvd',
            'city': 'Lake Buena Vista',
            'state': 'FL',
            'postal_code': '32830',
            'country': 'United States'
        },
        {
            'user_id': 2,
            'street': '100 Universal City Plaza',
            'city': 'Universal City',
            'state': 'CA',
            'postal_code': '91608',
            'country': 'United States'
        },
        {
            'user_id': 3,
            'street': '260 Doolittle Dr',
            'city': 'San Leandro',
            'state': 'CA',
            'postal_code': '94577',
            'country': 'United States'
        }
    ]
    
    for address in addresses:
        newAddress = Address(
            user_id=address['user_id'],
            street=address['street'],
            city=address['city'],
            state=address['state'],
            postal_code=address['postal_code'],
            country=address['country']
        )
        db.session.add(newAddress)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_addresses():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.addresses RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM addresses"))
        
    db.session.commit()
