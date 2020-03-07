import React from 'react'
import './Input.css'

const Input = ({input, meta, ...props}) => {
	const inputType = props.type || 'text'
	const cls = ['Input']
	const htmlFor = `${inputType}-${Math.random()}`
	return (
		<div className={cls.join(' ')}>
			<label htmlFor={htmlFor}>{props.label}</label>
			<input
				type={inputType}
				id={htmlFor}
				value={props.value}
				{...props} {...input}
			/>
			{meta.error && meta.touched ? <span style={{color: 'red'}}>{meta.error}</span> : null}

		</div>
	)
}

export default Input