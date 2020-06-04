import React,{Component} from 'react';

class Register extends Component{
	
        constructor(props){
			super(props);
			this.state = {
                newName: '',
				newEmail: '',
				newPassword: ''
			}
		 }

		onNameChange = (event) =>{
        	this.setState({newName: event.target.value});
        }
        
        onEmailChange = (event) =>{
        	this.setState({newEmail : event.target.value});
        }

        onPasswordChange = (event) =>{
        	this.setState({newPassword: event.target.value})
        }

            

        onSubmitRegister =() =>{
        	//console.log('NEWWWWs',this.state);
        	fetch('http://localhost:3000/register', 
        		{method: 'post',
                 headers: {'Content-Type': 'application/json'},
                 body: JSON.stringify({
                 	name: this.state.newName,
                 	email: this.state.newEmail,
                 	password: this.state.newPassword
                 })
                }
            )
            .then(response => response.json())
            .then(user =>{
            	if(user){
            		this.props.loadUser(user)
            		this.props.onRouteChange('home')
            	}
            })
             //this.props.onRouteChange('home')
          }

       render(){

	    return(
			<div>
				 <article className="br3 ba dark-gray b--black-10 mv7 mw6 center shadow-5">
			        <div className=''>		 
			          <main className="pa4 black-80">
					    <div className='measure'>

						    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
						      <legend className="f2 fw6 ph0 mh0 tc">REGISTER</legend>

							      <div className="mt3">
							        <label className="db fw6 lh-copy f6" htmlFor="Name">Name</label>
							        <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
							               type="text" 
							               name="Name" 
							               id="Name"
							               onChange={this.onNameChange} />
							      </div>
							      <div className="mv3">
							        <label className="db fw6 lh-copy f6" htmlFor="email">Email</label>
							        <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
							               type="email" 
							               name="email"  
							               id="email"
							               onChange={this.onEmailChange} />
							      </div>
							      <div className="mv3">
							        <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
							        <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
							               type="password" 
							               name="password"  
							               id="password"
							               onChange={this.onPasswordChange} />
							      </div>
						    </fieldset>
						    {//REG
						    	}
						    <div className="tc">
						      <input 
							      className="f4 b ph3 pv2 input-reset dim ba b--black bg-transparent pointer dib" 
							      type="submit" value="Register" 
							      onClick={this.onSubmitRegister}/>
						    </div>
						    {//SIGN IN
						    	}
						    <div className="lh-copy mt3 tc">
					      		<p onClick={()=>this.props.onRouteChange('signin')}
					         	className="f5 link grow black db pointer">Already have an account?</p>
					    	</div>
						  </div>
					   </main>
					</div>
	      		</article>
			</div>
		);
	}
}

export default Register;