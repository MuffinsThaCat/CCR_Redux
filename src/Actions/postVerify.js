import { STORE, STORE_ERR_MESSAGE } from "./types";
import { BaseURL } from "./BaseURL";
import axios from "axios";

//used when users adds file with a password
require('dotenv').config();
//used when users adds file with a password
async function getAuthToken(){
  let URL='https://id.copyleaks.com/v3/account/login/api';
  let body={
    email: process.env.EMAIL,
    key: process.env.PASSWORD
 }
 let _header = {
    'Content-type': 'application/json' 
 }; 
  let result= await axios({
     method: 'post',
     url: URL,
     data:body,
     headers:_header
   })
   console.log(result.data)
   return result.data.access_token
}

async function uploadDoc(fileName,base64Encoding,fileID){
  let token= await getAuthToken();
  console.log(token)
  var dataString = {
      "base64": base64Encoding,
      "filename": fileName,
      "properties": {
        "webhooks": {
          "status": `https://yoursite.com/webhook/{STATUS}/${fileID}`
        }
      }
    };
    var _headers = {
      'Authorization':'Bearer '+token,
      'Content-type': 'application/json'
    };
    let result= await axios({
      method: 'PUT',
      url: `https://api.copyleaks.com/v3/businesses/submit/file/${fileID}`,
      data:dataString,
      headers:_headers
    })
    return result

}


export const postVerifyAction = (
  fileName,  
  Encoding,
  fileID,  
  crtl
) => dispatch => {
  ///const fd = new FormData();
 // fd.append("file", file[0]);
 // fd.append("hash", hash);
 // fd.append("password", password);
 // fd.append("meta", meta);
  uploadDoc(fileName,Encoding,fileID)
    .then(res => {
      dispatch({
        type: STORE,
        payload: res.data
      });
      if (res.data) {
        crtl.setState({ loading: false });
        crtl.setState({ contentStatus: false });
      }
    }).catch(err => {
      dispatch({
        type: STORE_ERR_MESSAGE,
        payload: err.response.data
      });
      if (err.response.data === "DUPLICATE_ENTRY") {
        crtl.setState({ loading: false });
      }
     });
     
    
};
