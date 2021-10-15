const db = require('./connection');
const { User, Product, Category, Option } = require('../models');

db.once('open', async () => {
  await Option.deleteMany();

  const options = await Option.insertMany([
    { name: 'Cream' },
    { name: 'Sugar' },
  ]);

  await Category.deleteMany();

  console.log('options seeded');

  const categories = await Category.insertMany([
    { name: 'Donuts' },
    { name: 'Coffee' },
    { name: 'Kolaches' },
    { name: 'Muffins' },
  ]);

  console.log('categories seeded');

  await Product.deleteMany();

  const products = await Product.insertMany([
    {
      name: 'Plain Donut',
      description: 'Butter, Flour, Egg, Milk',
      image: 'plain-donut.jpg',
      category: categories[0]._id,
      price: 1.0,
      quantity: 500,
      options: [],
    },
    {
      name: 'Chocolate Donut',
      description: 'Butter, Flour, Egg, Milk, Chocolate',
      image: 'chocoDonut.jpg',
      category: categories[0]._id,
      price: 1.0,
      quantity: 500,
      options: [],
    },
    {
      name: 'French Cruller',
      description: 'Butter, Flour, Egg, Milk, Chocolate',
      image: 'Cruller.jpg',
      category: categories[0]._id,
      price: 1.5,
      quantity: 500,
      options: [],
    },
    {
      name: 'Apple Fritter',
      description: 'Butter, Flour, Egg, Milk, Apple, Cinnamon',
      image: 'appleFritter.jpg',
      category: categories[0]._id,
      price: 1.5,
      quantity: 500,
      options: [],
    },
    {
      name: 'Coffee',
      description: 'Coffe, Water',
      image: 'coffee.jpg',
      category: categories[1]._id,
      price: 1.5,
      quantity: 500,
      options: [options[0]._id, options[1]._id],
    },
    {
      name: 'Latte',
      description: 'Espresso, Water, Milk',
      image: 'latte.jpg',
      category: categories[1]._id,
      price: 1.99,
      quantity: 500,
      options: [options[0]._id, options[1]._id],
    },
    {
      name: 'Pumpkin Spice Late',
      description: 'Espresso, Milk, Cinamon, Allspice, Ginger, Nutmeg, Cloves',
      image: 'Pumpkin-Spice-Latte.jpg',
      category: categories[1]._id,
      price: 1.99,
      quantity: 500,
      options: [options[0]._id, options[1]._id],
    },
    {
      name: 'Sausage Kolache',
      description: 'Butter, Flour, Egg, Milk, Pork Sausage',
      image: 'sausKolache.jpg',
      category: categories[2]._id,
      price: 2.99,
      quantity: 500,
      options: [],
    },
    {
      name: 'Sweet Kolache',
      description: 'Butter, Flour, Egg, Milk, Real Fruit Filling',
      image: 'sweetKolache.jpg',
      category: categories[2]._id,
      price: 2.99,
      quantity: 500,
      options: [],
    },
    {
      name: 'Blueberry Muffin',
      description: 'Butter, Flour, Egg, Milk, Blueberries, Sugar',
      image: 'blueberry-muffin.jpg',
      category: categories[3]._id,
      price: 2.99,
      quantity: 500,
      options: [],
    },
    {
      name: 'Pumpkin Muffin',
      description:
        'Butter, Flour, Egg, Milk, Cinamon, Allspice, Ginger, Nutmeg, Cloves, Sugar',
      image: 'Pumpkin-muffin.jpg',
      category: categories[3]._id,
      price: 2.99,
      quantity: 500,
      options: [],
    },
    {
      name: 'Poppy Seed Muffin',
      description:
        'Butter, Flour, Egg, Milk, Orange Flavor, Poppy Seeds, Lemon Flavor, Sugar',
      image: 'poppy-seed-muffin.jpg',
      category: categories[3]._id,
      price: 2.99,
      quantity: 500,
      options: [],
    },
  ]);

  console.log('products seeded');

  await User.deleteMany();

  await User.create({
    firstName: 'Javier',
    lastName: 'Vilchis',
    email: 'javier@vilchis.com',
    password: 'password12345',
    employeeID: '001',
  });

  await User.create({
    firstName: 'James',
    lastName: 'Johnson',
    email: 'james@johnson.com',
    password: 'password12345',
    employeeID: '002',
  });

  await User.create({
    firstName: 'Robby',
    lastName: 'Hare',
    email: 'robby@hare.com',
    password: 'password12345',
    employeeID: '003',
  });

  await User.create({
    firstName: 'Jeremy',
    lastName: 'Williams',
    email: 'jeremy@williams.com',
    password: 'password12345',
    employeeID: '004',
  });

  console.log('users seeded');

  process.exit();
});
