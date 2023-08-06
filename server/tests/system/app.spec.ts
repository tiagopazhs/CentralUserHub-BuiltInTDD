import app from '../../src/app';
import Container from '../../src/container';
import supertest from 'supertest';
const request = supertest(app)

describe('Event Management API', () => {

    let user = {
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

        test('POST /users', async () => {

            user = {
                name: 'Renato',
                email: 'contato.unit@legiaourbana.com',
                password: 'senha123',
            };

            const response = await request
                .post('/users')
                .send(user);

            expect(response.statusCode).toBe(201);
            expect(response.body).toStrictEqual(expect.objectContaining(user));

        });

    });

    describe('Items endpoints', () => {

        describe('GET /events/:id', () => {
            test('Should return status 200 to an existent item', async () => {
                // 1. create an user
                // 2. call user by id
                // 3. verify header
                // 4. verify status code                
                // 5. verifify body
            });
            
            test('Shoud return 404 to an existent item', async() => {
                // 1. Call user details
                // 2. verify header
                // 3. verify status code                
                // 4. verifify body
            });
        });

        describe('PUT /events/:id', () => {
            test('Should return status 200 to an existent item', async() => {
                // 1. create an user
                // 2. call the users update route
                // 3. verify header
                // 4. verify status code          
                // 5. verifify body
                // 6. check if the user is successfully updated
            });

            test('Shoud return 404 to an existent item', async() => {
                // 1. Call user details
                // 2. verify header
                // 3. verify status code                
                // 4. verifify body
            });
        });

        describe('DELETE /events/:id', () => {
            test('Should return status 204 to an existent item', async() => {
                // 1. create an user
                // 2. call the users update route
                // 3. verify status code                
                // 4. verifify body
                // 5. check if the user is successfully updated at the db
            });

            test('Shoud return 404 to an existent item', async() => {
                // 1. Call user details
                // 2. verify header
                // 3. verify status code                
                // 4. verifify body
            });
        });
    });
    
});