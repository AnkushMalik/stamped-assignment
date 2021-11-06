import React from 'react'

export const Context = React.createContext()

export function useGlobalState() {
	return React.useContext(Context)
}

export class GlobalStateProvider extends React.Component {
	// Set the initial global state object as empty object
	// which we will update accordingly in children components
	constructor() {
		super()
		this.state = {}
	}

	set(key, val) {
		this.setState({ [key]: val })
	}

	render() {
		return (
			<Context.Provider
				value={Object.assign(this.state, {
					set: (key, value) => this.set(key, value),
				})}
			>
				{this.props.children}
			</Context.Provider>
		)
	}
}
