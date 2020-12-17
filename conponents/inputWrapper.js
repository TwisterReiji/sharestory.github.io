 const style=`
.error {
    color: red;
}
input {
    border-radius: 5px;
    width: 100%;
    border: 1px solid #dbdbdb;
    padding: 12px;
    box-sizing: border-box;
}
.input-wrapper {
    margin-bottom: 10px;
    
}
`
class InputWrapper extends HTMLElement{
    constructor(){
        super()
        this._shadowRoot=this.attachShadow({mode:'open'})
    }
    connectedCallback(){
        this.type=this.getAttribute('type')
        this.placeholder=this.getAttribute('placeholder')
        this.error=this.getAttribute('error') || ''
        this._shadowRoot.innerHTML=`
        <div class="input-wrapper">
           <input id="input-main" type="${this.type}" name="" placeholder="${this.placeholder}">
           <div class="error">${this.error}</div>
        </div>
        <style>${style}</style> 
        `
    }
    
    static get observedAttributes(){
        return ['error']
    }
    attributeChangedCallback(name,oldValue,NewValue){
        if(name === 'error'){
            this._shadowRoot.querySelector('.error').innerHTML=NewValue
        }
    }
    // getValue(){
    //     const value=this._shadowRoot.getElementById('input-main').value
    //     return value;
    // }
    //geter
    get value(){
        const value=this._shadowRoot.getElementById('input-main').value
        return value
    }
}
window.customElements.define('input-wrapper',InputWrapper)