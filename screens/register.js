const style=`
.register-container {
    width: 100vw;
    height: 100vh;
    background: url('https://s2.best-wallpaper.net/wallpaper/3840x2160/1809/Your-Name-beautiful-sky-meteor-anime_3840x2160.jpg');
    background-repeat:no-repeat;
    background-size:cover;
    display:flex;
    justify-content:flex-end;
}
#register-form {
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
class RegisterScreen extends HTMLElement{
    constructor(){
        super()
        this._ShadowRoot=this.attachShadow({mode:'open'})
    }
    connectedCallback(){
        this._ShadowRoot.innerHTML=`
        <style>${style}</style>
        <div class="register-container">
           <form id="register-form">
               <h1>CI Project</h1>
               <input-wrapper id="first-name" type="text" placeholder="First name"></input-wrapper>
               <input-wrapper id="last-name" type="text" placeholder="Last name"></input-wrapper>
               <input-wrapper id="email" type="text" placeholder="Email"></input-wrapper>
               <input-wrapper id="password" type="password" placeholder="Password"></input-wrapper>
               <input-wrapper id="repeat" type="password" placeholder="Repeat"></input-wrapper>
               <button>Register</button>
               <a id="redirect">Already have an account ? Login</a>
           </form>
        </div>
        `
        const registerForm=this._ShadowRoot.getElementById('register-form')
        registerForm.addEventListener('submit', async(e) => {

            e.preventDefault()
            // console.log('submit')
            // console.log(this._ShadowRoot.getElementById('first-name').Value);
            const firstName=this._ShadowRoot.getElementById('first-name').value
            const lastName=this._ShadowRoot.getElementById('last-name').value
            const email=this._ShadowRoot.getElementById('email').value
            const password=this._ShadowRoot.getElementById('password').value
            const repeat=this._ShadowRoot.getElementById('repeat').value
            // Khai báo giá trị isValid
            let isValid = true
            // string.trim loại bỏ dấu cách ở 2 đầu dấu cách ở giữa vẫn còn  
            if ( firstName.trim()==='') {
                isValid=false
                // this._ShadowRoot.getElementById('first-name').setAttribute('error','please input first name')
                this.setError('first-name','please input first name')
            }
            if ( lastName.trim()==='') {
                isValid=false
                // this._ShadowRoot.getElementById('last-name').setAttribute('error','please input last name')
                this.setError('last-name','please input last name')
            }
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
            if ( repeat.trim()==='') {
                isValid=false
                // this._ShadowRoot.getElementById('repeat').setAttribute('error','please input repeat password')
                this.setError('repeat','please input repeat password')
            }
            if (password !== repeat ) {
                isValid=false
                // this._ShadowRoot.getElementById('repeat').setAttribute('error','please input repeat password')
                this.setError('repeat','please input repeat password')
            }
            // Nếu giá trị isValid False thì nó sẽ ko chạy quá trình bên dưới nữa
            if (!isValid) {
                return
            }
            // Khai báo thông tin người dùng lên firebase 
            const user = {
                fullName:firstName + '' + lastName,
                email:email,
                // Mã hóa password
                password:CryptoJS.MD5(password).toString(),
            }
            // Nếu email tồn tại thì thông báo tới người dùng
            const check= await this.checkEmailExits(email)
            if (check) {
                alert('Email đã tồn tại')
            }
            // Lưu trữ thông tin của người dùng lên firebase
            else {
                firebase.firestore().collection('users').add(user)
                alert('Đăng kí thành công')
                // Khi đăng kí thành công sẽ tự động chuyển sang màn login
                redirect('login')
            }
        })
        // Click vào Already have an account để chuyển sang màn login
        this._ShadowRoot.getElementById('redirect').addEventListener('click',() => {
            redirect('login')
        })    
    }
    // tạo function để làm gọn câu lệnh ở phần điều kiện của người dùng nhập vào
    setError(id,message){
        this._ShadowRoot.getElementById(id).setAttribute('error',  message)
    }
    // Kiểm tra xem email dã có người nào dùng chưa
    async checkEmailExits(email){
        const res =await firebase.firestore().collection('users').where('email','==',email).get()
        // Nếu dã có email đấy rồi thì empty false ko thì true
        return !res.empty
    }
}
window.customElements.define('register-screen', RegisterScreen)


