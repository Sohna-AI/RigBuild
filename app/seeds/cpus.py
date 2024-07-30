from app.models import db, CPU, environment, SCHEMA
from sqlalchemy.sql import text
import json


# Adds a demo user, you can add other users here if you want
def seed_cpus():
    with open('../seed_data/cpu/cpus.json') as f:
        cpus = json.load(f)
        
   
    
    for cpu in cpus:
        cpuProduct = CPU(
            name=cpu['name'],
            core_count=cpu['core_count'],
            core_clock=cpu['core_clock'],
            boost_clock=cpu['boost_clock'],
            graphics=cpu['graphics'],
            tdp=cpu['tdp'],
            smt=cpu['smt'],
        )
        db.session.add(cpuProduct)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_cpus():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.cpus RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM cpus"))
        
    db.session.commit()
