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
    })
});


describe('role testing', function(){
    describe('builder', function(){
        var admin,
            builder,
            customer,
            guest;
        it('should redirect to builder`s profile page', function(done) {
            request(app)
                .post('/login')
                .send({email: 'natali@gmail.com', password: 1111111111})
                .end(function (err, res) {
                    request(app)
                        .get('./builders/profile');
                    expect(302);
                    done();
                });
        })
    });

    describe('customer', function(){
        var admin,
            builder,
            customer,
            guest;
        it('should redirect to customer`s profile page', function(done) {
            request(app)
                .post('/login')
                .send({email: 'dgf@mail.com', password: 1111111111})
                .end(function (err, res) {
                    request(app);
                        var customer = res.body
                        .get('./customers/profile' + customer.id);
                    expect(302);
                    done();
                });
        })
    })

});






describe('BUILDER', function(){
    it('should create a builder', function(done){
        request(app)
            .post('./builders')
            .send({
                title: 'Mr',
                firstname:'Bob',
                lastname: 'Smith',
                position:'painter',
                dob: '13/08/1980',
                email: 'bobsmith@gmail.com',
                phonenumber: '07984552354',
                ncards:'4 cards',
                education: 'college',
                insurance: 'yes',
                address: '21 High road, Leyton',
                postcode:'e3 4er',
                password: '1111111111'
            })
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
                var builder = {
                        title: 'Mrs',
                        firstname:'Natali',
                        lastname: 'Smith',
                        position:'cleaner',
                        dob: '25/08/1983',
                        email: 'natali@gmail.com',
                        phonenumber: '079455525774',
                        role:'builder',
                        ncards:'4 cards',
                        education: 'college',
                        insurance: 'yes',
                        address: '21 Oveton Drive, Wanstead',
                        postcode:'e11 4brg',
                        password: '1111111111'
                };
                expect(builder).to.be.an('Object');
                done();
            });
    });
    it('should delete a builder', function(done){
        request(app)
            .post('./builders')
            .send({
                title: 'Mrs',
                firstname:'Natali',
                lastname: 'Smith',
                position:'cleaner',
                dob: '25/08/1983',
                email: 'natali@gmail.com',
                phonenumber: '079455525774',
                ncards:'4 cards',
                education: 'college',
                insurance: 'yes',
                address: '21 Oveton Drive, Wanstead',
                postcode:'e11 4brg',
                password: '1111111111'
            })
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
            .send({
                title: 'Mrs',
                firstname:'Natali',
                lastname: 'Smith',
                position:'cleaner',
                dob: '25/08/1983',
                email: 'natali@gmail.com',
                phonenumber: 'new phone',
                ncards:'4 cards',
                education: 'college',
                insurance: 'yes',
                address: '21 Oveton Drive, Wanstead',
                postcode:'e11 4brg',
                password: '1111111111'
            })
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
