const app = require('../app');
const request = require('supertest');
const assert = require('assert');
const Advertisement = require('../models/advertisement/advertisement.model');

describe('Advertisement API', () => {
  const adData = {
    name: 'Test Ad',
    image: 'http://example.com/image.jpg',
    link: 'http://example.com',
    endDate: Date.now() + 7*24*60*60*1000,
    creatorName: 'Test User'
  };
  let adId , token;
  

  beforeEach(async () => {
    const ad = await Advertisement.create(adData);
    adId = ad._id;
    const res = await request(app)
    .post('/loginAdmin')
    .send({ email: 'admingood3@admin.com', password: '123456' });
     token = res.body.token;
  });

  afterEach(async () => {
    await Advertisement.deleteMany({});
  });

  describe('GET /ads', () => {
    it('should return all advertisements', async () => {
      const res = await request(app).get('/getAllAdvertisement').set('Authorization', `Bearer ${token}`);
      assert.equal(res.status, 200);
      assert.equal(res.body.Data.length, 1);
      assert.equal(res.body.Data[0].name, adData.name);
    });
  });

  describe('GET /ads/:id', () => {
    it('should return a single advertisement by ID', async () => {
      const res = await request(app).get(`/getAdvertisementById/${adId}`).set('Authorization', `Bearer ${token}`);
      assert.equal(res.status, 200);
      assert.equal(res.body.Data.name, adData.name);
    });
  });

  describe('POST /ads', () => {
    it('should create a new advertisement', async () => {
      const newAdData = {
        name: 'New Ad',
        image: 'http://example.com/newimage.jpg',
        link: 'http://example.com/new',
        endDate: Date.now() + 14*24*60*60*1000,
        creatorName: 'Test User'
      };
      const res = await request(app)
        .post('/addAdvertisement').set('Authorization', `Bearer ${token}`)
        .send(newAdData);
      assert.equal(res.status, 201);
      assert.equal(res.body.Data.name, newAdData.name);
    });
  });

  describe('PUT /ads/:id', () => {
    it('should update an existing advertisement', async () => {
      const updatedAdData = {
        name: 'Updated Ad',
        image: 'http://example.com/updatedimage.jpg',
        link: 'http://example.com/updated',
        endDate: Date.now() + 21*24*60*60*1000,
        creatorName: 'Test User'
      };
      const res = await request(app)
        .put(`/updateAdvertisement/${adId}`).set('Authorization', `Bearer ${token}`)
        .send(updatedAdData);
      assert.equal(res.status, 200);
    });
  });

  describe('DELETE /ads/:id', () => {
    it('should delete an existing advertisement', async () => {
      const res = await request(app).delete(`/deleteAdvertisement/${adId}`).set('Authorization', `Bearer ${token}`);
      assert.equal(res.status, 200);
      const ad = await Advertisement.findById(adId);
      assert.equal(ad, null);
    });
  });
});
