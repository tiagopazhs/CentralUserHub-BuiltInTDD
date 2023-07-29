import {describe, expect, test} from '@jest/globals';
import EventRepository from "../../src/repository";

describe("UserRepository", () => {
  test('repository should create a new event (C)', async () => {
    const event = {
      name: 'Renato',
      email: 'contato.unit@legiaourbana.com',
      password: 'senha123',
    };

    const mockInsertOne = jest.fn(() => Promise.resolve({ ops: [event] }));
    const mockCollection = { insertOne: mockInsertOne };

    const eventRepo = EventRepository(mockCollection);
    const resultado = await eventRepo.create(event);

    expect(resultado).toEqual(event);
    
    // Spy 'Espião'
    expect(mockInsertOne).toHaveBeenCalledWith(event);
    
  });
});