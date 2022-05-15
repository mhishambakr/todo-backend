const { List, Item } = require("..");

exports.createList = async ({ id, t }) => {
    try {
        let list = await List.create({
            UserId: id
        }, { transaction: t })
        return { list }
    } catch (error) {
        throw error;
    }
}

exports.getUserList = async ({ id }) => {
    try {
        let list = await List.findOne({
            where: {
                UserId: id
            },
            attributes: ['id'],
            include: [{
                model: Item,
            attributes: ['id', 'text', 'isDone'],
            }]

        })

        return { list };
    } catch (error) {
        throw error;
    }
}