const { Sequelize, DataTypes } = require('sequelize')
const {
    seedUser,
    seedCheese,
    seedBoard
} = require('./seedData.js')

const db = new Sequelize({
    dialect: 'sqlite',
    storage: './data.sqlite'
})

const User = db.define('User', {
    name: {
        type: DataTypes.STRING
    }, 
    email: {
        type: DataTypes.STRING
    }
})

const Board = db.define('Board', {
    type: {
        type: DataTypes.STRING
    },
    description: {
        type: DataTypes.STRING
    },
    rating: {
        type: DataTypes.INTEGER
    }
})

const Cheese = db.define('Cheese', {
    title: {
        type: DataTypes.STRING
    },
    description: {
        type: DataTypes.STRING
    }
})

Board.belongsTo(User)
User.hasMany(Board, {foreignKey: 'user_ID'})

Board.belongsToMany(Cheese, {through: 'cheese_board'})
Cheese.belongsToMany(Board, {through: 'cheese_board'})

async function main () {
    await db.sync({ force: true })

    await User.create({
        name: 'Matthew',
        email: 'M@gmail.com'
    })
    let board = await Board.create(seedBoard[0])
    let cheese = await Cheese.create(seedCheese[0])
    await board.addCheese(cheese)
    const getCheese = await board.getCheeses()
    

    console.log(getCheese)
}

// main ()

module.exports = { db , User, Board, Cheese }