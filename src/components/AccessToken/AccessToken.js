import * as config from '../../constants/config'
import $ from 'jquery'; 
export const getAccessToken = () => {
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://cors-anywhere.herokuapp.com/https://adveniopeople.invenias.com/identity/connect/token",
        "method": "POST",
        "headers": {
          "cache-control": "no-cache",
        },
        "data": {
          "username": "bjorn@adveniopeople.com",
          "password": "Cyclops2+",
          "client_id": "6dc6aa49-1278-438b-a429-cc711d2a2676",
          "client_secret": "5aIu68liL3sZ1P5Ph+rFsQ8TL",
          "grant_type": "password",
          "scope": "openid profile api email"
        }
      }
      var res ={};
      
      $.ajax(settings).done(function (response) {
        res = response;
        console.log(res)
        return res
      })
      .fail(function (jqXHR, textStatus) {
        console.log(textStatus);
    });
    // return res
}