import React from 'react'
import './Select.css'

const Select = ({input, meta, ...props}) => {
	return (
		<div className="Select">
			<label htmlFor="htmlFor">{props.label}</label>
			<select {...props} {...input}>{props.children}</select>
		</div>
	)
}

export default Select