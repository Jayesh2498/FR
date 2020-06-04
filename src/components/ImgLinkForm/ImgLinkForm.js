import React from 'react';
import './ImgLinkForm.css'

const ImgLinkForm = ({onInpChng , onDetect}) =>{
	return(
		<div className='tc mt4'>
			<div className=''>
				<p className='f3 '>{'Enter URL to detect face'}</p>
			</div> 
			<div className='form center pa4 br3 shadow-5'>
					<input type='tex' className='center f4 pa2 w-70' onChange={onInpChng} />
					<button className='w-20 grow f4 link white dib pv1 ph3 b--near-black' onClick={onDetect}>Detect</button>
			</div>
		</div>
	);
}

export default ImgLinkForm;