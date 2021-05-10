const Contact = require('../models/ContactModel');
exports.index = async(req, res) => {
  const contactObj = new Contact(req.body);
  const contact = await contactObj.findContacts();
  res.render('index',{contact});
  return;
};
