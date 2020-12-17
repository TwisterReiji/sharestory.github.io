const style=`
.login-container {
    width: 100vw;
    height: 100vh;
    background: url('https://s2.best-wallpaper.net/wallpaper/3840x2160/1809/Your-Name-beautiful-sky-meteor-anime_3840x2160.jpg');
    background-repeat:no-repeat;
    background-size:cover;
    display:flex;
    justify-content:flex-end;
}
#login-form {
    width:30%;
    background:#ffff;
    height:100vh;
    padding:0px 20px;
}
h1{
    text-align:center:
    color:#333;
}
button {
    background:#1565C0;
    color:#fff;
    padding:10px 15px;
    border-radius:5px
}
`
import {redirect} from '../index.js'
import {getDataFromDocs , saveTolocalStorage} from '../utils.js'
class loginScreen extends HTMLElement{
    constructor(){
        super()
        this._ShadowRoot=this.attachShadow({mode:'open'})
    }
    connectedCallback(){
        this._ShadowRoot.innerHTML=`
        <style>${style}</style>
        <div class="login-container">
           <form id="login-form">
               <h1>CI Project</h1>
               <input-wrapper id="email" type="text" placeholder="Email"></input-wrapper>
               <input-wrapper id="password" type="password" placeholder="Password"></input-wrapper>
               <button>login</button>
               <a id="redirect">Don't have an account ? login</a>
           </form>
        </div>
        `
        const loginForm=this._ShadowRoot.getElementById('login-form')
        loginForm.addEventListener('submit', async(e) => {

            e.preventDefault()
            // console.log('submit')
            // console.log(this._ShadowRoot.getElementById('first-name').Value);
            const email=this._ShadowRoot.getElementById('email').value
            const password=this._ShadowRoot.getElementById('password').value
            // Khai báo giá trị isValid
            let isValid = true
            // string.trim loại bỏ dấu cách ở 2 đầu dấu cách ở giữa vẫn còn  
            if ( email.trim()==='') {
                isValid=false
                // this._ShadowRoot.getElementById('email').setAttribute('error','please input email')
                this.setError('email','please input email')
            }
            if ( password.trim()==='') {
                isValid=false
                // this._ShadowRoot.getElementById('password').setAttribute('error','please input password')
                this.setError('password','please input password')
            }
            // Nếu giá trị isValid False thì nó sẽ ko chạy quá trình bên dưới nữa
            if (!isValid) {
                return
            }
            // Chuyển dữ liệu từ người nhập lên 
            const user = await firebase.firestore().collection('users')
            .where('email','==',email)
            .where('password','==',CryptoJS.MD5(password).toString())
            .get()
            if (user.empty) {
                alert('Sai email/ password') 
            }
            else {
                saveTolocalStorage('currenUser',getDataFromDocs(user)[0])
                redirect('story')
            }
        })
        this._ShadowRoot.getElementById('redirect').addEventListener('click',() => {
            redirect('register')
        })    
    }
    // tạo function để làm gọn câu lệnh ở phần điều kiện của người dùng nhập vào
    setError(id,message){
        this._ShadowRoot.getElementById(id).setAttribute('error',  message)
    }
}
window.customElements.define('login-screen', loginScreen)


