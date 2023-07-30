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
    const mockUpdate = jest.fn((update) => {
      const userUpdated = { ...user, ...update }
      mockFind.mockImplementation(() => ({
        toArray: () => Promise.resolve([userUpdated]),
      }))
      return Promise.resolve();
    });
    const mockDelete = jest.fn(() => {
      const userDeleted = []
      mockFind.mockImplementation(() => ({
        toArray: () => Promise.resolve(userDeleted),
      }))
      return Promise.resolve();
    });

    mockCollection = {
      insertOne: mockInsertOne,
      find: mockFind,
      updateOne: mockUpdate,
      deleteOne: mockDelete
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

    // 1 -> Db must be empty.
    expect((await userRepo.findAll()).length).toBe(0);

    // 2 -> User created with success.
    const result = await userRepo.create(user);
    expect(result).toEqual(user);

    // 3 -> First record must be equal the user object.
    expect((await userRepo.findAll())[0]).toStrictEqual(user);

    // 4. Update the user.
    user.email = 'contato.update@legiaourbana.com'
    const newUser = {
      name: 'Renato',
      email: 'contato.update@legiaourbana.com',
      password: 'senha123',
    };
    await userRepo.update(newUser)

    // 5. Test if the user was update with success.
    expect((await userRepo.findAll())[0]).toStrictEqual(expect.objectContaining(newUser))
    
  });

  test('Respository must delete an user (D)', async () => {

    // 1 -> Db must be empty.
    expect((await userRepo.findAll()).length).toBe(0);

    // 2 -> User created with success.
    const result = await userRepo.create(user);
    expect(result).toEqual(user);

    // 3 -> First record must be equal the user object.
    expect((await userRepo.findAll())[0]).toStrictEqual(user);

    // 4. Delete the user.
    await userRepo.deleteOne(user)

    // 5. Db must be empty.
    expect((await userRepo.findAll()).length).toBe(0);

  });
});