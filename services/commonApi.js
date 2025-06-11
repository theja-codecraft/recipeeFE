import axios from "axios"
export const commonAPI=async(httpMethod,url,reqBody,reqHeader)=>{
    const reqConfig={
        method:httpMethod,
        url:url,
        data:reqBody,
        
    }
}