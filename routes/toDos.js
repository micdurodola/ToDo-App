const router = require('express').Router();
let ToDo = require('../models/toDo.model');

/**GET REQUEST */
router.route('/').get((req,res)=>{
    const todo_name = req.query.todo_name ? { todo_name: req.query.todo_name } : {};
    const priority = req.query.priority ? { priority: req.query.priority } : {};
    ToDo.find({...todo_name, ...priority}).select('todo_name priority')
        .then((ToDos)=> res.json(ToDos))
        .catch((err)=>res.status(400).json('Error:' + err));
});
/**GET SINGLE ITEM REQUEST */
router.route('/:id').get((req,res)=>{
    ToDo.findById(req.params.id)
        .then((ToDo)=> res.json(ToDo))
        .catch((err)=>res.status(400).json('Error:' + err));
});

/**POST REQUEST */
router.route('/add').post((req,res)=>{
    const todo_name = req.body.todo_name;
    const status = req.body.status;
    const start_time = Date.parse(req.body.start_time);
    const end_time = Date.parse(req.body.end_time);
    const description = req.body.description;
    const priority = req.body.priority;
    const newToDO = new ToDo({
        todo_name,
        status,
        start_time,
        end_time,
        description,
        priority

    });
    newToDO.save()
        .then(()=>res.send(newToDO).json('New ToDo added!'))
        .catch ((err)=> res.status(400).json('Error:' + err));
});
/**DELETE REQUEST */
router.route('/delete/:id').delete((req,res)=>{
    ToDo.findByIdAndDelete(req.params.id)
        .then(()=>res.json('ToDo has been deleted!'))
        .catch(err=> res.status(400).json('Error: ' +err ));

});
/**UPDATE REQUEST **/
router.route('/update/:id').post((req,res)=>{
    ToDo.findById(req.params.id)
        .then(toDo=>{
            toDo.todo_name = req.body.todo_name;
            toDo.status = req.body.status;
            toDo.start_time = Date.parse(req.body.start_time);
            toDo.end_time = Date.parse(req.body.end_time);
            toDo.description = req.body.description;
            toDo.priority = req.body.priority; 
            toDo.save()
                .then(()=>res.json('Todo has been Updated'))    
                .catch(err => res.status(400).json('Error '+ err));
             
        })
        .catch(err=>res.status(400).json('Error: ' + err));


});

module.exports = router;