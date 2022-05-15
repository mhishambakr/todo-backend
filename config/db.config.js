
module.exports = {
    HOST: "localhost",
    USER: 'root',
    PASSWORD: 'Root_123',
    DB: "todo-app",
    dialect: "mysql",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};
