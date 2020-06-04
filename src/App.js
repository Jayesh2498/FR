import React,{Component} from 'react';
import './App.css';
import Navigation from './components/Nav/Navigation.js';
import SignIn from './components/SignIn/SignIn.js'
import Register from './components/Register/Register.js'
import Logo from './components/Logo/Logo.js';
import ImgLinkForm from './components/ImgLinkForm/ImgLinkForm.js';
import Rank from './components/Rank/Rank.js'
import FaceRecog from './components/FR/FaceRecog.js'

import Particles from 'react-particles-js';
import Clarifai from 'clarifai';

//Background effect
const particleOpt={ particles: {
                      number:{ value:130 , density:{enable: true,value_area:800}},
                      line_linked: {shadow: {enable: true,color: "#3CA9D1",blur: 5}
                      },
                      anim: {enable : true}
                    },  
                  }

// Face Detect API
const app = new Clarifai.App({apiKey: 'c9e830592ba64d9cafc7d559bc1cae29'});


class App extends  Component {

    constructor(){
      super();
      this.state={
        input: '',
        imgURL : '',
        box: {},
        route: 'signin', //tacks where we re on page
        user:{
          id : "",
          name : "",
          email : "",
          entries : 0,
          joined: ''
        },
      }
    }

   /* componentDidMount(){
      fetch('http://localhost:3000')
      .then(response => response.json())
      .then(console.log())
    }*/

    loadUser = (data) =>{
      this.setState({data:{
        id : data.id,
          name : data.name,
          email : data.email,
          entries : data.entries,
          joined: data.joined
      }})
    }

    //BOXES
    calcFaceLoc=(data) =>{
      const posAtrb= data.outputs[0].data.regions[0].region_info.bounding_box;//returns pos of dots in %
      const image= document.getElementById('inputImg');
      const width=Number(image.width);
      const height = Number(image.height);
      //console.log(width,height);
      //console.log(posAtrb);
      return{
        topRow:posAtrb.top_row*height,
        leftCol: posAtrb.left_col*width,
        bottomRow:height-(posAtrb.bottom_row*height),
        rightCol:width-(posAtrb.right_col*width),
      }
    }

    dispFaceBox =(box)=>{
        this.setState({box: box});
        console.log("BOX OBJECT", box);
    }

    //On Entering URL
    onInpChng=(event)=>{
      this.setState({input: event.target.value });
    }

    //On Clicking Detect Button
    onDetect= ()=>{
       //console.log('click');
       this.setState({imgURL : this.state.input});
       app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
        .then(response=>{ 
            /*if(response){
                fetch('http://localhost:3000/image',
                  {method: 'put',
                   headers: {'Content-Type': 'application/json'},
                   body: JSON.stringify({
                     id: this.state.user.id
                    })
                  })
                /*.then(response=> response.json())
                .then(count => {
                  this.setState({user:{entries:count}})
                })
              }*/
            this.dispFaceBox(this.calcFaceLoc(response)) 
          })
      .catch(err=> console.log(err));
    }

    onRouteChange = (route) =>{
      this.setState({route: route})
    }

    render(){
      const {input,imgURL,box,route} = this.state;
      return (
        <div>
          <Particles params={particleOpt} className='particles'/>
          {route === 'home'? 
           //HOME PAGE
            <div>
              <Navigation onRouteChange={this.onRouteChange} />
              <Logo />
               {//<Rank name={this.state.user.name} entries={this.state.user.entries}/>
                  }
              <ImgLinkForm onInpChng={this.onInpChng} onDetect={this.onDetect} />
              <FaceRecog imgURL={imgURL} box={box} />
            </div>
            //
            : (route === 'signin'?       
                    <SignIn onRouteChange={this.onRouteChange} loadUser={this.loadUser}/>
                :     
                    <Register onRouteChange={this.onRouteChange} loadUser={this.loadUser}/>
              )
          }
        </div>
      );
    }

}

export default App;

