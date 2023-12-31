import { HOST_URL, TOKEN, mutateMethods } from "@/config/apollo/config";
import { USER_FRAGMENT } from "@/config/apollo/fragments";
import { Status } from "@/config/helpers/enum";
import { IDocument, IUser } from "@/config/helpers/interface";
import axios from "axios";

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
                nationality_id: "${data.nationality_id}"
            }){
                message
                status
                user${USER_FRAGMENT}
            }
        }
        `;

    return mutateMethods(req);
  },

  postDocument: (data: IDocument) => {
    const req = `#graphql
        mutation{
            postDocument(input:{
                name : ${data.name},
                code : "${data.code}",
                photo : "${data.photo}",
            }){
                message
                status
                user${USER_FRAGMENT}
            }
        }
    `;

    return mutateMethods(req);
  },

  confirmDocument: (data:any) => {
    const req = `#graphql
        mutation{
            confirmDocument(user_id:"${data.user_id}", status:${data.status}){
                message
                status
                users${USER_FRAGMENT}
            }
        }
    `;
    return mutateMethods(req);
  },

  uploadImage: async (image: File | any) => {

    try {
      const data = new FormData();
      data.append("image", image);
      const res = await axios.post(`${HOST_URL}/api/image/store`, data, {
        headers: {
          "content-type": "multipart/form-data",
          authorization: "Bearer " + TOKEN,
        },
      });
      return res;
    } catch (error) {
      return { message: "Be sure your file not exceed 1MB", status: 400 };
    }
  },
};
