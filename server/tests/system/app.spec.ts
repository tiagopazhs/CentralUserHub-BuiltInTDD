import { ObjectId } from 'mongodb';
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
            expect(response.body[0].id).toStrictEqual(await userCreate._id.toHexString());
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

        describe('GET /users/:id', () => {
            test('Should return status 200 to an existent item', async () => {
                // 1. create an user
                const userCreate = await repository.create(user);
                const userCreateId = await userCreate._id.toHexString()

                // 2. call user by id
                const response = await request.get(`/users/${userCreateId}`)
                // 3. verify header
                .expect(200)
                .expect('Content-Type', /application\/json/);

                // 4. verify status code
                expect(response.statusCode).toBe(200)
                
                // 5. verifify body
                user = {
                    name: 'Renato',
                    email: 'contato.unit@legiaourbana.com',
                    password: 'senha123',
                };                
                expect(response.body).toStrictEqual(expect.objectContaining(user))
            });
            
            test('Shoud return 404 to an existent item', async() => {
                // 1. Call user details
                const response = await request.get(`/users/${new ObjectId()}`)
                // 2. verify header
                .expect(404)
                .expect('Content-Type', /application\/json/);
                
                // 3. verify status code                
                expect(response.statusCode).toBe(404)
                
                // 4. verifify body
                expect(response.body).toStrictEqual({
                    status: 404,
                    error: 'User not found'
                })
            });
        });

        describe('PUT /users/:id', () => {
            test('Should return status 200 to an existent item', async() => {
                // 1. create an user
                const userCreate = await repository.create(user);
                const userCreateId = await userCreate._id.toHexString()

                // 2. call the users update route
                const newUser = {
                    name: 'Renato',
                    email: 'contato.updatet@legiaourbana.com',
                    password: 'senha123',
                }
                const response = await request.put(`/users/${userCreateId}`)
                .send(newUser)
                // 3. verify header
                .expect(200)
                .expect('Content-Type', /application\/json/);
                
                // 4. verify status code          
                expect(response.statusCode).toBe(200);
                
                // 5. verifify body
                expect(response.body).toStrictEqual(expect.objectContaining({email: 'contato.updatet@legiaourbana.com'}));

                // 6. check if the user is successfully updated
                const updatedUser = await repository.findById(userCreateId);
                expect(response.body).toStrictEqual(expect.objectContaining({email: 'contato.updatet@legiaourbana.com'}));
            });

            test('Shoud return 404 to an existent item', async() => {
                // 1. Call user details
                const newUser = {
                    name: 'Renato',
                    email: 'contato.updatet@legiaourbana.com',
                    password: 'senha123',
                }
                const response = await request.put(`/users/${new ObjectId()}`)
                .send(newUser)
                // 2. verify header
                .expect(404)
                .expect('Content-Type', /application\/json/);

                // 3. verify status code                 
                expect(response.statusCode).toBe(404);
                     
                // 4. verifify body
                expect(response.body).toStrictEqual({
                    status: 404,
                    error: 'User not found'
                })
            });
        });

        describe('DELETE /users/:id', () => {
            test('Should return status 204 to an existent item', async() => {
                // 1. create an user
                const userCreate = await repository.create(user);
                const userCreateId = await userCreate._id.toHexString()

                // 2. call the users delete route
                const response = await request.delete(`/users/${userCreateId}`)

                // 3. verify status code
                expect(response.statusCode).toBe(204);

                // 4. verifify body
                expect(response.body).toStrictEqual({});
                
                // 5. check if the user is successfully deleted at the db
                const deletedUser = await repository.findById(userCreateId);
                expect(deletedUser).toBe(null);
            });

            test('Shoud return 404 to an existent item', async() => {
                // 1. Call user details
                const response = await request.delete(`/users/${new ObjectId()}`)

                // 2. verify header
                .expect('Content-type', /application\/json/);

                // 3. verify status code                
                expect(response.statusCode).toBe(404);

                // 4. verifify body
                expect(response.body).toStrictEqual({
                    status: 404,
                    error: 'User not found'
                })
            });
        });
    });
    
});