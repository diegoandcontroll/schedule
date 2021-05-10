import isEmail from 'validator/lib/isEmail';
export default class Login{
  constructor(form){
    this.form = document.querySelector(form);
  }
  init(){
    this.events();
  }
  events(){
    if(!this.form) return;
    this.form.addEventListener('submit', e =>{
      e.preventDefault();
      this.validateFields(e);
      
    });
  }
  validateFields(e){
    const div = document.createElement("div");
    div.className = 'alert alert-danger text-center';
    const el = e.target;
    const emailInput = el.querySelector('input[name="email"]');
    const passwordInput = el.querySelector('input[name="password"]');
    let error = false;
    const errors = [];
    if(!isEmail(emailInput.value)){
      errors.push('Invalid email');
      error = true;
    }
    if(passwordInput.value.length < 3 || passwordInput.value.length > 50){
      errors.push('Invalid Password');
      error = true;
    }
    
    let test = document.getElementById('login');
    div.innerHTML = `${errors[0]} and ${errors[1]}`;
    test.appendChild(div);
    if(!error) el.submit();
  }
}