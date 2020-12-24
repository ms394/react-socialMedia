import React from 'react'
import './signInsignUp.styles.css'
import SignIn from '../../components/signin/signin.component'
import SignUp from '../../components/signup/signup.component'

const SignSignUpPage = ()=>(
    <div className="formSection">
        <SignIn/>
        <SignUp/>
    </div>

)

export default SignSignUpPage