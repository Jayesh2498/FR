import React from 'react';
import './FaceRecognew.css'

const FaceRecognew = ({topRow,leftCol,bottomRow,rightCol}) => {
	return(
			<div className='absolute mt2'>
					<div className="bounding-box" 
					style={{top: topRow ,
						    right:rightCol,
						    bottom:bottomRow,
							left:leftCol}}>
					</div>	
			</div>
	);
}

export default FaceRecognew;