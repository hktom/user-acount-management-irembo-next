import { queryMethods } from "@/config/apollo/config";
import { USER_FRAGMENT } from "@/config/apollo/fragments";

export const homeQuery = {
  me: () => {
    const req = `#graphql
    {
            me${USER_FRAGMENT}
    }`;

        

    return queryMethods(req);
  },
  countries: () => {
    const req = `#graphql
    {
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
    const req = `#graphql
    {
        users${USER_FRAGMENT}
    }`;

    return queryMethods(req);
  },
};
