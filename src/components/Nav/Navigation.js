import React from 'react';

const Navigation = ({onRouteChange}) =>{
	return(
			<nav style={{display: 'flex', justifyContent: 'flex-end'}}>
				<p className = 'f4 link dim black bt bb pa1 ma2 pointer'
				   onClick={()=>onRouteChange('signin')}>
				    Sign Out
				</p>
			</nav>
	);
}

export default Navigation;