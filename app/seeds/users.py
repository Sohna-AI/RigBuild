from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_users():
    users = [
    User(username='Demo', first_name='demo', last_name='tester1', email='demo@aa.io', password='password'),
    User(username='alice', first_name='Alice', last_name='Smith', email='alice@aa.io', password='password'),
    User(username='john', first_name='John', last_name='Doe', email='john@aa.io', password='password'),
    User(username='emma', first_name='Emma', last_name='Johnson', email='emma@aa.io', password='password'),
    User(username='james', first_name='James', last_name='Williams', email='james@aa.io', password='password'),
    User(username='olivia', first_name='Olivia', last_name='Brown', email='olivia@aa.io', password='password'),
    User(username='william', first_name='William', last_name='Jones', email='william@aa.io', password='password'),
    User(username='sophia', first_name='Sophia', last_name='Garcia', email='sophia@aa.io', password='password'),
    User(username='michael', first_name='Michael', last_name='Martinez', email='michael@aa.io', password='password'),
    User(username='ava', first_name='Ava', last_name='Rodriguez', email='ava@aa.io', password='password'),
    User(username='robert', first_name='Robert', last_name='Hernandez', email='robert@aa.io', password='password'),
    User(username='isabella', first_name='Isabella', last_name='Lopez', email='isabella@aa.io', password='password'),
    User(username='david', first_name='David', last_name='Gonzalez', email='david@aa.io', password='password'),
    User(username='mia', first_name='Mia', last_name='Wilson', email='mia@aa.io', password='password'),
    User(username='richard', first_name='Richard', last_name='Anderson', email='richard@aa.io', password='password'),
    User(username='amelia', first_name='Amelia', last_name='Thomas', email='amelia@aa.io', password='password'),
    User(username='charles', first_name='Charles', last_name='Taylor', email='charles@aa.io', password='password'),
    User(username='harper', first_name='Harper', last_name='Moore', email='harper@aa.io', password='password'),
    User(username='joseph', first_name='Joseph', last_name='Jackson', email='joseph@aa.io', password='password'),
    User(username='evelyn', first_name='Evelyn', last_name='Martin', email='evelyn@aa.io', password='password'),
    User(username='thomas', first_name='Thomas', last_name='Lee', email='thomas@aa.io', password='password'),
    User(username='lucas', first_name='Lucas', last_name='Perez', email='lucas@aa.io', password='password'),
    User(username='elizabeth', first_name='Elizabeth', last_name='Thompson', email='elizabeth@aa.io', password='password'),
    User(username='daniel', first_name='Daniel', last_name='White', email='daniel@aa.io', password='password'),
    User(username='scarlett', first_name='Scarlett', last_name='Harris', email='scarlett@aa.io', password='password'),
    User(username='singh', first_name='pushpinder', last_name='singh', email='singh@icloud.com', password='password'),
    User(username='bobbie', first_name='bobbie', last_name='tester3', email='bobbie@aa.io', password='password'),
    User(username='marnie', first_name='marnie', last_name='tester2', email='marnie@aa.io', password='password'),
]

    for user in users:
        db.session.add(user)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))
        
    db.session.commit()
