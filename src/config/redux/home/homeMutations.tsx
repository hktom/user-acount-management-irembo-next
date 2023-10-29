import { mutateMethods } from "@/config/apollo/config";
import { Status } from "@/config/helpers/enum";
import { IDocument, IUser } from "@/config/helpers/interface";

export const homeMutation = {

  updateProfile: (data: IUser) => {
    const req = `#graphql
        mutation{
            updateProfile(input:{
                first_name:"${data.first_name}",
                last_name:"${data.last_name}",
                photo:"${data.photo}",
                gender:${data.gender},
                date_of_birth:"${data.date_of_birth}",
                marital_status:${data.marital_status},
            }){
                message
                status
                user{
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
            }
        }
        `;

    return mutateMethods(req);
  },

  postDocument: (data: IDocument) => {
    const req = `#graphql
        mutation{
            postDocument(input:{
                name : "${data.name}",
                code : "${data.code}",
                photo : "${data.photo}",
            }){
                message
                status
                document
            }
        }
    `;
    return mutateMethods(req);
  },

  confirmDocument: (user_id: string, status: Status) => {
    const req = `#graphql
        mutation{
            confirmDocument(user_id:"${user_id}", status:${status}){
                message
                status
            }
        }
    `;
    return mutateMethods(req);
  },
};
