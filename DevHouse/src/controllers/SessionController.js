import User from "../models/User";

class SessionControler {
  //para fazer login
  async store(req, res) {
    const { email } = req.body;

    //checking if the user exists
    let user =  await User.findOne({email})

    if(!user) {
        user = await User.create({ email }); //creating in DB
    } 

    return res.json(user);
  }
}

export default new SessionControler();
