import { describe, expect, test } from '@jest/globals';
import UserRepository from "../../src/repository";

describe("UserRepository", () => {

  const user = {
    name: 'Renato',
    email: 'contato.unit@legiaourbana.com',
    password: 'senha123',
  };

  let userRepo;
  let mockCollection;

  beforeEach(async () => {

    // Mock object
    const mockInsertOne = jest.fn(() => {
      mockFind.mockImplementation(() => ({
        toArray: () => Promise.resolve([user]),
      }));

      return Promise.resolve({ ops: [user] })
    });
    const mockFind = jest.fn(() => ({
      toArray: () => Promise.resolve([]),
    }));
    mockCollection = {
      insertOne: mockInsertOne,
      find: mockFind,
    };
    userRepo = UserRepository(mockCollection);

  });

  test('repository should create a new user (C)', async () => {

    // 1 -> Db must be empty.
    expect((await userRepo.findAll()).length).toBe(0);

    // 2 -> User created with success.
    const result = await userRepo.create(user);
    expect(result).toEqual(user);

    // 3 -> Db must have one record.
    expect((await userRepo.findAll()).length).toBe(1);

    // extra -> Spy 'Espião'
    expect(mockCollection.insertOne).toHaveBeenCalledWith(user);

  });


  test('Respository must read an user (R)', async () => {

    // 1 -> Db must be empty.
    expect((await userRepo.findAll()).length).toBe(0);

    // 2 -> User created with success.
    const result = await userRepo.create(user);
    expect(result).toEqual(user);

    // 3 -> First record must be equal the user object.
    expect((await userRepo.findAll())[0]).toStrictEqual(user);
    
  });

  test('Respository must update an user (U)', async () => {

    // 1. Db must be empty.

    // 2. Insert an user.

    // 3. Update the user.

    // 4. Test if the user was update with success.

  });

  test.todo('Respository must delete an user (D)');
});