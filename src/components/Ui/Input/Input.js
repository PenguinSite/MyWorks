import React from 'react'
import './Input.css'

const Input = ({field, form, ...props}) => {
	const cls = ['Input']
	return (
		<div className={cls.join(' ')}>
			<label htmlFor={field.name}>{props.label}</label>
			<input
				id={field.name}
				value={props.value}
				{...props} {...field}
			/>
			{form.errors && form.errors[field.name] ? <span style={{color: 'red'}}>{form.errors[field.name]}</span> : null}
		</div>
	)
}

export default Input
