from backend.database.neo4j import get_driver, get_database


def create_user(user_id,
        username,
        age,
        image,
        firstname,
        lastname,
        sexe,
        interested,
        description,
        tags,
        location,
        images,
        password,
        email
        ):

    query = """
    MERGE (u:User {id: $user_id})
    SET u.username = $username,
        u.age = $age,
        u.image = $image,
        u.firstname = $firstname,
        u.lastname = $lastname,
        u.sexe = $sexe,
        u.interested = $interested,
        u.description = $description,
        u.tags = $tags,
        u.location = $location,
        u.images = $images,
        u.password = $password,
        u.email = $email

    RETURN u.id AS id,
           u.username AS username,
           u.age AS age,
           u.image AS image,
           u.firstname AS firstname,
           u.lastname AS lastname,
           u.sexe AS sexe,
           u.interested AS interested,
           u.description AS description,
           u.tags AS tags,
           u.location AS location,
           u.images AS images,
           u.password AS password,
           u.email AS email
    """

    with get_driver().session(
        database=get_database()
    ) as session:

        result = session.run(
            query,
            user_id=user_id,
            username=username,
            age=age,
            image=image,
            firstname=firstname,
            lastname=lastname,
            sexe=sexe,
            interested=interested,
            description=description,
            tags=tags,
            location=location,
            images=images,
            password=password,
            email=email
        )

        record = result.single()

        if record is None:
            return None

        return record.data()

def delete_user(user_id):
    query = """
        MATCH (n:User {id: $user_id})
        DETACH DELETE n
        RETURN n
    """

    with get_driver().session(
        database=get_database()
    ) as session:
        result = session.run(
            query,
            user_id=user_id
        )

        record = result.single()

        if record is None:
            return None

        return record.data()

def get_all_users():

    query = """
    MATCH (u:User)

    RETURN u.id AS id,
           u.username AS username,
           u.age AS age

    ORDER BY u.username
    """

    with get_driver().session(
        database=get_database()
    ) as session:

        result = session.run(query)

        return [
            record.data()
            for record in result
        ]
