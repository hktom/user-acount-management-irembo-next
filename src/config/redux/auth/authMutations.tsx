import { mutateMethods } from "@/config/apollo/config";
import { IUser } from "@/config/helpers/interface";

export const authMutation = {
  multiFactor: (data: IUser) => {
    const request = `#graphql
    mutation{
      loginMultiFactor(email:"${data.email}",password:"${data.password}"){
            message
            status
        }
    }`;

    return mutateMethods(request);
  },

  login: (data: IUser) => {
    const request = `#graphql
  mutation{
        login(token:"${data.token}"){
            message
            status
            token
        }
    }`;

    return mutateMethods(request);
  },

  verifyEmail: (data: IUser) => {
    const request = `#graphql
    mutation{
      verifyEmail(email:"${data.email}"){
        message
        status
      }
    }`;

    return mutateMethods(request);
  },

  resetPassword: (data: IUser) => {
    const request = `#graphql
    mutation{
      resetPassword(email:"${data.email}",password:"${data.password}",password_confirmation:"${data.password_confirmation}", token:"${data.token}"){
        message
        status
      }
    }`;

    return mutateMethods(request);
  },

  forgotPassword: (data: IUser) => {
    const request = `#graphql
    mutation{
      forgotPassword(email:"${data.email}"){
        message
        status
      }
    }`;

    return mutateMethods(request);
  },

  logout: (data: IUser) => {
    const request = `#graphql
  mutation{
    logout{
      message
      status
    }
  }`;

    return mutateMethods(request);
  },

  register: (data: IUser) => {
    const request = `#graphql
    mutation {
      register(
        first_name: "${data.first_name}"
        last_name: "${data.last_name}"
        email: "${data.email}"
        password: "${data.password}"
        password_confirmation: "${data.password_confirmation}"
        # nationality_id:"${data.nationality_id}"
        # gender:${data.gender}
        # date_of_birth:"${data.date_of_birth}"
        # marital_status:${data.marital_status}
      ){
        message
        token
        status
      }
    }
    `;

    return mutateMethods(request);
  },
};
