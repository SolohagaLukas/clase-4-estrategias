const Sequelize = require('sequelize');

const sequelize = new Sequelize('mercado', 'root', 'root', {
  host: 'localhost',
  dialect: 'mariadb'
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
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

var array = [
    {idProduct: '10', nombre: 'Jabon', cantidad: '200', precio: '250'},
    {idProduct: '11',nombre: 'Esponja', cantidad: '90', precio: '150'},
    {idProduct: '12',nombre: 'Jabon', cantidad: '150', precio: '200'}
];

sequelize.sync()
  .then(() => Products.bulkCreate(array))
  .then(() => {
    console.log("Se agregan 3 registros");
  })
  .then(() => {
      return Products.update(
          { cantidad: '555' },
          { where: { nombre: 'Jabon' }}
      ).then(() => {
        console.log('Se actualizan los jabones')
      })
  });
