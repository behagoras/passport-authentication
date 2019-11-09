const bcrypt = require('bcrypt');
const MongoLib = require('../lib/mongo');

class UsersService {
  constructor() {
    this.collection = 'users';
    this.mongoDB = new MongoLib();
  }

  async getUser({ email }) {
    //Get the user connecting to the mongo database
    const [user] = await this.mongoDB.getAll(this.collection, { email });
    return user;
  }

  async createUser({ user }) {
    const { name, email, password } = user;
    const hashedPassword = await bcrypt.hash(password, 10);
    //Creates an user and returns the userId for reference.
    const createUserId = await this.mongoDB.create(this.collection, {
      name,
      email,
      password: hashedPassword,
    });

    return createUserId;
  }
}

module.exports = UsersService;
