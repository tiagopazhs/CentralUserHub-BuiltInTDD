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
  findById: (user: User) => Promise<User>;
  update: (user: User) => Promise<User>;
  deleteOne: (user: User) => Promise<User>;
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

  async function findById(user: User): Promise<User> {
    return await collection.findOne(user._id);
  }

  async function update(user: User): Promise<User> {
    await collection.updateOne({_id: user._id}, {$set: user});
    return user;
  }

  async function deleteOne(user: User): Promise<User> {
    await collection.deleteOne({name: user.name});
    return user;
  }

  return {
    deleteAll,
    create,
    findAll,
    findById,
    update,
    deleteOne
  };
}

export default UserRepository;
