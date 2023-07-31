import { describe, expect, test } from '@jest/globals';
import { MongoClient } from "mongodb";
import UserRepository from "../../src/repository";
import createContainer from '../../src/container';

describe("UserRepository", () => {

    const user = {
        name: 'Renato',
        email: 'contato.unit@legiaourbana.com',
        password: 'senha123',
    };

    let repository;
    let client;

    beforeAll(async () => {
        const container = await createContainer();
        client = await container.getClient();

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

        // 1 -> Db must be empty.
        expect((await repository.findAll()).length).toBe(0);

        // 2 -> User created with success.
        const result = await repository.create(user);

        //containing just a part of the object without the id
        expect(result).toStrictEqual(expect.objectContaining(user));

        // 3 -> Db must have one record.
        expect((await repository.findAll()).length).toBe(1);

    })

    test('Respository must read an user (R)', async () => {

        // 1 -> Db must be empty.
        expect((await repository.findAll()).length).toBe(0);
        
        // 2 -> User created with success.
        const result = await repository.create(user);
        expect(result).toStrictEqual(expect.objectContaining(user));
        
        // 3 -> First record must be equal the user object.
        expect((await repository.findAll())[0]).toStrictEqual(expect.objectContaining(user));

    });

    test('Respository must update an user (U)', async () => {

        // 1 -> Db must be empty.
        expect((await repository.findAll()).length).toBe(0);
        
        // 2 -> User created with success.
        const result = await repository.create(user);
        expect(result).toStrictEqual(expect.objectContaining(user));

        // 3 -> First record must be equal the user object.
        expect((await repository.findAll())[0]).toStrictEqual(expect.objectContaining(user));

        // 4. Update the user.
        user.email = 'integrationUpdated@legiaourbana.com'
        const newUser = {
            name: 'Renato',
            email: 'integrationUpdated@legiaourbana.com',
            password: 'senha123',
        };
        const updatedUser = await repository.update(user)
        expect(updatedUser).toStrictEqual(expect.objectContaining(newUser))

        // 5. Test if the user was update with success.
        expect(await repository.findById(updatedUser._id)).toStrictEqual(updatedUser)
    });

    test('Respository must delete an user (D)', async () => {

        // 1 -> Db must be empty.
        expect((await repository.findAll()).length).toBe(0);

        // 2 -> User created with success.
        const result = await repository.create(user);
        expect(result).toStrictEqual(expect.objectContaining(user));

        // 3 -> First record must be equal the user object.
        expect((await repository.findAll())[0]).toStrictEqual(expect.objectContaining(user));

        // 4. Delete the user.
        await repository.deleteOne(user)
        
        // 5. Db must be empty.
        expect((await repository.findAll()).length).toBe(0);

    });
});
