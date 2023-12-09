import House from "../models/House"; //access for manipulation
import User from "../models/User";

class HouseController {
  async index(req, res) {
    const { status } = req.query;
    const houses = await House.find({ status });
    return res.json(houses);
  }

  async store(req, res) {
    const { filename } = req.file;
    const { description, price, location, status } = req.body;
    const { user_id } = req.headers;

    //creating registration
    const house = await House.create({
      user: user_id,
      thumbnail: filename,
      description,
      price,
      location,
      status,
    });

    return res.json(house);
  }

  async update(req, res) {
    const { filename } = req.file;
    const { description, price, location, status } = req.body;
    const { user_id } = req.headers;
    const { house_id } = req.params;

    const user = await User.findById(user_id);
    const house = await House.findById(house_id);

    //authorization
    if (String(user._id) !== String(house.user)) {
      return res.status(401).json({ error: "Unauthorized user" });
    }

    await House.updateOne(
      { _id: house_id },
      {
        user: user_id,
        thumbnail: filename,
        description,
        price,
        location,
        status,
      }
    );

    return res.send();
  }

  async destroy(req, res) {
    const { house_id } = req.body;
    const { user_id } = req.headers;

    const user = await User.findById(user_id);
    const house = await House.findById(house_id);

    //authorization
    if (String(user._id) !== String(house.user)) {
      return res.status(401).json({ error: "Unauthorized user" });
    }

    await House.findByIdAndDelete({ _id: house_id });

    return res.json({ message: "Sucessfully deleted" });
  }
}

export default new HouseController();
