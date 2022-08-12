const seedUser = [
    {
        name: 'Matthew',
        email: 'Matthew@gmail.com'
    },
    {
        name: 'Mark',
        email: 'Mark@gmail.com'
    },
    {
        name: 'Adam',
        email: 'Adam@gmail.com'
    },
    {
        name: 'Paul',
        email: 'Paul@gmail.com'
    }
]

const seedCheese = [
    {
        title: 'Chedder',
        description: 'Basic',
    },
    {
        title: 'Gouda',
        description: 'Sounds funny',
    },
    {
        title: 'Mozzarella',
        description: 'Very stringy',
    },
    {
        title: 'Red Leciester',
        description: 'Orange in colour',
    },
]

const seedBoard = [
    {
        type: 'Basic Level',
        description: 'Basic',
        rating: 3
    },
    {
        type: 'Creamy',
        description: 'Very creamy cheeses',
        rating: 5
    },
    {
        type: 'Midnight',
        description: 'To be eaten at night',
        rating: 7
    },
    {
        type: 'Starter',
        description: 'Great as a starter',
        rating: 4
    },
]

module.exports = { seedUser, seedBoard, seedCheese }