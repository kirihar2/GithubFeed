var buffer = require('buffer');
var AsyncStorage = require('react-native').AsyncStorage;
var _ = require('lodash');


const authKey = 'auth';
const userKey = 'user';
class AuthService {

  getAuthInfo(cb){
      AsyncStorage.multiGet([authKey, userKey], (err, val)=> {
          if(err){
              return cb(err);
          }
          console.log("no error found, checking for empty val");

          if(!val){
              return cb();
          }
          console.log("val not empty ");
          console.log(val);

          console.log(_.unzip(val));
          var temp = _.unzip(val);
          var zippedObj=_.zipObject(temp[0],temp[1]);
          console.log("checking if authkey is null");
          console.log(zippedObj[userKey]);
          console.log(zippedObj[authKey]);

          if(!zippedObj[userKey]){
              return cb();
          }
          console.log("returning authinfo");

          var authInfo = {
              header: {
                  Authorization: 'Basic ' + zippedObj[authKey]
              },
              user: JSON.parse(zippedObj[userKey])
          }

          return cb(null, authInfo);
      });
  }

  login(creds, cb){
      var b = new buffer.Buffer(creds.username +
          ':' + creds.password);
      var encodedAuth = b.toString('base64');

      fetch('https://api.github.com/user',{
          headers: {
              'Authorization' : 'Basic ' + encodedAuth
          }
      })
      .then((response)=> {
        console.log("checking auth response status code");
          if(response.status >= 200 && response.status < 300){
              return response;
          }

          throw {
              badCredentials: response.status == 401,
              unknownError: response.status != 401
          }
      })
      .then((response)=> {
        console.log("no error found sending json response");
          return response.json();
      })
      .then((results)=> {
        console.log("setting async storage");
          AsyncStorage.multiSet([
              [authKey, encodedAuth],
              [userKey, JSON.stringify(results)]
          ], (err)=> {
              if(err){
                  throw err;
              }
              console.log("successfully set state in async storage...");
              return cb({success: true});
          });
      })
      .catch((err)=> {
          return cb(err);
      });
  }
}
module.exports = new AuthService();
