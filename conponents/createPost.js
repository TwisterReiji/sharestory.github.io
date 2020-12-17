const style=`
#create-post{
    width:60%;
    margin:auto;
    margin-top:20px;
    text-align:right;
}
#create-post textarea{
    width:100%;
    border:1px solid #dbdbdb;
    border-radius:10px;
    outline:none;
}
.post{
    background-color:#1976D1;
    color:#fff;
    padding:10px 15px;
    border-radius:5px;
}
`
// Lấy dữ liệu cho phần user
import {getItemlocalStorage} from '../utils.js' 


class CreatePost extends HTMLElement{
    constructor(){
        super()
        this._shadowRoot=this.attachShadow({mode:'open'})
    }
    connectedCallback(){
        this._shadowRoot.innerHTML=`
        <style>${style}</style>
        <form id="create-post">
          <textarea name="content"  row="6" ></textarea>
          <button class="post">Post</button>
        </form>
        `
        // Thêm bài viết 
        const postForm=this._shadowRoot.getElementById('create-post')
        postForm.addEventListener('submit', (e) =>{
            // Ngăn ko cho gửi dữ liệu lên sever
            e.preventDefault()
            // Lấy dữ liệu nhập vào từ content phần name
            const content = postForm.content.value
            // check xem người dùng nhập chưa
            if (content.trim()=== '' ) {
                alert('Vui long nhap noi dung bai viet')
            }
            // cập nhật dữ liệu
            const user = getItemlocalStorage('currenUser')
            const data={
                createdBy:user.id,
                createdAt:new Date().toISOString(),
                content: content,
                comments:[],
                authorName:user.fullName,
                isShow:true,
            }
            // Đẩy dữ liệu lên sever firebase
            firebase.firestore().collection('posts').add(data)
            // sau khi post xong sẽ xóa bỏ dữ liệu người dùng vừa nhập trên post để nhập cái khác
            postForm.content.value=''
        })
    }
}
window.customElements.define('create-post', CreatePost)