import React from 'react';
import './FaceRecogAll.css'
import FaceRecognew from './FaceRecognew.js'


const FaceRecogAll = ({imgURL, box}) => {

	const eachBox = box.map((topRow,i)=>
		   		{
					return <FaceRecognew topRow={box[i].topRow}
                                     leftCol={box[i].leftCol}
                                     bottomRow={box[i].bottomRow}
                                     rightCol={box[i].rightCol}
                        />
                   // console.log(box[i]);
				}
		);

	return(
		<div className='center pv3 '>
			<div className='absolute mt2'>
                    <img id="inputImg" src={imgURL} alt='' width='500px' height='auto' />
					<div>{eachBox}</div>
			</div>
		</div>
	);
}

export default FaceRecogAll;