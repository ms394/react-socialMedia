import React from 'react'
import './signup.styles.css'
import {createUserProfile, auth, storage} from '../../firebase/firebaseConfig'

class SignUp extends React.Component{
    
    constructor(){
        super();
        this.state= {
            email:'',
            displayName: '',
            password:'',
            confirmPassword:'',
            imageUrl: 'https://firebasestorage.googleapis.com/v0/b/testproject-4d5e0.appspot.com/o/userImages%2Fprofile-icon-png-917.png?alt=media&token=a82b3fe6-7651-46ae-be2c-201c4df8c976'
        }
    }

    handleChange = async (e)=>{
        const {name, value} = e.target;
        this.setState({
            [name]:value
        })
    }

    handleFileChange =(e)=>{
        const file = e.target.files[0]
        var storageRef = storage.ref(`userImages/${file.name}`)
        var task = storageRef.put(file)
        task.on('state_changed',
            function progress(snapshot){
                // var percentage = (snapshot.bytesTransferred/snapshot.totalBytes ) * 100;
                // //uploader.value = percentage
            },
            function error(error){
                alert(error.message)
            },
            function complete(){
                task.snapshot.ref.getDownloadURL().then(downloadUrl =>{
                    this.setState({
                        imageUrl: downloadUrl
                    })
                })
            }.bind(this)
        ).bind(this)
    }

    handleSubmit = async (e)=>{
        e.preventDefault()
        const {email,displayName,password,confirmPassword, imageUrl} = this.state
        if(password===confirmPassword){
            try{
                const {user} = await auth.createUserWithEmailAndPassword(email,password)
                await createUserProfile(user, {displayName, imageUrl})
                this.setState({
                    email:'',
                    displayName:'',
                    password:'',
                    confirmPassword:'',
                    imageUrl: 'https://firebasestorage.googleapis.com/v0/b/testproject-4d5e0.appspot.com/o/userImages%2Fprofile-icon-png-917.png?alt=media&token=a82b3fe6-7651-46ae-be2c-201c4df8c976'

                })
            }catch(error){
                alert(error.message)
                this.setState({
                    email:'',
                    displayName:'',
                    password:'',
                    confirmPassword:'',
                    imageUrl: 'https://firebasestorage.googleapis.com/v0/b/testproject-4d5e0.appspot.com/o/userImages%2Fprofile-icon-png-917.png?alt=media&token=a82b3fe6-7651-46ae-be2c-201c4df8c976'
                })
            }
        }else{
            alert("Passwords do not match")
        }
    }

    render(){
        const {email,displayName,password,confirmPassword} = this.state
        return(
            <div className="signUpSection">
                <h2>Sign Up</h2>
                <form onSubmit={this.handleSubmit} className="signUpForm">
                    <div className='formElement'>
                        <label htmlFor="email">Email</label>
                        <br />
                        <input
                            name="email"
                            type="email"
                            value = {email}
                            onChange={this.handleChange}
                        />
                    </div>
                    <div className='formElement'>
                        <label htmlFor="email">Display Name</label>
                        <br />
                        <input
                            name="displayName"
                            type="text"
                            value = {displayName}
                            onChange={this.handleChange}
                        />
                    </div>
                    <div className='formElement'>
                        <label htmlFor="password" >Password</label>
                        <br />
                        <input
                            name="password"
                            type="password"
                            value={password}
                            onChange={this.handleChange}
                        />
                    </div>
                    <div className='formElement'>
                        <label htmlFor="confirmPassword">Confirm Password</label>
                        <br />
                        <input
                            name="confirmPassword"
                            type="password"
                            value= {confirmPassword}
                            onChange={this.handleChange}
                        />
                    </div>
                    <div className='formElement'>
                        <label htmlFor="file">Profile Picture</label>
                        <input type="file" name="file" id="addImage" className="imageUpload" accept=".png,.jpg" onChange={this.handleFileChange} />
                    </div>
                    
                    <br />
                    <input type="submit" value="Sign Up" />
                    <br />
                </form>
            </div>
        )
    }
}

export default SignUp