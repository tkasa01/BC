/**
 * Created by tkasa on 22/03/2018.
 */

var app = require('../app');
var request = require('supertest');
var chai = require('chai');
var expect = chai.expect;
var assert = chai.assert;
var mongoose = require('mongoose');
var Promise = require('promise');
var account = require('./data');

describe('routing', function(){
    it('should redirect to login', function(done){
        request(app)
            .get('/login')
            .expect(302);
            done()
    });
    it('should redirect to registration page', function(done){
        request(app)
            .get('./builders/registration')
            .expect(302);
            done()
    });
    it('should redirect to builder`s profile page', function(done){
        request(app)
            .get('./builders/profile')
            .expect(302);
        done()
    });
    it('should redirect to customer`s profile page', function(done){
        request(app)
            .get('./customers/profile')
            .expect(302);
        done()
    });

    it('should redirect to post page', function(done){
        request(app)
            .get('/post')
            .expect(302);
        done()
    });
    it('should redirect to upload page', function(done){
        request(app)
            .get('./photo/upload')
            .expect(302);
        done()
    })
});

//========================= ROLE ===============================================

describe('ROLE TESTING', function(){
    describe('user', function() {
        request(app);
        var builder,
            customer;
        before(function (done) {
            request(app);
            account.registration(account.userAccount.user1).then(function (res) {
                request(app)
                .post('/login')
                .send({email: account.userAccount.email, password: account.userAccount.password})
                done()
        },function (err) {
            throw err;
        })
        });
        after(function (done) {
            if (builder) {
                request(app);
                var builder = account.userAccount.role
                    .post('./builders/profile' + builder.id)
                    .send({builder_id: builder.id});
                expect(302);
                done();
            }
            if (customer) {
                request(app);
                var customer = account.customerAccount.role
                    .post('/customers/profile/' + customer.id)
                    .send({customer_id: customer.id});
                expect(302);
                done();
            }
        })
    });
});

//======================== CUSTOMER ===========================================

describe('CUSTOMER', function(){
    it('should create a customer', function(done){
        request(app)
            .post('./customers')
            .send(account.customerAccount)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/) //method
            .expect(201)
            .end(function(err, res){
                expect(res.body).to.be.an('object'); //function
                done();
            })
    });
    it('should get all customers', function(done){
        request(app)
            .get('./customers')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function(err, res){
                request(app);
                var customer = res.body;
                expect([customer]).to.be.an('array');
                done();
            });
    });

    it('should get one customer', function(done){
        request(app)
            .get('./customer/')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function(err, res){
                request(app);
                var customer = account.customerAccount;
                expect(customer).to.be.an('Object');
                done();
            });
    });
    it('should delete a customer', function(done){
        request(app)
            .post('./customers')
            .send(account.customerAccount)
            .set('Accept', 'application/json')
            .end(function(err, res){
                var customer = res.body;
                request(app)
                    .delete('./customer/' + customer.id)
                    .end(function(err, res){
                        expect(res.body).to.eql(customer); //function
                        done();
                    })
            })
    });

    it('should update a builder', function(done){
        request(app)
            .post('./customers')
            .send(account.customerAccount)
            .set('Accept', 'application/json')
            .end(function(err, res){
                var builder = res.body;
                request(app)
                    .put('./builder/' + res.body.id)
                    .send({lastname: 'new lastname'})
                    .end(function(err, res){
                        expect({lastname: 'new lastname'}).to.have.property('lastname'); //function
                        done();
                    })
            })

    })
});


describe('BUILDER', function(){
    it('should create a builder', function(done){
        request(app)
            .post('./builders')
            .send(account.builderAccount)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/) //method
            .expect(201)
            .end(function(err, res){
                expect(res.body).to.be.an('object'); //function
                done();
            })
    });
    it('should get all builders', function(done){
        request(app)
            .get('./builders')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function(err, res){
                request(app);
                var builder = res.body;
                expect([builder]).to.be.an('array');
                done();
              });
    });

    it('should get one builder', function(done){
        request(app)
            .get('./builder/')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function(err, res){
                request(app);
                var builder = account.builderAccount;
                expect(builder).to.be.an('Object');
                done();
            });
    });
    it('should delete a builder', function(done){
        request(app)
            .post('./builders')
            .send(account.builderAccount)
            .set('Accept', 'application/json')
            .end(function(err, res){
                var builder = res.body;
                request(app)
                    .delete('./builder/' + builder.id)
                    .end(function(err, res){
                        expect(res.body).to.eql(builder); //function
                        done();
                    })
            })
    });

    it('should update a builder', function(done){
        request(app)
            .post('./builders')
            .send(account.builderAccount)
            .set('Accept', 'application/json')
            .end(function(err, res){
                var builder = res.body;
                request(app)
                    .put('./builder/' + res.body.id)
                    .send({lastname: 'new lastname'})
                    .end(function(err, res){
                        expect({lastname: 'new lastname'}).to.have.property('lastname'); //function
                        done();
                    })
            })

    })
});


