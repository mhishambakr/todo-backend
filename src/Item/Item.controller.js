const { addTodoItem, update, updateTodo } = require("./Item.service");


exports.addItem = async (req,res) => {
    try {
        let { List } = res.locals.user;

        let {text} = req.body;
        

        let item = await addTodoItem({text, ListId: List.id})

        res.status(200).json({
            message: 'Todo added successfully',
        })
    } catch (error) {
        res.status(error.status || 500).json({
            message: error.message || 'something went wrong'
        })
    }
}

exports.updateTodo = async (req,res)=>{
    try {
        console.log(req.body);
        let {id} = req.body;
        let data = req.body;
        
        delete data['id'];
        
        let updated = await updateTodo({data,id})

        res.status(200).json({
            message: 'Todo updated successfully',
        })
    } catch (error) {
        res.status(error.status || 500).json({
            message: error.message || 'something went wrong'
        })
    }
}