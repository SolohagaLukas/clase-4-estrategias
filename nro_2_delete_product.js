const Sequelize = require('sequelize');

const sequelize = new Sequelize('mercado', 'root', 'root', {
    host: 'localhost',
    dialect: 'mariadb'
});

sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established succesfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

class Products extends Sequelize.Model {}
Products.init({
    idProduct: Sequelize.INTEGER,
    nombre: Sequelize.STRING,
    cantidad: Sequelize.INTEGER,
    precio: Sequelize.INTEGER
}, { sequelize, modelName: 'productos'});

sequelize.sync()
    .then(() => Products.create({
        idProduct: '5',
        nombre: 'Detergente',
        cantidad: '50',
        precio: '300'
    })).then(jane => {
        console.log(jane.toJSON());
    }).then(() => {
        Products.destroy({
            where: {
                idProduct: '5'
        }
        }).then(() => {
            console.log("Se elimina el registro insertado");
        })
    });