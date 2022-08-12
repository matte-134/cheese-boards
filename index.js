const { db, User, Board, Cheese } = require('./db')

Board.belongsTo(User)
User.hasMany(Board)

Board.belongsToMany(Cheese, {through: 'cheese_board'})
Cheese.belongsToMany(Board, {through: 'cheese_board'})

// Band.belongsToMany(Song, {through: 'band_song'})
// Song.belongsToMany(Band, {through: 'band_song'})

module.exports = { User, Board, Cheese }