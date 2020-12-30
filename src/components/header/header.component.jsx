import React from 'react'
import {createStructuredSelector} from 'reselect'
import { auth, getAllNotifications } from "../../firebase/firebaseConfig";
import { connect } from "react-redux";
import './header.styles.css'
import { Link } from "react-router-dom";
import {selectCurrentUser} from '../../redux/users/user.selector'

class Header extends React.Component{
    constructor(){
        super()
        this.state = {
            notificationPopup : false,
            notifications: []
        }
    }

    async componentDidUpdate(){
        const {currentUser} = this.props
        if(currentUser){
            const notificationsRef = await getAllNotifications(currentUser.id)
            notificationsRef.onSnapshot(snapshot=>{
                const notifications = []
                snapshot.docs.forEach(doc=>{
                    notifications.push({id: doc.id, ...doc.data()})
                })
                this.setState({
                    notifications : [...notifications]
                })
            })
            
        }
    }

    render(){
        const {currentUser} = this.props
        return (
            <header>
                <div className="container">
                    <div className="headerContent">
                        <div className="logo">
                            <h1>SOCIAL</h1>
                        </div>
                        <nav>
                            <ul>
                                <li className={`notification ${this.state.notifications?'dot':null} `} onClick={()=>this.setState({notificationPopup:!this.state.notificationPopup})}>
                                    Notification
                                    <div className={`notificationPopup ${this.state.notificationPopup?'show':'hide'}`}>
                                       
                                        <ul>        
                                            {this.state.notifications.map(notification=>{
                                                    if(notification.activity==='like'){
                                                        return <li key={notification.id}><strong>{notification.displayName}</strong>  liked your post</li>
                                                    }
                                                }
                                            )}
                                        </ul>
                                    </div>
                                </li>
                                <li>My Account</li>
                                {currentUser ? (
                                    <li onClick={() => auth.signOut()}>Sign Out
                                    </li>
                                ) : (
                                    <Link className="option" to="/signin">
                                    SIGN IN
                                    </Link>
                                )}
                            </ul>
                        </nav>
                    </div>
                </div>
            </header>
        )
    }
} 

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
  })
  
  export default connect(mapStateToProps)(Header);