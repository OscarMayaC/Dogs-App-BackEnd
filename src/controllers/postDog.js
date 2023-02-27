const { Dog } = require("../db.js");
const { Temperament } = require("../db.js");
const { DogTemperament } = require("../db.js");
const axios = require("axios");

const postDog = async (req, res) => {

    try {

        let allDogs = await axios(`http://localhost:3001/dogs`);
        allDogs = allDogs.data;
        let selector = allDogs.pop();
        let id = selector.id + 1;

        let newDog = {
            id: id,
            image: req.body.image,
            name: req.body.name,
            height: req.body.height,
            weight: req.body.weight,
            life_span: req.body.life_span,       
        }


        const createDog = await Dog.create(newDog);
        let temperament = req.body.Dog_Temperament;
        let allTemperaments = await Temperament.findAll()
        let findTemperament1 = allTemperaments.find(temp => temp.name == temperament[0]);
        let findTemperament2 = allTemperaments.find(temp => temp.name == temperament[1]);
        await DogTemperament.create({
            DogId: createDog.id,
            TemperamentId: findTemperament1.id,
        })
        await DogTemperament.create({
            DogId: createDog.id,
            TemperamentId: findTemperament2.id
        })

        res.status(201).json(createDog);

    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

module.exports = postDog;