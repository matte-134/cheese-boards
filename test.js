const { db } = require('./db.js')
const { User, Board, Cheese } = require('./index.js')
const {
    seedUser,
    seedCheese,
    seedBoard
} = require('./seedData.js')

describe('User, Cheese and Boards models', () => {
    beforeEach(async () => {
        await db.sync({ force: true });
    })
    test('Test that a new user is created', async () => {
        const newUser = await User.create(seedUser[0])
        expect(newUser.name).toBe(seedUser[0].name)
    })
    test('Test that a new cheese is created', async () => {
        const newCheese = await Cheese.create(seedCheese[0])
        expect(newCheese.title).toBe(seedCheese[0].title)
    })
    test('Test that a new board is created', async () => {
        const newBoard = await Board.create(seedBoard[0])
        expect(newBoard.type).toBe(seedBoard[0].type)
    })
})
describe('Assosiations', () => {
    beforeAll(async () => {
        await db.sync({ force: true })
    })
    test('Test that a User can have many Boards', async () => {
        const newUser = await User.create(seedUser[0])
        await newUser.createBoard(seedBoard[0])
        await newUser.createBoard(seedBoard[1])
        const boards = await newUser.getBoards()
        expect(boards.length).toBe(2)
    })
    test('Test that a Cheeses can be part of many Boards', async () => {
        let board = await Board.create(seedBoard[0])
        let cheese = await Cheese.create(seedCheese[0])
        let board1 = await Board.create(seedBoard[1])
        await board.addCheese(cheese)
        await board1.addCheese(cheese)
        const getCheese = await board.getCheeses()
        const getCheese2 = await board1.getCheeses()
        expect(getCheese.length).toBe(1)
        expect(getCheese2.length).toBe(1)
        expect(getCheese.type == getCheese2.type).toBe(true)
    })
    test('Test that a Board can have many cheeses', async () => {
        let newBoard = await Board.create(seedBoard[2])
        let newCheese = await Cheese.create(seedCheese[2])
        let newCheese2 = await Cheese.create(seedCheese[1])
        // console.log(newBoard)
        await newBoard.addCheese(newCheese) 
        await newBoard.addCheese(newCheese2)
        const getNewCheese = await newBoard.getCheeses()
        // console.log(getNewCheese)
        expect(getNewCheese.length).toBe(2)  
    })
})
describe('Eager Loading', () => {
    beforeAll(async () => {
        await db.sync({ force: true })
    })
    test('Loading a board with its cheeses', async () => {
        let newBoard = await Board.create(seedBoard[2])
        let newCheese = await Cheese.create(seedCheese[2])
        let newCheese2 = await Cheese.create(seedCheese[1])
        // console.log(newBoard)
        await newBoard.addCheese(newCheese) 
        await newBoard.addCheese(newCheese2)
        const findCheese = await Board.findOne({include: Cheese})
        // console.log(findCheese.toJSON())
        expect(findCheese.Cheeses.length).toBe(2)
    })
})
