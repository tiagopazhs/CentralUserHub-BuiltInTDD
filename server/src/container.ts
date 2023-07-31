import { MongoClient } from "mongodb";
import UserRepository, { UserRepositoryInterface } from "./repository";

interface Container {
    getClient: () => Promise<MongoClient>;
    getRepository: () => Promise<UserRepositoryInterface>;
}

interface Services {
    client: MongoClient | null;
    repository: UserRepositoryInterface
}


async function createContainer(): Promise<Container> {
    const services: Services = {
        client: null,
        repository: null,
    };

    async function getClient(): Promise<MongoClient> {
        if (services.client) {
            return services.client;
        }

        const dsn = 'mongodb://root:root@localhost?retryWrites=true&writeConcern=majority';
        const client = new MongoClient(dsn);
        await client.connect();

        services.client = client;
        return client;
    }

    async function getRepository(): Promise<UserRepositoryInterface> {
        if (services.repository !== undefined && services.repository !== null) {
            return services.repository;
        }

        const client = await getClient();

        await client.connect();
        const collection = client.db('app_db').collection('events');

        return (services.repository = UserRepository(collection));
    }

    return {
        getClient,
        getRepository
    };
}

export default createContainer;
