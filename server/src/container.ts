import { MongoClient } from "mongodb";

interface Container {
    getClient: () => Promise<MongoClient>;
}

interface Services {
    client: MongoClient | null;
}


async function createContainer(): Promise<Container> {
    const services: Services = {
        client: null,
    };

    async function getClient(): Promise<MongoClient> {
        // if (services.client) {
        //     return services.client;
        // }

        const dsn = 'mongodb://root:root@localhost?retryWrites=true&writeConcern=majority';
        const client = new MongoClient(dsn);
        await client.connect();

        services.client = client;
        return client;
    }

    return {
        getClient,
    };
}

export default createContainer;
