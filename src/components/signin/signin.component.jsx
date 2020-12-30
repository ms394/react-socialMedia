import React from 'react'
import './signin.styles.css'
import {auth} from '../../firebase/firebaseConfig'


class SignIn extends React.Component{
    constructor(){
        super()
        this.state = {
            email:'',
            password: ''
        }
    }

    handleSubmit = async (e)=>{
        const {email, password}= this.state
        e.preventDefault();
        try{
            await auth.signInWithEmailAndPassword(email,password)
            this.setState({email:'', password:''})
        }catch(error){
            console.log(error)
        }
        this.setState({email:'', password:''})
    }

    handleChange = (e)=>{
        const {name, value} = e.target
        this.setState({[name]:value})
    }


    render(){
        const {email, password}= this.state
        return(
            <div className="signInSection">
                <h2>Sign In</h2>
                <form className="signInForm" onSubmit={this.handleSubmit}>
                    <div className='formElement'>
                        <label htmlFor="email">Email</label>
                        <br />
                        <input
                            name="email"
                            type="email"
                            value={email}
                            onChange={this.handleChange}
                        />
                    </div>
                    <div className='formElement'>
                        <label htmlFor="password">Password</label>
                        <br />
                        <input
                            name="password"
                            type="password"
                            value={password}
                            onChange={this.handleChange}
                        />
                    </div>
                    <br />
                    <div className="btns">
                        <input type="submit" value="Sign In" />
                        <input type="button" value="Sign Up with Google"/>
                    </div>
                </form>
            </div>
        )
    }
}

export default SignIn