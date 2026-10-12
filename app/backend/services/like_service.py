from backend.database.neo4j import get_driver, get_database


def like_user(user_id, target_id):

    query = """
    MATCH (user:User {id: $user_id})
    MATCH (target:User {id: $target_id})

    MERGE (user)-[:LIKES]->(target)

    RETURN user.username AS user,
           target.username AS target
    """

    with get_driver().session(
        database=get_database()
    ) as session:

        result = session.run(
            query,
            user_id=user_id,
            target_id=target_id
        )

        record = result.single()

        if record is None:
            return None

        return record.data()
