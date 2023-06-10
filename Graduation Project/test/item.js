const app = require('../app');
const request = require('supertest');
const assert = require('assert');
const Item = require('../models/item/item.model');

describe('Item API', () => {
    const itemData = {
        name: "testItem3",
        price: 20,
        description: "sfasfasfsafasfas",
        gender: "male",
        isAdult: true,
        discountRate: 50,
        cover: "fhdasfgbhak",
        images: [
            "hfjkasfgbjkas",
            "bkjdfbhgkfafasf",
            "bdafhavfkhasvbfk"
        ],
        colors: [
            "green",
            "red",
            "blue"
        ],
        sizes: [
            "M",
            "L",
            "S"
        ],
        brandId: "63fc4736c73f05256997a455",
        categoryList: [
            "63a8a0c67768190db91ca95b",
            "63a8a0f07768190db91ca961",
            "63a8a1377768190db91ca996"
        ]
    };
    let itemId, token;


    beforeEach(async () => {
        const item = await Item.create(itemData);
        itemId = item._id;
        const res = await request(app)
            .post('/loginAdmin')
            .send({ email: 'admingood3@admin.com', password: '123456' });
        token = res.body.token;
    });

    afterEach(async () => {
        await Item.deleteMany({});
    });

    describe('GET /items', () => {
        it('should return all Items', async () => {
            const res = await request(app).get('/getAllItems').set('Authorization', `Bearer ${token}`);
            assert.equal(res.status, 200);
            assert.equal(res.body.Data.length, 1);
            assert.equal(res.body.Data[0].name, itemData.name);
        });
    });

    describe('GET /items/:id', () => {
        it('should return a single Item by ID', async () => {
            const res = await request(app).get(`/getItemById/${itemId}`).set('Authorization', `Bearer ${token}`);
            assert.equal(res.status, 200);
            assert.equal(res.body.Data.name, itemData.name);
        });
    });

    describe('POST /items', () => {
        it('should create a new Item', async () => {
            const newitemData = {
                name: "testItem53",
                price: 20,
                description: "sfasfasfsafasfas",
                gender: "male",
                isAdult: true,
                discountRate: 50,
                cover: "fhdasfgbhak",
                images: [
                    "hfjkasfgbjkas",
                    "bkjdfbhgkfafasf",
                    "bdafhavfkhasvbfk"
                ],
                colors: [
                    "green",
                    "red",
                    "blue"
                ],
                sizes: [
                    "M",
                    "L",
                    "S"
                ],
                brandId: "63fc4736c73f05256997a455",
                categoryList: [
                    "63a8a0c67768190db91ca95b",
                    "63a8a0f07768190db91ca961",
                    "63a8a1377768190db91ca996"
                ]
            };
            const res = await request(app)
                .post('/addItem').set('Authorization', `Bearer ${token}`)
                .send(newitemData);
            assert.equal(res.status, 201);
            assert.equal(res.body.Data.name, newitemData.name);
        });
    });

    describe('PUT /items/:id', () => {
        it('should update an existing Item', async () => {
            const updateditemData = {
                name: 'Updated item',
            };
            const res = await request(app)
                .put(`/updateItem/${itemId}`).set('Authorization', `Bearer ${token}`)
                .send(updateditemData);
            assert.equal(res.status, 200);
        });
    });

    describe('DELETE /items/:id', () => {
        it('should delete an existing Item', async () => {
            const res = await request(app).delete(`/deleteItem/${itemId}`).set('Authorization', `Bearer ${token}`);
            assert.equal(res.status, 200);
            const item = await Item.findById(itemId);
            assert.equal(item, null);
        });
    });
});
