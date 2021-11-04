import Cookies from 'js-cookie';

var UserProfile = (function() {
    var username="";
    var logged;
    var getName = function() {
      return username;
    };
  
    var setName = function(name) {
      username=name;     
     
    };
    var eraseName = function(){
      username="";
    }
    var isloggedin = function(){
   logged= Cookies.get('logged');
   if(logged){
     return logged;
   }
   return false;

    }
  
    return {
      getName: getName,
      setName: setName,
      eraseName:eraseName,
      isloggedin:isloggedin
    }
  
  })();
  
  export default UserProfile;