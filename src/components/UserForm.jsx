import React, {Component} from 'react'

const validate = values => {
    const errors = {}
    if(!values.name) {
        errors.name = 'Este campo es obligatorio'
    }
    if(!values.email) {
        errors.email = 'Este campo es obligatorio'
    }
    if(!values.website) {
        errors.website = 'Este campo es obligatorio'
    }
    return errors
}

export default class UserForm extends Component{
    state = {
        errors: {}
    }

    constructor(props) {
        super(props)
        this.state = {
            ...this.state,
            ...props.valoresIniciales
        }
    }

    handleChange = ({ target }) => {
        this.setState({
            [target.name]: target.value,
        })
    }

    handleSubmit = e => {
        e.preventDefault()
        const { errors, ...sinErrors } = this.state
        const result = validate(sinErrors)
        
        if (!Object.keys(result).length) {
            const { handleSubmit, handleUpdate, valoresIniciales } = this.props
            if (valoresIniciales.id) {
                handleUpdate(valoresIniciales.id, sinErrors)
            }else{
            handleSubmit(sinErrors)
            }
        } else{
            this.setState({ errors: result })
        }
        
    }

    render() {
        const { errors } = this.state
        const { valoresIniciales } = this.props

        return (
            <form onSubmit={this.handleSubmit} action="">
                <input type="text" defaultValue={valoresIniciales.name} placeholder="name" name="name" onChange={this.handleChange}/>
                {errors.name && <p>{errors.name}</p>}
                <input type="text" defaultValue={valoresIniciales.email} placeholder="email" name="email" onChange={this.handleChange}/>
                {errors.email && <p>{errors.email}</p>}
                <input type="text" defaultValue={valoresIniciales.website} placeholder="website" name="website" onChange={this.handleChange}/>
                {errors.website && <p>{errors.website}</p>}
                <input type="submit" value="Enviar"/>
            </form>
        )
    }
}