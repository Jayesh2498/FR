import React,{Component} from 'react';

class SignIn extends Component{

        constructor(props){
			super(props);
			this.state = {
				signInEmail: '',
				signInPassword: '',
			}
		}
        
        onEmailChange = (event) =>{
        	this.setState({signInEmail : event.target.value});
        }

        onPasswordChange = (event) =>{
        	this.setState({signInPassword: event.target.value})
        }

        onSubmitSignIn =(event) => {
        	//console.log('In the onSubmitSignIn function')
        	
        	fetch('http://localhost:3000/signin', 
        		{method: 'POST',
                 headers: {'Content-Type': 'application/json'},
                 body: JSON.stringify({
                 	email: this.state.signInEmail,
                 	password: this.state.signInPassword
                 })
                }
            )
            .then(response => response.json())
            /*.then(data => {
            	if(data == 'success'){ // === 'success'){
            	   //console.log('dataSUCCESS',data);
                   this.props.onRouteChange('home')
            	}
            })*/
            .then(user => {
            	if(user.id){
            		this.props.loadUser(user);
            		this.props.onRouteChange('home');
            	}
            })
            .catch(err => {console.log("sign in error, enter valid name and password, frontend")})
           // event.preventDefault();
            //this.props.onRouteChange('home');
        }

	render(){
		return(
	        <article className="br3 ba dark-gray b--black-10 mv7 mw6 center shadow-5">
		        <div className=''>		 
		          <main className="pa4 black-80">
					  <div className='measure'>
					    
                        {//FORM
                        	//
                        	//<form className="measure" action='POST' onSubmit={this.onSubmitSignIn}>
                          }
                         
                           
					    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">

						      <legend className="f2 fw6 ph0 mh0 tc">SIGN IN</legend>

						      <div className="mt3">
						        <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
						        <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
						               type="email" 
						               name="email-address" 
						               id="email-address" 
						               onChange = {this.onEmailChange}/>
						      </div>

						      <div className="mv3">
						        <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
						        <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
						               type="password" name="password"  
						               id="password" 
						               onChange ={this.onPasswordChange}/>
						      </div>

					    </fieldset>

					    {//Sign In SUBMIT
					    		}
					    <div className="tc">
					      <input 
						      className="f4 b ph3 pv2 input-reset dim ba b--black bg-transparent pointer dib" 
						      type="submit" value="Sign in"
						      onClick={this.onSubmitSignIn} 
						      />
					    </div>
					    {
					    	//REGISTER
					    }
					    <div className="lh-copy mt3 tc">
					      <p onClick={()=>this.props.onRouteChange('register')}
					         className="f5 link grow black db pointer">Register</p>
					    </div>
                      
                      </div>
                      {//</form>

                      }
					  
					  </main>
				</div>
	      </article>
	    );
	}
}

export default SignIn;
