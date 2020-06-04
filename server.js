const express = require('express');
const app = express();

const bcrypt= require('bcrypt-nodejs');//password 

const cors = require('cors'); //allow access to other severs

/*

SERVER CONFIG.

url/                 : respond if working or not
url/signin           : POST ---> success/fail
url/register         : POST ---> new user details
url/profile/:userId  : GET  <--- user details
url/image            : PUT  ---> update user

*/

//DB
const database ={
	users: [
		  {
			id : "1",
			name : "JD",
			email : "jayesh2411@gmail.com",
			password: "hey",
			entries : 0,
			joined: new Date(),
		  },
		  {
			id : "2",
			name : "Tony Stark",
			email : "tony@gmail.com",
			password:"cookies",
			entries : 0,
			joined: new Date(),
		  }
	],

	login : [
		{
			id: '1',
			hash: '',
			email: "jayesh2411@gmail.com"
		},
		{
			id: '2',
			hash: '',
			email: "iamironman@gmail.com"
		}
	]
}

app.use(express.json());
app.use(cors());

// url/
app.get('/', (req,res)=>{
	res.send(database.users);
})

// url/signin
	/*bcrypt.compare("bacon", hash, function(err, res) {
	    // res == true
	});*/

app.post('/signin',(req,res)=>{
	let count = database.users.length-1,i=0,found=false;
 	for (i;i<=count;i++)
	{
	    if( req.body.email == database.users[i].email &&
	    	req.body.password == database.users[i].password) 
	    {
	    	found=true;
	    	res.json(database.users[i]);
	    	//res.json('success');
	    }
	}
    if(found==false){
    	res.json('error logging in');
    }
})


//url/register
app.post('/register',(req,res)=>{
    const {email,name,password} = req.body;
    let count = database.users.length;

    /*bcrypt.hash(password, null, null, function(err, hash) {
   		 // Store hash in your password DB.
   		 //password = hash;
   		 console.log('Hash', hash)
	});*/

    database.users.push({
    	 id : count+1 ,
		 name : name,
		 email : email,
		 password : password,
		 entries : 0,
		 joined : new Date()
	})
    res.json(database.users[database.users.length-1]);
})

//url/profile/id
app.get('/profile/:id',(req,res)=>{
    //res.send("PROFILE IS WORKING")
    const {id} = req.params;//req.params.id  
    console.log(id); 
    let found = false;
    database.users.forEach(user =>{
    	if(user.id === id){
            found = true ;
    		res.json(user);
    	}
    })
    if(!found){
       res.status(400).json('INVALID USER');
   	}
})

// update entries : url/image 
app.put('/image',(req,res)=>{
    const {id} = req.body;//req.params.id   
    let found = false;
    database.users.forEach(user =>{
    	if(user.id === id){
            found = true ;
            user.entries++;
    		res.json(user.entries);
    	}
    })
    if(!found){
       	res.status(400).json('INVALID USER');
    }
})

/*bcrypt.hash(password, null, null, function(err, hash) {
   		 // Store hash in your password DB.
   		 //password = hash;
   		 console.log('Hash', hash)
	});*/

/*bcrypt.compare("bacon", hash, function(err, res) {
	    // res == true
	});*/

app.listen(3000, ()=>{console.log("Running on port 3000.")})