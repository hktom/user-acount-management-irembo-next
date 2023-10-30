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
      verifyEmail(email:"${data.email}", token:"${data.token}"){
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

  logout: () => {
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

  updatePassword: (data: IUser) => {
    const req = `#graphql
    mutation{
      updatePassword(password:"${data.password}", new_password:"${data.new_password}", password_confirmation:"${data.password_confirmation}"){
        message
        status
      }
    }`;

    return mutateMethods(req);
  },

  sendEmailVerify: ()=>{
    const req = `#graphql
    mutation{
      sendEmailVerify{
        message
        status
      }
    }`;

    return mutateMethods(req);
  }
};
