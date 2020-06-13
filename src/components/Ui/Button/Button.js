import React from 'react'
import './Button.css'

const Button = props => {
	const cls = ['Button', props.uiType]
	if (props.extraClass) {
		cls.push(props.extraClass)
	}

	return (
		<button onClick={props.onClick}
		className={cls.join(' ')}
		disabled = {props.disabled}
		type={props.type}>
			{props.children}
		</button>
	)
}

export default Button
