const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const UserSchema = mongoose.Schema({
  cpf: String,
  rg: String,
  name: String,
  numero_celular: String,
  shipping: String,
  email: String,
  password: String,
});

export default mongoose.model('User', UserSchema);
