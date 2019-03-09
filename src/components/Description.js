import React from "react";

const Description = props => (
	<div>
	 { 	
	 	props.description && <p className="description">{ props.description }</p> 
	 }
	</div>
);

export default Description;