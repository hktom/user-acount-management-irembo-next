export const USER_FRAGMENT = `#graphql
{
    id
    first_name
    last_name
    email
    gender
    date_of_birth
    marital_status
    email_verified_at
    status
    photo
    document{
        id
        name
        photo
        code
    }
    nationality{
        id
        name
        code
        flag
    }
}
`;
