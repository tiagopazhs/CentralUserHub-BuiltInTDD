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

  return {
    deleteAll,
    create,
    findAll,
  };
}

export default UserRepository;
