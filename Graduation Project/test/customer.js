const chai = require('chai');
const expect = chai.expect;
const request = require('supertest');
const app = require('../app');


let customerToken;
describe('customer Login', () => {
    it('Should return a status code of 200 when valid credentials are provided', (done) => {
        request(app)
            .post('/loginCustomer')
            .send({ email: 'ali12@user.com', password: '123456' })
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                expect(res.body.message).to.equal('Success');
                customerToken = res.body.token;
                done();
            });
    });

    it('Should return a status code of 422 when invalid credentials are provided', (done) => {
        request(app)
            .post('/loginCustomer')
            .send({ email: 'ali12@user.com', password: 'wrongpassword' })
            .expect(422)
            .end((err, res) => {
                if (err) return done(err);
                expect(res.body.message).to.equal('This password is invalid');
                done();
            });
    });
});
let customerId;
describe('/POST customer', () => {
    it('should add a new customer', (done) => {
        const newcustomer = {
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: 'password123',
            phone: "01229885041",
            dateOfBirth: "2020-10",
            gender: "male",
            location: "alex",
            image: "uploads/1670299245898-455540568-10.jpeg"
        };
        request(app)
            .post('/addCustomer')
            .send(newcustomer)
            .expect(201)
            .end((err, res) => {
                if (err) return done(err);
                expect(res.body.message).to.equal('customerAdded');
                customerId = res.body._id;
                done();
            });
    });
});



describe('/UPDATE customer/:id', () => {
    it('login customer', (done) => {
        request(app)
            .post('/loginCustomer')
            .send({ email: 'johndoe@example.com', password: 'password123' })
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                expect(res.body.message).to.equal('Success');
                customerToken = res.body.token;
                done();
            });
    });
    it('should update an customer', (done) => {
        const newcustomer = {
            name: 'ali',
        };
        request(app)
            .put(`/updateProfileCustomer`).send(newcustomer).set('Authorization', `Bearer ${customerToken}`)
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                expect(res.body.message).to.equal('CustomerUpdated');
                done();
            });
    });

});

describe('/DELETE customer/:id', () => {
    it('login customer', (done) => {
        request(app)
            .post('/loginCustomer')
            .send({ email: 'johndoe@example.com', password: 'password123' })
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                expect(res.body.message).to.equal('Success');
                customerToken = res.body.token;
                done();
            });
    });
    it('should delete an customer', (done) => {
        request(app)
            .delete(`/deleteProfileCustomer`).set('Authorization', `Bearer ${customerToken}`)
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                expect(res.body.message).to.equal('CustomerDeleted');
                done();
            });
    });
});