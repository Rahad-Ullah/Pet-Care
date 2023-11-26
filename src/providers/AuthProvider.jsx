import { createContext, useEffect, useState } from "react";
import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import app from "../../firebase.config"


export const AuthContext = createContext(null)

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider()

const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    const createUser = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const signIn = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }

    const googleSignIn = () => {
        setLoading(true)
        return signInWithPopup(auth, googleProvider)
    }

    const logout  = () => {
        setLoading(true)
        return signOut(auth)
    }

    const updateUser = (name, photo) => {
        return updateProfile(auth.currentUser, {
            displayName: name, photoURL: photo
        })
    }

    useEffect( () => {
        const unsubscribe =  onAuthStateChanged(auth, currentUser => {
            setUser(currentUser)
            // if(currentUser){
            //     // get token and store in cookie
            //     const userInfo = {email: currentUser.email}
            //     axiosPublic.post('/jwt', userInfo)
            //     .then(res => {
            //         if(res.data.token){
            //             localStorage.setItem('access-token', res.data.token)
            //         }
            //     })
            // }
            // else{
            //     localStorage.removeItem('access-token');
            // }
            
            console.log('current user: ', currentUser)
            setLoading(false)
        })
        return () => {
            return unsubscribe();
        }
    } , [])

    const authInfo = {
        user,
        loading,
        setLoading,
        createUser, 
        updateUser,
        signIn,
        googleSignIn,
        logout,
    }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;