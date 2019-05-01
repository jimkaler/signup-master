import $ from 'jquery';
import * as urls from '../constants/urls'

export const request = (path, data, method, headers) => {
    const url = urls.API_HOST + `/api/${path}`
    let query = {        
          url: url,
          method: method,
          headers: headers
    };
    if (method === 'POST' || method === 'PUT') {
      query.data = data;
    } 
    return $.ajax(query);
}

export const requestApi = (path, data, method, headers) => {
    const url = urls.API_HOST + `/${path}`
    // let HOSTS = 'http://localhost:3001/invenias';
    // const url = HOSTS + `/${path}`;
    let query = {        
          url: url,
          method: method,
          headers: headers
    };
    if (method === 'POST') {
      query.data = data;
    }
    return $.ajax(query);
}