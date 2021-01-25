import React from 'react'
import './createPost.styles.css'
import {createPostDocument, storage} from '../../firebase/firebaseConfig'
import {selectCurrentUser} from '../../redux/users/user.selector'
import {connect} from 'react-redux'
import {createStructuredSelector} from 'reselect'


class CreatePost extends React.Component{
    constructor(){
        super()
        this.state={
            post:'',
            imageUrl: '',
        }
    }
    handleSubmit = async (e)=>{
        e.preventDefault()
        const {post, imageUrl} = this.state
        if(post || imageUrl){
            try{
                await createPostDocument(this.props.currentUser, {post, imageUrl})
                this.setState({post:"", imageUrl:""})
            }catch(error){
                console.log(error)
            }
        }else{
            alert('Enter Text or Upload Image')
        }
        
    }

    handleChange =(e)=>{
        const {name, value}= e.target
        this.setState({[name]:value})
    }

    handleFileChange =(e)=>{
        const file = e.target.files[0]
        var storageRef = storage.ref(`postImages/${file.name}`)
        var task = storageRef.put(file)
        task.on('state_changed',
            function progress(snapshot){
                // var percentage = (snapshot.bytesTransferred/snapshot.totalBytes ) * 100;
                //uploader.value = percentage
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

    render(){
        return(
            <div className="createPostWrapper">
                <h2>Create a Post</h2>
                <form className='createPost' onSubmit={this.handleSubmit}>
                    <input type="file" name="" id="addImage" className="imageUpload" accept=".png,.jpg" onChange={this.handleFileChange} />
                    <textarea name="post" id="" cols="30" rows="5" placeholder="Write your thoughts..." onChange={this.handleChange} value={this.state.post} />
                    <input type="submit" value="CREATE POST" onClick={this.handleSubmit}/>
                </form>
            </div>
        )
    }
}

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser
})

export default connect(mapStateToProps)(CreatePost)