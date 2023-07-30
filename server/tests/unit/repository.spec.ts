import { describe, expect, test } from '@jest/globals';
import UserRepository from "../../src/repository";

describe("UserRepository", () => {
  test('repository should create a new user (C)', async () => {
    const user = {
      name: 'Renato',
      email: 'contato.unit@legiaourbana.com',
      password: 'senha123',
    };

    // Mock object
    const mockInsertOne = jest.fn(() => Promise.resolve({ ops: [user] }));
    const mockFind = jest.fn(() => ({
      toArray: () => Promise.resolve([user]),
    }));
    const mockCollection = {
      insertOne: mockInsertOne,
      find: mockFind,
    };

    const userRepo = UserRepository(mockCollection);

    const result = await userRepo.create(user);

    expect(result).toEqual(user);

    // Spy 'Espião'
    expect(mockInsertOne).toHaveBeenCalledWith(user);

  });

  test('Respository must read an user (R)', async () => {


    // 1. Db must be empty.

    // 2. Insert an user.

    // 3. Test if the user was update with success.

  });

  test('Respository must update an user (U)', async () => {

    // 1. Db must be empty.

    // 2. Insert an user.

    // 3. Update the user.

    // 4. Test if the user was update with success.

  });

  test.todo('Respository must delete an user (D)');
});