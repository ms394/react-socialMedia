import React from 'react'
import { auth } from "../../firebase/firebaseConfig";
import './header.styles.css'
import { Link } from "react-router-dom";


class Header extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            notificationPopup : false,
            notifications: []
        }
    }

    componentDidUpdate(prevProps,prevState){
        if (prevProps.currentUser !== this.props.currentUser) {
            this.setState({...this.state, notifications:this.props.currentUser.notifications})
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
                                {currentUser!==null ? (
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


export default Header;