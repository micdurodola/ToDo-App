let mongoose = require("mongoose");
let ToDo= require('../models/toDo.model');

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();


chai.use(chaiHttp);
//Our parent block
describe('ToDo', () => {
    beforeEach((done) => { //Before each test we empty the database
        ToDo.remove({}, (err) => {
           done();
        });
    });
/*
  * Test the /GET route
  */
  describe('/GET ToDo', () => {
      it('it should GET todo', (done) => {
        chai.request(server)
        .get('/todo')        
        .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('array');
              res.body.length.should.be.eql(0);  
              done();           
         
        });
  });

});
 /*
  * Test the /POST route
  */
 describe('/POST ToDo',()=>{
     it('it should send a POST a ToDo', (done)=>{
         let toDo = {
             todo_name:"Fitness",
             status:"true",
             start_time:"2021-12-18T10:43:47.017Z",
             end_time:"2021-12-20T10:43:47.017Z",
             description:"This is a fitness ToDo action",
             priority:"High"
         }
         chai.request(server)
         .post('/todo/add/')
         .send(toDo)
         .end((err,res)=>{
             res.should.have.status(200);
            res.body.should.be.a('object'); 
            res.body.should.have.a.property('todo_name');  
            res.body.should.have.a.property('status');  
            res.body.should.have.a.property('start_time');   
            res.body.should.have.a.property('end_time'); 
            res.body.should.have.a.property('description'); 
            res.body.should.have.a.property('priority');          
            done();


         });

       
     });

 });

 describe('/GET/:id ToDo', () => {
    it('it should GET a ToDo by the given id', (done) => {
        let toDo = new ToDo({ 
                todo_name:"Fitness",
                status:"true",
                start_time:"2021-12-18T10:43:47.017Z",
                end_time:"2021-12-20T10:43:47.017Z",
                description:"This is a fitness ToDo action",
                priority:"High"
         });
        toDo.save((err, toDo) => {
            chai.request(server)
          .get('/todo/' + toDo.id)
          .send(toDo)
          .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('todo_name');
                res.body.should.have.property('status');
                res.body.should.have.property('start_time');
                res.body.should.have.property('end_time');
                res.body.should.have.property('_id').eql(toDo.id);
            done();
          });
        });

    });
});



});