const chai = require('chai');
const expect = chai.expect;
const request = require('supertest');
const app = require('../app');


let BrandToken;
describe('Brand Login', () => {
    it('Should return a status code of 200 when valid credentials are provided', (done) => {
        request(app)
            .post('/loginBrand')
            .send({ email: 'brandabdo21@brand.com', password: '123456' })
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                expect(res.body.message).to.equal('Success');
                BrandToken = res.body.token;
                done();
            });
    });

    it('Should return a status code of 422 when invalid credentials are provided', (done) => {
        request(app)
            .post('/loginBrand')
            .send({ email: 'brandabdo21@brand.com', password: 'wrongpassword' })
            .expect(422)
            .end((err, res) => {
                if (err) return done(err);
                expect(res.body.message).to.equal('This password is invalid');
                done();
            });
    });
});
let BrandId, adminToken;
describe('/POST Brand', () => {
    it('login admin', (done) => {
        request(app)
            .post('/loginAdmin')
            .send({ email: 'admingood3@admin.com', password: '123456' })
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                expect(res.body.message).to.equal('Success');
                adminToken = res.body.token;
                done();
            });
    });
    it('should add a new Brand', (done) => {
        const newBrand = {
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: 'password123',
            phone : [
                "01229885041",
                "01229885042",
                "01229885043"
            ],
            categoryList :[
                "63a8a0c67768190db91ca95b",
                "63a8a0f07768190db91ca961",
                "63a8a1377768190db91ca996"
            ]
        };
        request(app)
            .post('/addBrand').set('Authorization', `Bearer ${adminToken}`)
            .send(newBrand)
            .expect(201)
            .end((err, res) => {
                if (err) return done(err);
                expect(res.body.message).to.equal('BrandAdded');
                BrandId = res.body._id;
                done();
            });
    });
});

describe('/UPDATE Brand/:id', () => {
    it('login Brand', (done) => {
        request(app)
            .post('/loginBrand')
            .send({ email: 'johndoe@example.com', password: 'password123' })
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                expect(res.body.message).to.equal('Success');
                BrandToken = res.body.token;
                done();
            });
    });
    it('should update an Brand', (done) => {
        const newBrand = {
            name: 'ali',
        };
        request(app)
            .put(`/updateProfileBrand`).send(newBrand).set('Authorization', `Bearer ${BrandToken}`)
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                expect(res.body.message).to.equal('BrandUpdated');
                done();
            });
    });

});

describe('/DELETE Brand/:id', () => {
    it('login Brand', (done) => {
        request(app)
            .post('/loginBrand')
            .send({ email: 'johndoe@example.com', password: 'password123' })
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                expect(res.body.message).to.equal('Success');
                BrandToken = res.body.token;
                done();
            });
    });
    it('should delete an Brand', (done) => {
        request(app)
            .delete(`/deleteProfileBrand`).set('Authorization', `Bearer ${BrandToken}`)
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                expect(res.body.message).to.equal('BrandDeleted');
                done();
            });
    });
});