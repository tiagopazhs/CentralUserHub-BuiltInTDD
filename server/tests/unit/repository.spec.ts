import {describe, expect, test} from '@jest/globals';
import UserRepository from "../../src/repository";

describe("UserRepository", () => {

    test("repository should create a new user (C)", async () => {

        const repository = new UserRepository();

        const result = await repository.create({
            name: "Toretto",
            email: "toretto@velozesefuriosos.com.br",
            password: "12345678",
        });

        // containing just a part of the object without id
        expect(result).toStrictEqual({
            name: "Toretto",
            email: "toretto@velozesefuriosos.com.br",
            password: "12345678",
        });

    });
});

