// var s=  "profile|73241234|<Niharika><><Khan>|<Mumbai><<72.872075><19.075606>>|73241234.jpg**followers|54543343|<Amitabh><><>|<Dehradun><<><>>|54543343.jpg@@|22112211|<Piyush><><>||";

var s;
var fs = require('fs');

fs.readFile('here.js', 'utf8', function(err, data) {  
    if (err) throw err;
    s= data;
    console.log(s);


    var followers, profile, arr;
    arr= s.split('**followers');
    profile=arr[0];
    followers= arr[1];

    function getData(str)
    {
      var arr=[];
      for(var i=0;i< str.length;i++)
        {
          if(str[i]==='<')
            {
              i++;
              while(str[i]==='<') i++;
              var j=i;
              while(str[j]!='>') j++;
              tmp= str.substring(i, j);
              i=j;
              arr.push(tmp);
            }
        }
      return arr;
    }
    function getName(str)
    {
      var tmp, arr=[], res;
      arr=getData(str);
     
      var obj={
        first: arr[0],
        middle: arr[1],
        last: arr[2]
      };
      return obj;
    }
    function getLocation(str)
    {
      let tmp, arr=[], res;
      arr=getData(str);
      let obj= new Object();
      obj.name=arr[0];
      obj.coords= new Object();
      obj.coords.long=arr[1] ;
      obj.coords.lat= arr[2];

      return obj;
    }

    function getFollowers(str)
    {
      var obj={}, res=[];
      
      for(let i=0; i<str.length; i++)
      {
        var s= str[i];
        s= s.substring(1);
        var followers_arr=s.split('|');
        res.push(followers_arr);
      }
      return res;
    }
    var str=profile, tmp;
    var obj={};
    var profile_arr=profile.split('|');
    obj.id= profile_arr[1];
    obj.name= getName(profile_arr[2]);
    obj.location= getLocation(profile_arr[3]);
    obj.imageId= profile_arr[4];

    var all_followers= followers.split('@@');
    var res= getFollowers(all_followers);

    var follow=[];
    for(let i=0; i<res.length; i++)
      {
        let tmp2={};
         tmp2.id=res[i][0];
         tmp2.name= getName(res[i][1]);
         tmp2.location= getLocation(res[i][2]);
         tmp2.imageId=  res[i][3];
         follow.push(tmp2);
      }
     obj.followers= follow;
     console.log(JSON.stringify(obj,undefined,2));

  });

