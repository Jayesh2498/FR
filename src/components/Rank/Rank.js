import React from 'react';

const Rank = ({name,entries}) =>{
	return(
		<div className='mt5 mb3'>
			<div className='white f3 tc'>
				{`${name} , your current rank is...`}
			</div>
			<div className='white f1 tc'>
				{entries}
			</div>
		</div>
	);
}

export default Rank;