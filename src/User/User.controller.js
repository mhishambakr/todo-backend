const { sequelize } = require("..");
const { createList } = require("../List/List.service");
const { createUser, loginUser } = require("./User.service")



exports.register = async (req, res) => {
    const t = await sequelize.transaction();
    
    try {
        let { username, password } = req.body;
        let { user } = await createUser({ username, password, t });
        let { token } = await loginUser({ username, password, hashedPassword: user.password });
        let { list } = await createList({ id: user.id, t });

        res.status(200).json({
            message: 'User registered successfully',
            data: {
                user: {
                    id: user.id,
                    username
                },
                token,
                list
            }
        })

        await t.commit();

    } catch (error) {

        await t.rollback();

        res.status(error.status || 500).json({
            message: error.message || 'something went wrong'
        })
    }
}


exports.login = async (req, res) => {
    try {
        let { username, password } = req.body;
        let { user } = res.locals
        let { token } = await loginUser({ username, password, hashedPassword: user.password });
        res.status(200).json({
            message: 'User logged in successfully',
            data: {
                user: {
                    id: user.id,
                    username
                },
                token
            }
        })
    } catch (error) {
        res.status(error.status || 500).json({
            message: error.message || 'something went wrong'
        })
    }
}