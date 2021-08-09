// Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  var firebaseConfig = {
    apiKey: "AIzaSyBd88RJOvYJ7g4-c-57psZ_5n0us2eZR5Q",
    authDomain: "survey-29c31.firebaseapp.com",
	databaseURL: "https://survey-29c31-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "survey-29c31",
    storageBucket: "survey-29c31.appspot.com",
    messagingSenderId: "1061111364149",
    appId: "1:1061111364149:web:fe6a5a8e05dfb0c5e2cf7c",
    measurementId: "G-75H44D7EP6"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();
  
  var database=firebase.database()
  
  function sendSurvey()
  {
	  //getting the value from the form to firebase database and saving
	  //them in the variables
	  var name=document.getElementById("name").value;
	  var email=document.getElementById("email").value;
	  var mobile=document.getElementById("mobile").value;
	  var investor=document.getElementById("investor").checked;
	  var startups=document.getElementById("startups").checked;
	  var experience=document.getElementById("experience").checked;
	  var finance=document.getElementById("finance").checked;
	  var message=document.getElementById("message").value;
	  
	  var newMessagekey=database.ref().child('surveys').push().key;
	  
	  database.ref('surveys/'+newMessagekey+'/Name').set(name);
	  database.ref('surveys/'+newMessagekey+'/Email').set(email);
	  database.ref('surveys/'+newMessagekey+'/Mobile').set(mobile);
	  database.ref('surveys/'+newMessagekey+'/Investor').set(investor);
	  database.ref('surveys/'+newMessagekey+'/Startups').set(startups);
	  database.ref('surveys/'+newMessagekey+'/Experience').set(experience);
	  database.ref('surveys/'+newMessagekey+'/Finance').set(finance);
	  database.ref('surveys/'+newMessagekey+'/Message').set(message);
  }
  function postPComment()
  {
	  var name=document.getElementById("name").value;
	  var positive_comment=document.getElementById("positive_comment").value;
	  
	  var newMessagekey=database.ref().child('positive_comment').push().key;
	  
	  if(name=="")
		  name="unknown user";

	  database.ref('positive_comments/'+newMessagekey+'/Name').set(name);
	  database.ref('positive_comments/'+newMessagekey+'/Comment').set(positive_comment);
  }
  function postNComment()
  {
	  var name=document.getElementById("name").value;
	  var negative_comment=document.getElementById("negative_comment").value;
	  
	  var newMessagekey=database.ref().child('negative_comment').push().key;
	  
	  if(name=="")
		  name="unknown user";
	  
	  database.ref('negative_comment/'+newMessagekey+'/Name').set(name);
	  database.ref('negative_comment/'+newMessagekey+'/Comment').set(negative_comment);
  }
  firebase.database().ref('positive_comments').on('value',(data)=>{
	  var OurData=data.val();
	  var keys=Object.keys(OurData);
	  var list = document.getElementById("pcomment");
	  list.innerHTML="<h3>Positive Comments</h3>";
	  for(let i=keys.length-1;i>=0;i--)
	  {
		  let k=keys[i];
		  let keyString=k.toString();
		  let name=OurData[k].Name;
		  let comment=OurData[k].Comment;
		  let paragraph = document.createElement("p");
		  paragraph.innerHTML=`${name}: ${comment}`;
		  list.appendChild(paragraph);
		  
	  }
  })
  firebase.database().ref('negative_comment').on('value',(data)=>{
	  var OurData=data.val();
	  var keys=Object.keys(OurData);
	  var list = document.getElementById("ncomment");
	  list.innerHTML="<h3>Negative Comments</h3>";
	  for(let i=keys.length-1;i>=0;i--)
	  {
		  let k=keys[i];
		  let keyString=k.toString();
		  let name=OurData[k].Name;
		  let comment=OurData[k].Comment;
		  let paragraph = document.createElement("p");
		  paragraph.innerHTML=`${name}: ${comment}`;
		  list.appendChild(paragraph);
		  
	  }
  })