import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'

const config = {
    apiKey: "AIzaSyBYE1oI-Cu-E70VZoGf2JTfaEc2fotO-zM",
    authDomain: "testproject-4d5e0.firebaseapp.com",
    projectId: "testproject-4d5e0",
    storageBucket: "testproject-4d5e0.appspot.com",
    messagingSenderId: "579139708028",
    appId: "1:579139708028:web:c3788b42eb023c56bf95f9",
    measurementId: "G-JYWM7EB8KZ"
};

// Create a user in firebase
export const createUserProfile = async (userAuth, additionalData)=>{
    if(!userAuth)  return;
    const userRef =  firestore.doc(`users/${userAuth.uid}`)
    const snapshot = await userRef.get()
    if(!snapshot.exists){
        const {displayName, email} = userAuth;
        const createdAt = new Date();
        try{
            await userRef.set({
                displayName,
                email,
                createdAt,
                notifications:[],
                ...additionalData
            })
        }catch(error){
            alert(error.message);
        }
    }
    return userRef
}

// Create a post in firebase
export const createPostDocument = async (user,{post, imageUrl})=>{
    if(!post) return false
    const postRef = firestore.collection(`posts`)
    const snapshot = await postRef.get()
    if(!snapshot.exists){
        const createdAt = new Date();
        try{
            await postRef.add({
                post,
                imageUrl,
                createdAt,
                author: user,
                likes: [],
                comments:[]
            })
        }catch(error){
            console.log(error.message)
        } 
    }
    return postRef
}

// Get All the posts in the firebase
export const getAllPost = async ()=>{
    const postsRef = firestore.collection("posts").orderBy("createdAt", "desc")
    return postsRef
}   

// Add Likes to the Post in firebase
export const addLikeToPost = async (postSent,userId, displayName)=>{
    const postId = postSent.id
    const postRef = firestore.collection('posts').doc(postId)
    const snapshot = await postRef.get()
    const post = await snapshot.data()

    if(post.likes.includes(userId)){
        function removelike(userId){
            const likes = post.likes.filter(el=>el!==userId)
            return likes
        }
        try {
            await postRef.set({
                ...post,
                likes: removelike(userId)
            })
        }catch(error){
            console.log(error);
        }
        
    }else{
        function addlike(userId){
            post.likes.push(userId)
            return post.likes
        }
        try{
            addActivity(postSent, userId, displayName, 'like')
            postRef.set({
                ...post,
                likes: addlike(userId)
            })
        }catch(error){
            console.log(error);
        }
    } 
}


// Add Comments to a Post. 
export const addCommentToPost = async (comment, user, postId)=>{
    const postRef = firestore.collection('posts').doc(postId)
    const snapshot = await postRef.get()
    const post = await snapshot.data()
    function addComment(user, comment){
        post.comments.push({user:user, comment:comment})
        return post.comments
    }
    try {
        await postRef.set({
            ...post,
            comments: addComment(user,comment)
        })
    }catch(error){
       alert(error.message);
    }
    
}
// Add the activity in the notification node of a user.
export const addActivity = async (post, userId, displayName, activity)=>{
        const authorId = post.author.id
        const userRef = firestore.collection('users').doc(authorId)
        const snapshot = await userRef.get()
        const user = await snapshot.data()

        function addNotifications(userId, displayName, post, activity){
            user.notifications.push({
                postId: post.id,
                userId,
                displayName,
                activity
            })
            return user.notifications
        }
        try{
            await userRef.set({
                ...user,
                notifications: addNotifications(userId, displayName, post, activity)
            })
        }catch(error){
            alert(error.message)
        }
}


if (!firebase.apps.length) {
    firebase.initializeApp(config);
}

export const auth = firebase.auth()
export const firestore = firebase.firestore()
export const storage = firebase.storage();

export default firebase