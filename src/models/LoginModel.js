const mongoose = require('mongoose');
const isEmail = require('validator/lib/isEmail');
const bcryptjs = require('bcryptjs');
const LoginSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true }
});

const LoginModel = mongoose.model('Login', LoginSchema);

class Login {
  constructor(body){
    this.body = body;
    this.errors = [];
    this.user = null;
  }
  async authenticate(){
    this.validationFields();

    if(this.errors.length > 0) return;

    this.user = await LoginModel.findOne({email: this.body.email});

    if(!this.user){
      this.errors.push('User not exist!');
      return;
    }
    if(!bcryptjs.compareSync(this.body.password, this.user.password)){
      this.errors.push('Invalid email or password');
      this.user = null;
      return;
    }
  }

  async register(){
    this.validationFields();
    await this.userExist();
    if(this.errors.length > 0) return;
    
    const salt = bcryptjs.genSaltSync();

    this.body.password = bcryptjs.hashSync(this.body.password, salt);
    
    this.user = await LoginModel.create(this.body);
    
  }
  async userExist(){
    this.user = await LoginModel.findOne({email: this.body.email});

    if(this.user) this.errors.push('User already registered');
  }

  validationFields(){
    this.cleanUp();
    if(!isEmail(this.body.email)) this.errors.push('Invalid Email');

    if(this.body.password.length < 3 || this.body.password.length > 50){
      this.errors.push('Invalid Password');
    }
  }

  cleanUp(){
    for(const key in this.body){
      if(typeof this.body[key] !== 'string'){
        this.body[key] = '';
      }
    };
    this.body = {
      email: this.body.email,
      password: this.body.password
    };
  }
}

module.exports = Login;
