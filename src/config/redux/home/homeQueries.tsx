import { queryMethods } from "@/config/apollo/config";

export const homeQuery = {
  me: () => {
    const req = `#graphql{
            me{
                id
                first_name
                last_name
                email
                gender
                date_of_birth
                marital_status
                status
                photo
                document{
                    id
                    name
                    photo
                }
                nationality{
                    id
                    name
                    code
                    flag
                }
            }
        }`;

    return queryMethods(req);
  },
  countries: () => {
    const req = `#graphql{
        countries{
            id
            name
            code
            flag
        }
    }`;

    return queryMethods(req);
  },

  users: () => {
    const req = `#graphql{
        users{
            id
            first_name
            last_name
            email
            gender
            date_of_birth
            marital_status
            status
            photo
            document{
                id
                name
                photo
            }
            nationality{
                id
                name
                code
                flag
            }   
        }
    }`;

    return queryMethods(req);
  },
};
