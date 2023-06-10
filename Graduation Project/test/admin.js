const chai = require('chai');
const expect = chai.expect;
const request = require('supertest');
const app = require('../app');


let adminToken;
describe('Admin Login', () => {
    it('Should return a status code of 200 when valid credentials are provided', (done) => {
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

    it('Should return a status code of 422 when invalid credentials are provided', (done) => {
        request(app)
            .post('/loginAdmin')
            .send({ email: 'admingood3@admin.com', password: 'wrongpassword' })
            .expect(422)
            .end((err, res) => {
                if (err) return done(err);
                expect(res.body.message).to.equal('This password is invalid');
                done();
            });
    });
});
let adminId;
describe('/POST admin', () => {
    it('should add a new admin', (done) => {
        const newAdmin = {
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: 'password123',
        };
        request(app)
            .post('/addAdmin')
            .send(newAdmin).set('Authorization', `Bearer ${adminToken}`)
            .expect(201)
            .end((err, res) => {
                if (err) return done(err);
                expect(res.body.message).to.equal('adminAdded');
                adminId = res.body._id;
                done();
            });
    });
});



describe('/UPDATE admin/:id', () => {
    it('login admin', (done) => {
        request(app)
            .post('/loginAdmin')
            .send({ email: 'johndoe@example.com', password: 'password123' })
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                expect(res.body.message).to.equal('Success');
                adminToken = res.body.token;
                done();
            });
    });
    it('should get the admin by token', async () => {
        const res = await request(app)
            .get('/getAdmin')
            .set('Authorization', `Bearer ${adminToken}`);
        expect(res.statusCode).equal(200);
        adminId = res.body.Data._id;
    });
    it('should update an admin', (done) => {
        const newAdmin = {
            name: 'ali',
        };
        request(app)
            .put(`/updateAdmin/${adminId}`).send(newAdmin).set('Authorization', `Bearer ${adminToken}`)
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                expect(res.body.message).to.equal('adminUpdated');
                done();
            });
    });

});

describe('/DELETE admin/:id', () => {
    it('login admin', (done) => {
        request(app)
            .post('/loginAdmin')
            .send({ email: 'johndoe@example.com', password: 'password123' })
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                expect(res.body.message).to.equal('Success');
                adminToken = res.body.token;
                done();
            });
    });
    it('should get the admin by token', async () => {
        const res = await request(app)
            .get('/getAdmin')
            .set('Authorization', `Bearer ${adminToken}`);
        expect(res.statusCode).equal(200);
        adminId = res.body.Data._id;
    });

    it('should delete an admin', (done) => {
        request(app)
            .delete(`/deleteAdmin/${adminId}`).set('Authorization', `Bearer ${adminToken}`)
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                expect(res.body.message).to.equal('adminDeleted');
                done();
            });
    });

});