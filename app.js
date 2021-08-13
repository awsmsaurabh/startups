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
	  Swal.fire({
	  position: 'center',
	  icon: 'success',
	  title: 'Thanks',
	  showConfirmButton: false,
	  timer: 1500
	})
	  var name=document.getElementById("name").value;
	  localStorage.setItem("NAME",name);
	  document.getElementById("name").value="";
	  var email=document.getElementById("email").value;
	  document.getElementById("email").value="";
	  var mobile=document.getElementById("mobile").value;
	  document.getElementById("mobile").value="";
	  var investor=document.getElementById("investor").checked;
	  document.getElementById("investor").checked=false;
	  var startups=document.getElementById("startups").checked;
	  document.getElementById("startups").checked=false;
	  var experience=document.getElementById("experience").checked;
	  document.getElementById("experience").checked=false;
	  var finance=document.getElementById("finance").checked;
	  document.getElementById("finance").checked=false;
	  var message=document.getElementById("message").value;
	  document.getElementById("message").value="";
	  
	  var newMessagekey=database.ref().child('surveys').push().key;
	  localStorage.setItem("UID",newMessagekey);
	  
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
	var name=localStorage.getItem("NAME");
	var uid=localStorage.getItem("UID");
	var positive_comment=document.getElementById("positive_comment").value;
	document.getElementById("positive_comment").value = "";
	
	  if (positive_comment!=""){
		 var newMessagekey=database.ref().child('positive_comments').push().key;
		  if(name=="")
			  name="unknown user";

		  database.ref('positive_comments/'+newMessagekey+'/Name').set(name);
		  database.ref('positive_comments/'+newMessagekey+'/Comment').set(positive_comment);
		  database.ref('positive_comments/'+newMessagekey+'/UID').set(uid);
	  }
  }
  function postNComment()
  {
	  var name=localStorage.getItem("NAME");
	  var uid=localStorage.getItem("UID");
	  var negative_comment=document.getElementById("negative_comment").value;
	  document.getElementById("negative_comment").value="";
	  if (negative_comment!=""){
		  var newMessagekey=database.ref().child('negative_comments').push().key;
		  
		  if(name=="")
			  name="unknown user";
		  
		  database.ref('negative_comments/'+newMessagekey+'/Name').set(name);
		  database.ref('negative_comments/'+newMessagekey+'/Comment').set(negative_comment);
		  database.ref('negative_comments/'+newMessagekey+'/UID').set(uid);
	  }
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
  firebase.database().ref('negative_comments').on('value',(data)=>{
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
  function viewPcomment() {
	  document.getElementById("viewcomment").src = "pcomment.html";
	}
	function viewNcomment() {
		document.getElementById("viewcomment").src = "ncomment.html";
	}