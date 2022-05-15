const { Item } = require("..");


exports.addTodoItem = async ({text, ListId}) => {
    try {
        let item = await Item.create({
            text,
            ListId
        })

        return item;
    } catch (error) {
        throw error;
    }
}

exports.updateTodo = async ({data,id})=>{
    try {
        console.log(data);
        console.log(id);
        let updated = await Item.update({
            ...data
        },{
            where: {
                id
            }
        })
    } catch (error) {
        throw error;
    }
}