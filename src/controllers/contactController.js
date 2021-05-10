const Contact = require('../models/ContactModel');
const chek = chekErrors = (contact,req,res) =>{
  if(contact.errors.length > 0){
    req.flash('errors', contact.errors);
    req.session.save(() => res.redirect('/contact'));
    return;
  }
  req.flash('success', 'Contact edit successfully');
  req.session.save(() => res.redirect(`/contact/${contact.contact._id}`));
  return;
}
exports.index = (req,res) =>{
  res.render('contact', {
    contact: {}
  });
}

exports.register = async (req,res) =>{
  try{
    const contact = new Contact(req.body);
    await contact.createContact();
    if(contact.errors.length > 0){
      req.flash('errors', contact.errors);
      req.session.save(() => res.redirect('/contact'));
      return;
    }
    req.flash('success', 'Contact successfully registered');
    req.session.save(() => res.redirect(`/contact/${contact.contact._id}`));
    return;
  }catch(e){
    console.error(e);
    return res.redirect('404');
  }
  
}

exports.editIndex = async (req,res) =>{
  const contactRender = new Contact(req.body);
  if(!req.params.id) return res.render('404');
  
  const contact = await contactRender.findUser(req.params.id);
  if(!contact) return res.render('404');
  res.render('contact',{
    contact
  });
}

exports.edit = async (req,res) =>{
  try{
    const contactUpdate = new Contact(req.body);
    if(!req.params.id) return res.render('404');
    await contactUpdate.editContact(req.params.id);
    chek(contactUpdate,req,res);
  }catch(e){
    console.log(e);
    return res.render('404');
  }
}

exports.delete = async (req,res) =>{
  const contactDelete = new Contact(req.body);
  if(!req.params.id) return res.render('404');
  
  const contact = await contactDelete.deleteContacts(req.params.id);
  if(!contact) return res.render('404');
  req.flash('success', 'Contact delete successfully');
  req.session.save(() => res.redirect('back'));
  return;
}