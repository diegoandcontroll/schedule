import 'core-js/stable';
import 'regenerator-runtime/runtime';
import './assets/css/style.css';
import Login from './modules/Login';
import Register from './modules/Register';
const login = new Login('.form-login');
const register = new Register('.form-register');
register.init();
login.init();
