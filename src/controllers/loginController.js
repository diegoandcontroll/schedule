const Login = require('../models/LoginModel');
exports.index = (req, res) => {
  if(req.session.user) return res.render('userPage');
  return res.render('register');

};
exports.register = async (req,res) =>{
  try {
    const login = new Login(req.body);
    await login.register();
    if(login.errors.length > 0){
      req.flash('errors', login.errors);
      req.session.save( () =>{
        return res.redirect('/login');
      });
      return;
    }
    req.flash('success', 'Registered user login');
    req.session.save( () =>{
      return res.redirect('/login');
    });
  } catch (e) {
    console.log(e);
    return res.render('404');
  }
  
}

exports.auth = async (req,res) =>{
  try {
    const login = new Login(req.body);
    await login.authenticate();
    if(login.errors.length > 0){
      req.flash('errors', login.errors);
      req.session.save( () =>{
        return res.redirect('/login');
      });
      return;
    }
    req.flash('success', 'Successfully authenticated');
    req.session.user = login.user;
    req.session.save( () =>{
      return res.redirect('/login');
    });
  } catch (e) {
    console.log(e);
    return res.render('404');
  }
  
}

exports.logout = (req,res) =>{
  req.session.destroy();
  res.redirect('/login');
}