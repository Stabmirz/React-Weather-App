import React from "react";

const Location = props => (
	<div>
	 {	
	 	props.city && props.country && <p className="location">
	 	{ props.city }, { props.country }
	 	</p> 
	 }
	</div>
);

export default Location;