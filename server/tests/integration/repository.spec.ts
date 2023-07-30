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
        const collection = client.db('app_db').collection('users');
        repository = UserRepository(collection);
    });


    //close db connection after all
    afterAll(async () => {
        await client.close();
    });

    beforeEach(async () => {
        await repository.deleteAll();
    });

    test("repository should create a new user (C)", async () => {

        const result = await repository.create({
            name: 'Renato',
            email: 'contato@legiaourbana.com',
            password: '12345678'
        })

        //containing just a part of the object without the id
        expect(result).toStrictEqual(expect.objectContaining({
            name: 'Renato',
            email: 'contato@legiaourbana.com',
            password: '12345678'
        }));

        const users = await repository.findAll();

        expect(users.length).toBe(1);

    })

    test.todo('Respository must read an user (R)');
  
    test.todo('Respository must update an user (U)');
  
    test.todo('Respository must delete an user (D)');
    
});