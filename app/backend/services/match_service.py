from backend.database.neo4j import get_driver, get_database


def get_matches(user_id):

    query = """
    MATCH (user:User {id: $user_id})
          -[:LIKES]->(target:User)
          -[:LIKES]->(user)

    RETURN target.id AS id,
           target.username AS username,
           target.age AS age
    """

    with get_driver().session(
        database=get_database()
    ) as session:

        result = session.run(
            query,
            user_id=user_id
        )

        return [
            record.data()
            for record in result
        ]
