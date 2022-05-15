const userRoutes = require('./User/User.routes');
const listRoutes = require('./List/List.routes');
const itemRoutes = require('./Item/Item.routes');
module.exports = (app,base) => {
    app.use(`${base}/user`, userRoutes);
    app.use(`${base}/list`, listRoutes);
    app.use(`${base}/item`, itemRoutes);
}
