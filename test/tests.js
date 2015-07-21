var request         = require('supertest');
var assert          = require('chai').assert;
var expect          = require('chai').expect;
var config          = require('../app/configs/index');
var api             = request(config.get("host") + ":" + config.get("port"));

describe('Routing', function() {
    describe('User', function() {
        it('Should return error trying to save duplicate user.', function (done) {
            var data = {
                username: config.get("default:user:username"),
                password: config.get("default:user:password")
            };
            api.post('/api/users/create')
                .send(data)
                .expect(500)
                .end(function (err, res) {
                    assert(res.status == 500);
                    done();
                });
        });
    });
    describe('Client', function() {
        it('Should return error trying to save duplicate client.', function(done) {
            var data = {
                name: config.get("default:client:name"),
                clientId: config.get("default:client:clientId"),
                clientSecret: config.get("default:client:clientSecret")
            };
            api.post('/api/clients/create')
                .send(data)
                .expect(500)
                .end(function(err, res) {
                    assert(res.status == 500);
                    done();
                });
        });
    });
    describe('Link', function() {
        it('Should return the value by short link.', function(done) {
            var data = {
                shortValue: config.get("default:link:shortValue")
            };
            api.post('/api/links/byShortValue')
                .send(data)
                .expect(200)
                .end(function(err, res) {
                    assert(res.status == 200);
                    expect(res.body.link.shortValue).to.equal(config.get("default:link:shortValue"));
                    done();
                });
        });
    });
});