import { ObjectId } from 'mongodb';

interface Event {
  _id?: ObjectId;
  name: string;
  email: string;
  password: string;
}

interface EventRepository {
  deleteAll: () => Promise<void>;
  create: (event: Event) => Promise<Event>;
  findAll: () => Promise<Event[]>;
}

function EventRepository(collection): EventRepository {

  async function deleteAll() {
    await collection.deleteMany({});
  }

  async function create(event: Event): Promise<Event> {
    await collection.insertOne(event);
    return event;
  }

  async function findAll(): Promise<Event[]> {
    return await collection.find({}).toArray();
  }

  return {
    deleteAll,
    create,
    findAll,
  };
}

export default EventRepository;
