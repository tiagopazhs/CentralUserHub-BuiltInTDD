import { ObjectId } from 'mongodb';
import app from '../../src/app';
import Container from '../../src/container';
import supertest from 'supertest';
const request = supertest(app)

describe('Event Management API', () => {

    const user = {
        name: 'Renato',
        email: 'contato.unit@legiaourbana.com',
        password: 'senha123',
    };

    let repository;
    let client;

    beforeAll(async () => {
        const container = await Container();
        client = await container.getClient();
        repository = await container.getRepository();
    });

    afterAll(async () => {
        await client.close();
    });

    beforeEach(async () => {
        await repository.deleteAll();
    });

    describe('Colection endpoints', () => {
        test('GET /users', async () => {
            const userCreate = await repository.create(user);

            const response = await request
                .get('/users')
                .expect('Content-type', /application\/json/);

            expect(response.statusCode).toBe(200);
            expect(response.body.length).toBe(1);

            const userWithId = { _id: userCreate._id.toHexString(), name: user.name, email: user.email, password: user.password }

            expect(response.body[0].email).toStrictEqual(user.email);
            expect(response.body[0].name).toStrictEqual(user.name);
            expect(response.body[0].password).toStrictEqual(user.password);
            expect(response.body[0]._id).toStrictEqual(await userCreate._id.toHexString());
            expect(response.body[0]).toStrictEqual(userWithId);
        });

        // test('POST /users', async () => {

        //     const response = await supertest(app)
        //         .post('/users')
        //         .send(user);

        //         console.log('-->', response.body)
        //         console.log('-->', user)

        //         const expectedUser = { ...user, _id: new ObjectId(user.id) };
        //         expect(response.body).toStrictEqual([expect.objectContaining(expectedUser)]);
            
        //         console.log('Expected:', expectedUser);
        //         console.log('Received:', response.body);
        // });

    });
    
});