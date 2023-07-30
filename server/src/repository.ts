import { ObjectId } from 'mongodb';

interface User {
  _id?: ObjectId;
  name: string;
  email: string;
  password: string;
}

interface UserRepository {
  deleteAll: () => Promise<void>;
  create: (user: User) => Promise<User>;
  findAll: () => Promise<User[]>;
  update: (user: User) => Promise<User>;
}

function UserRepository(collection): UserRepository {

  async function deleteAll() {
    await collection.deleteMany({});
  }

  async function create(user: User): Promise<User> {
    await collection.insertOne(user);
    return user;
  }

  async function findAll(): Promise<User[]> {
    return await collection.find({}).toArray();
  }

  async function update(user: User): Promise<User> {
    await collection.updateOne({name: user.name, email: user.email, password: user.password});
    return user;
  }

  return {
    deleteAll,
    create,
    findAll,
    update
  };
}

export default UserRepository;
