const style=`
*{
    margin: 0;
    padding: 0;
}
.container{
    background: orange;
    display: flex;
    height: 64px;
    justify-content: space-between;
    align-items: center;
    height: 64px;
    padding: 0 10%;

}
.logo{
    display: flex;
    align-items: center;
}
.branch{
    font-size: 1.5rem;
    color: black;
    margin-left: 20px;
    font-family: 'Roboto', sans-serif;
    font-weight: 600;
}
.user-info{
    font-size: 1.8rem;
    color: white;
}
.btn{
    background-color: transparent;
    border: none;
    margin-left: 20px;
    cursor: pointer;
    outline: none;
}
`
import { removeItemFromLocalStorage } from "../utils.js";
import {redirect} from '../index.js'
class StoryHeader extends HTMLElement{
    constructor(){
        super()
        this._shadowRoot = this.attachShadow({mode : 'open'})
    }
    connectedCallback(){
        this._shadowRoot.innerHTML=`
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
        <link href="https://fonts.googleapis.com/css2?family=Roboto&display=swap" rel="stylesheet">
        <style>${style}</style>
        <div class="container">
            <div class="logo">
                <img src="" alt="" width="40px" height="40px">
                <div class="branch">Share Story</div>
            </div>
            <div class="user-info">
                <div class="avatar"> <i class="fa fa-user" aria-hidden="true"></i> </div>
                <div id="btn"><i class="fa fa-sign-out" aria-hidden="true"></i></div>
            </div>
        </div>
        `
        // click button để đăng xuất ra ngoài màn hình chính đồng thời xóa key:value
        this._shadowRoot.getElementById('btn').addEventListener('click', () => {
            removeItemFromLocalStorage('currenUser')
            redirect('login')
        })
    }
}
window.customElements.define('story-header', StoryHeader)