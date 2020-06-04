import React from 'react';
import './FaceRecog.css'

const FaceRecog = ({imgURL, box}) => {
	return(
		<div className='center pv3 '>
			<div className='absolute mt2'>
					<img id="inputImg" src={imgURL} alt='' width='500px' height='auto' />

					<div className="bounding-box" 
					style={{top:box.topRow ,
							right:box.rightCol,
							bottom:box.bottomRow,
							left:box.leftCol}}>
					</div>
			</div>	
			
			{//bounding-box is class defined under clarify
				}
		</div>
	);
}

export default FaceRecog;