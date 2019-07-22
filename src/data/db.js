const Sequelize = require('sequelize');

const sequelize = new Sequelize('core', 'kokos', '', {
    dialect: 'postgres',
    host: 'localhost',
    define: {
        timestamp: false
    }
});

const Creator = sequelize.define('creators', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false
    },
    name: {
        type: Sequelize.TEXT
    }
});

const Product = sequelize.define('products', {
    name: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    description: {
        type: Sequelize.TEXT
    }

});

Creator.hasMany(Product);
Product.belongsTo(Creator);
sequelize.sync().then(result => {
}).catch(err => console.log(err));

module.exports = sequelize;
