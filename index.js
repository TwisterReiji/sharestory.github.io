import './screens/register.js'
import './screens/login.js'
import './screens/story.js'
import './screens/header.js'
import './conponents/inputWrapper.js'
import './conponents/createPost.js'
import {getItemlocalStorage} from './utils.js'
import './conponents/postItem.js'
import './conponents/listPost.js'
checkAuthen()
async function checkAuthen() {
    const user= getItemlocalStorage('currenUser')
    if (user) {
        const res = await firebase.firestore().collection('users')
            .where('email','==',user.email)
            .where('password','==',user.password)
            .get()
            if (res.empty) {
                redirect('login')
            }
            else {
                redirect('story')
            }
        }
    else {
        redirect('login')

    }        
}
export function redirect(screenName) {
    if ( screenName === 'register' ) {
        document.getElementById('app').innerHTML=`
        <register-screen></register-screen>
        `    
    }
    else if (screenName == 'login' ) {
        document.getElementById('app').innerHTML=`
        <login-screen></login-screen>
        `
    }
    else if (screenName ==='story'){
        document.getElementById('app').innerHTML=`
        <story-screen></story-screen>
        `
    }
} 