import {describe, expect, test} from '@jest/globals';
import { MongoClient } from "mongodb";
import UserRepository from "../../src/repository";

describe("UserRepository", () => {

    let repository;
    let client;

    beforeAll(async () => {
        const dsn = 'mongodb://root:root@localhost?retryWrites=true&writeConcern=majority'
        client = new MongoClient(dsn);
        await client.connect();
        const collection = client.db('app_db').collection('events');
        repository = UserRepository(collection);
    });


    //close db connection after all
    afterAll(async () => {
        await client.close();
    });

    beforeEach(async () => {
        await repository.deleteAll();
    });

    test("repository should create a new event (C)", async () => {

        const result = await repository.create({
            name: 'Rock in Rio',
            date: '2024-02-07'
        })

        //containing just a part of the object 
        expect(result).toStrictEqual(expect.objectContaining({
            name: 'Rock in Rio',
            date: '2024-02-07'
        }));

        const events = await repository.findAll();

        expect(events.length).toBe(1);

    })
});
