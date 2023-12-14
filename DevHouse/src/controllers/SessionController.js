import User from "../models/User";
import * as Yup from "yup";

class SessionControler {
  //para fazer login
  async store(req, res) {
    const schema = Yup.object().shape({
      email: Yup.string().email().required(),
    });

    const { email } = req.body;

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: "Validation fails" });
    }

    //checking if the user exists
    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({ email }); //creating in DB
    }

    return res.json(user);
  }
}

export default new SessionControler();
