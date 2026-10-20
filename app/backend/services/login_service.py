from backend.database.neo4j import get_driver, get_database


def get_user(username, password):
    
    query = """
        MATCH (u:User {username: $username})
        RETURN u
    """

    with get_driver().session(
        database=get_database()
    ) as session:
        result = session.run(query, username=username, password=password)

        return [
            record["u"]._properties
            for record in result
        ]