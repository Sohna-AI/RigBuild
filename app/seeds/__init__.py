from flask.cli import AppGroup
from .users import seed_users, undo_users
from .addresses import seed_addresses, undo_addresses
from .categories import seed_categories, undo_categories
from .products import seed_products, undo_products
from .wishlists import seed_wishlists, undo_wishlists
from .product_images import seed_product_images, undo_product_images
from .shopping_carts import seed_shopping_carts, undo_shopping_carts
from .cart_items import seed_cart_items, undo_cart_items
from .orders import seed_orders, undo_orders
from .order_items import seed_order_items, undo_order_items
from .reviews import seed_reviews, undo_reviews

from app.models.db import db, environment, SCHEMA

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    if environment == 'production':
        # Before seeding in production, you want to run the seed undo 
        # command, which will  truncate all tables prefixed with 
        # the schema name (see comment in users.py undo_users function).
        # Make sure to add all your other model's undo functions below
        undo_reviews()
        undo_order_items()
        undo_orders()
        undo_cart_items()
        undo_shopping_carts()
        undo_wishlists()
        undo_product_images()
        undo_products()
        undo_categories()
        undo_addresses()
        undo_users()
    seed_users()
    seed_addresses()
    seed_categories()
    seed_products()
    seed_product_images()
    seed_wishlists()
    seed_shopping_carts()
    seed_cart_items()
    seed_orders()
    seed_order_items()
    seed_reviews()
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_reviews()
    undo_order_items()
    undo_orders()
    undo_cart_items()
    undo_shopping_carts()
    undo_wishlists()
    undo_product_images()
    undo_products()
    undo_categories()
    undo_addresses()
    undo_users()
    # Add other undo functions here
