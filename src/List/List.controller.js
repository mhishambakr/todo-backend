const { getUserList } = require("./List.service");


exports.getUserList = async (req, res) => {
    try {
        let { id } = res.locals.user;

        let { list } = await getUserList({ id });

        res.status(200).json({
            message: 'List fetched successfully',
            data: {
                list
            }
        })
    } catch (error) {
        res.status(error.status || 500).json({
            message: error.message || 'something went wrong'
        })
    }
}