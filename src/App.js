import './App.css'
import React from 'react'
import Header from './components/header/header.component';
import {createStructuredSelector} from 'reselect'
import { connect } from "react-redux";
import SignInSignUpPage from './pages/signIn-signUp-page/signInsignUp.component'
import { setCurrentUser } from "./redux/users/users.actions";
import {selectCurrentUser} from './redux/users/user.selector'
import {auth, createUserProfile} from './firebase/firebaseConfig'
import {
  Switch,
  Route,
} from "react-router-dom";
import HomePage from './pages/homepage/homepage.components';
import {getAllPost} from './firebase/firebaseConfig'
import {setPost, addCommentsToState} from './redux/posts/posts.actions'
import PostDetailsPage from './pages/postDetails/postDetails.component'


class App extends React.Component{
  unsubscribeFromAuth = null;

  async componentDidMount() {
    const { setCurrentUser, setPosts } = this.props;
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const userRef = await createUserProfile(userAuth);
        userRef.onSnapshot((snapShot) => {
          setCurrentUser({
            id: snapShot.id,
            ...snapShot.data(),
          });
        });
        
      } else {
        setCurrentUser(userAuth);
      }
    });
    
    // Get all the posts
    const postsRef = await getAllPost()
    postsRef.onSnapshot(snapshot=>{
        const allPosts = []
        snapshot.docs.forEach(post=>{
          allPosts.push({id: post.id, ...post.data()})
        })
        setPosts(allPosts)
    })
   
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render(){
    console.log(this.props) 
    return (
      <div className='App'>
        <Header currentUser={this.props.currentUser}/>
        <Switch>
          <Route exact path='/home' render={()=>this.props.currentUser?(<HomePage/>): (<SignInSignUpPage/>)}/>
          <Route exact path='/' render={()=>this.props.currentUser?(<HomePage/>): (<SignInSignUpPage/>)}/>
          {/* <Route exact path='/post/:postId' render={()=>this.props.currentUser?(<PostDetailsPage/>): (<SignInSignUpPage/>)}/> */}
        </Switch>
      </div>
      
  
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
})

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
  setPosts : (posts)=>dispatch(setPost(posts)),
  addComments: ()=>dispatch(addCommentsToState())
});


export default connect(mapStateToProps, mapDispatchToProps)(App);
