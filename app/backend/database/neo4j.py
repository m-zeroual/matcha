from neo4j import GraphDatabase
import os


URI = os.getenv(
    "NEO4J_URI",
    "neo4j://localhost:7687"
)

USER = os.getenv(
    "NEO4J_USER",
    "neo4j"
)

PASSWORD = os.getenv(
    "NEO4J_PASSWORD",
    "matcha_password"
)

DATABASE = os.getenv(
    "NEO4J_DATABASE",
    "neo4j"
)


driver = GraphDatabase.driver(
    URI,
    auth=(USER, PASSWORD)
)


def get_driver():
    return driver


def get_database():
    return DATABASE


def close_driver():
    driver.close()