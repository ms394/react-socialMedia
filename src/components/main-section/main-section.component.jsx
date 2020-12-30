import React from 'react'
import ContentArea from '../content-area/content-area.component'
import SidePanel from '../side-panel/side-panel.component'
import './main-section.styles.css'
import {connect} from 'react-redux'
import { setPost, addCommentsToState} from '../../redux/posts/posts.actions'

class MainSection extends React.Component {
    componentDidMount(){    
        // Get all Comments and add it to State
        this.props.addComments()
        
    }
    render(){
        {this.props.addComments()}
        return(
            <main>
                <ContentArea/>
                <SidePanel/>
            </main>
            
        )
    }
} 

const mapDispatchToProps = (dispatch)=>({
    setPosts : (posts)=>dispatch(setPost(posts)),
    addComments: ()=>dispatch(addCommentsToState())
})
export default connect(null,mapDispatchToProps)(MainSection)