const mongoose = require('mongoose');
const isEmail = require('validator/lib/isEmail');
const ContactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  lastname: { type: String, required: false, default: ''},
  email: { type: String, required: false, default: ''},
  number: { type: String, required: false, default: ''},
  created_at: {type: Date, default: Date.now}
});

const ContactModel = mongoose.model('Contact', ContactSchema);

class Contact {
  constructor(body){
    this.body = body;
    this.errors = [];
    this.contact = null;

  }
  async deleteContacts(id){
    if(typeof id !== 'string') return;
    const contact = await ContactModel.findOneAndDelete({_id: id});
    return contact;
  }
  async findContacts(){
    const contact = await ContactModel.find().sort({created_at: -1});
    return contact;
  }
  async editContact(id){
    if(typeof id !== 'string') return;
    this.validationFields();
    if(this.errors.length > 0) return;
    this.contact = await ContactModel.findByIdAndUpdate(id, this.body, {new: true, useFindAndModify: false});
    ContactModel.updateOne()
  }
  async createContact(){
    this.validationFields();
    if(this.errors.length > 0) return;
    this.contact = await ContactModel.create(this.body);
  }

  async findUser(id){
    if(typeof id !== 'string') return;
    const user = await ContactModel.findById(id);
    return user;
  }
  validationFields(){
    this.cleanUp();
    if(this.body.email && !isEmail(this.body.email)) this.errors.push('Invalid Email');
    if(!this.body.name) this.errors.push('Name is required!');
    if(!this.body.email && !this.body.number){
      this.errors.push('Name or number needs to be sent!');
    }
    
  }

  cleanUp(){
    for(const key in this.body){
      if(typeof this.body[key] !== 'string'){
        this.body[key] = '';
      }
    };
    this.body = {
      name: this.body.name,
      lastname: this.body.lastname,
      email: this.body.email,
      number: this.body.number,
    };
  }
}

module.exports = Contact;
