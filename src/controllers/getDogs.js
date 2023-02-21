const axios = require("axios");
const { Dog, Temperament, DogTemperament } = require("../db.js");
const { API_KEY } = process.env;

const getDogs = async (req, res) => {

    try {
        let allDogsApi = await axios(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`);
        allDogsApi = allDogsApi.data.map(dog => {
            return ({
                id: dog.id,
                image: dog.image.url,
                name: dog.name,
                height: dog.height.metric,
                weight: dog.weight.metric,
                life_span: dog.life_span,
                temperament: dog.temperament
            })
        })
        let allDogsDBReady = [];
        let allDogsDB = await Dog.findAll();
        if (allDogsDB.length > 0) {
            let allRelationship = await DogTemperament.findAll();
            for (let i = 0; i < allDogsDB.length; i++) {
                let searchRelationship = allRelationship.filter(rel => rel.DogId == allDogsDB[i].id);
                let temperament1 = await Temperament.findByPk(searchRelationship[0].TemperamentId);
                let temperament2 = await Temperament.findByPk(searchRelationship[1].TemperamentId);
                let dogDB = {
                    id: allDogsDB[i].id,
                    image: allDogsDB[i].image,
                    name: allDogsDB[i].name,
                    height: allDogsDB[i].height,
                    weight: allDogsDB[i].weight,
                    life_span: allDogsDB[i].life_span,
                    temperament: temperament1.name + "," + " " + temperament2.name
                }
                allDogsDBReady.push(dogDB);
            }
        }
        let allDogs = allDogsApi.concat(allDogsDBReady);

        res.status(200).json(allDogs)

    } catch (error) {
        res.status(500).json({ error: error.message })
    }

}

module.exports = getDogs;