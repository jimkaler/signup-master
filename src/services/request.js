import $ from 'jquery';
import * as urls from '../constants/urls'

export const request = (path, data, method, headers) => {
    const url = urls.API_HOST + `/api/V0/${path}`
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