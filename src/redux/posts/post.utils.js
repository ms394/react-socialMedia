import {getAllComments} from '../../firebase/firebaseConfig'

export const addPostToState = (posts, newPost)=>{
    posts.push(newPost)
    return posts
}

// export const addCommentsToState = (allPosts)=>{
     
//     allPosts.forEach(async post => {
//         const allCommentsRef = await getAllComments(post.id)
//         allCommentsRef.onSnapshot(snapshot=>{
//                 var allComments = []
//                 snapshot.docs.forEach(comment=>{
//                     allComments.push({id: comment.id, ...comment.data()})
//                 })
//                 post.comments = allComments
//             }
            
//         )

//     });
//     let test = allPosts
//     return test
// }