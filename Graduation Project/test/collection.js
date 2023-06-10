const app = require('../app');
const request = require('supertest');
const assert = require('assert');
const Collection = require('../models/collection/collection.model');

describe('Collection API', () => {
    const CollectionData = {
        name: "collection11331",
        season: "spring",
        date: "2020-10",
        discountRate: 50,
        itemsList: [
            "63a1210c06206f2981059908",
            "63a12170926e722e3d271e22",
            "63a12170926e722e3d271e22"
        ],
        categoryList: [
            "63a41dcd537511e6772f1ae0",
            "63a120b906206f2981059900",
            "63a120bf06206f2981059903",
            "63a120c306206f2981059906"
        ],
        brandId: "63fc4736c73f05256997a455"
    };
    let CollectionId, token;


    beforeEach(async () => {
        const collection = await Collection.create(CollectionData);
        CollectionId = collection._id;
        const res = await request(app)
            .post('/loginAdmin')
            .send({ email: 'admingood3@admin.com', password: '123456' });
        token = res.body.token;
    });

    afterEach(async () => {
        await Collection.deleteMany({});
    });

    describe('GET /Collections', () => {
        it('should return all Collections', async () => {
            const res = await request(app).get('/getAllCollections').set('Authorization', `Bearer ${token}`);
            assert.equal(res.status, 200);
            assert.equal(res.body.Data.length, 1);
            assert.equal(res.body.Data[0].name, CollectionData.name);
        });
    });

    describe('GET /Collections/:id', () => {
        it('should return a single Collection by ID', async () => {
            const res = await request(app).get(`/getCollectionById/${CollectionId}`).set('Authorization', `Bearer ${token}`);
            assert.equal(res.status, 200);
            assert.equal(res.body.Data.name, CollectionData.name);
        });
    });

    describe('POST /Collections', () => {
        it('should create a new Collection', async () => {
            const newCollectionData = {
                name: "collection11331123124",
                season: "spring",
                date: "2020-10",
                discountRate: 50,
                itemsList: [
                    "63a1210c06206f2981059908",
                    "63a12170926e722e3d271e22",
                    "63a12170926e722e3d271e22"
                ],
                categoryList: [
                    "63a41dcd537511e6772f1ae0",
                    "63a120b906206f2981059900",
                    "63a120bf06206f2981059903",
                    "63a120c306206f2981059906"
                ],
                brandId: "63fc4736c73f05256997a455"
            };
            const res = await request(app)
                .post('/addCollection').set('Authorization', `Bearer ${token}`)
                .send(newCollectionData);
            assert.equal(res.status, 201);
            assert.equal(res.body.Data.name, newCollectionData.name);
        });
    });

    describe('PUT /Collections/:id', () => {
        it('should update an existing Collection', async () => {
            const updatedCollectionData = {
                name: 'Updated Collection',
            };
            const res = await request(app)
                .put(`/updateCollection/${CollectionId}`).set('Authorization', `Bearer ${token}`)
                .send(updatedCollectionData);
            assert.equal(res.status, 200);
        });
    });

    describe('DELETE /Collections/:id', () => {
        it('should delete an existing Collection', async () => {
            const res = await request(app).delete(`/deleteCollection/${CollectionId}`).set('Authorization', `Bearer ${token}`);
            assert.equal(res.status, 200);
            const collection = await Collection.findById(CollectionId);
            assert.equal(collection, null);
        });
    });
});
