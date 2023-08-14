import { ObjectId } from 'mongodb';

interface User {
  _id?: ObjectId;
  name: string;
  email: string;
  password: string;
}
export interface UserRepositoryInterface {
  deleteAll: () => Promise<void>;
  create: (user: User) => Promise<User>;
  findAll: () => Promise<User[]>;
  findById: (id: string) => Promise<User>;
  update: (user: User) => Promise<User>;
  deleteOne: (user: User) => Promise<User>;
}

function UserRepository(collection): UserRepositoryInterface {

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
  async function findById(id: string): Promise<User> {
    return await collection.findOne({_id: new ObjectId(id)});
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
