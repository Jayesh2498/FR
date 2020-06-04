import React,{Component} from 'react';
import Navigation from './components/Nav/Navigation.js';
import Logo from './components/Logo/Logo.js';
import ImgLinkForm from './components/ImgLinkForm/ImgLinkForm.js';
import Rank from './components/Rank/Rank.js';
import FaceRecog from './components/FR/FaceRecog.js';
//import FaceRecogALL from './components/FR/FaceRecogALL.js'
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';
import './App.css'

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


class AppMultBox extends  Component {

    constructor(){
      super();
      this.state={
        input: '',
        imgURL : '',
        box: [],
      }
    }

    //BOXES
    calcFaceLoc=(data) =>{
      var i, eachBoxAtrb=[];
      const allRegions= data.outputs[0].data.regions;
      const image= document.getElementById('inputImg');
      const width=Number(image.width);
      const height = Number(image.height);

      for(i in allRegions){
        const eachBox = allRegions[i].region_info.bounding_box;
        //console.log("ALL BOX VALS",eachBox);
        const nBoxAtrb= {
          topRow:eachBox.top_row*height,
          leftCol: eachBox.left_col*width,
          bottomRow:height-(eachBox.bottom_row*height),
          rightCol:width-(eachBox.right_col*width),
         }
        eachBoxAtrb.push(nBoxAtrb);
      }
      return eachBoxAtrb;
    }

    dispFaceBox =(box)=>{
        this.setState(box = box);
        //console.log("BOX OBJECT", box);
    }

    //On Entering URL
    onInpChng=(event)=>{
      this.setState({input: event.target.value });
    }

    //On Clicking Detect Button
    onDetect= ()=>{

      console.log('click');
      this.setState({imgURL : this.state.input});

      app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
      .then( response=> this.dispFaceBox( this.calcFaceLoc(response) ))
      .catch(err=> console.log(err));
    }

    render(){
      return (
        <div>
          <Particles params={particleOpt} className='particles'/>
          <Navigation />
          <Logo />
          <Rank />
          <ImgLinkForm onInpChng={this.onInpChng} onDetect={this.onDetect} />
          <FaceRecog imgURL={this.state.imgURL} box={this.state.box} />
        </div>
      );
    }

}

export default AppMultBox;

