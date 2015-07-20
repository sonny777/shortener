var test = require('tape');
var request = require('supertest');
var app = require('../server');

test('Correct users returned', function (t) {
    request(app)
        .post('/api/users')
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function (err, res) {
            t.end();
        });
});