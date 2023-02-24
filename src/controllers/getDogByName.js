const axios = require("axios");
const { Dog, Temperament, DogTemperament } = require("../db.js");
const { API_KEY } = process.env;

const getDogByName = async (req, res) => {
    try {
        let { beed } = req.query;
        beed = beed.toUpperCase();
        let searchDogApi = await axios(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`);
        searchDogApi = searchDogApi.data;
        let filterBreed = [];
        for (let i = 0; i < searchDogApi.length; i++) {
            let temp = searchDogApi[i].name
            temp = temp.toUpperCase();
            if (temp.includes(beed)) {
                filterBreed.push({
                    id: searchDogApi[i].id,
                    image: searchDogApi[i].image.url,
                    name: searchDogApi[i].name,
                    height: searchDogApi[i].height.metric,
                    weight: searchDogApi[i].weight.metric,
                    life_span: searchDogApi[i].life_span,
                    temperament: searchDogApi[i].temperament
                })
            }
        }
        let searchDogDB = await Dog.findAll();
        for (let i = 0; i < searchDogDB.length; i++) {
            let temp = searchDogDB[i].name
            temp = temp.toUpperCase();
            let allRelationship = await DogTemperament.findAll();
            if (temp.includes(beed)) {
                let searchRelationship = allRelationship.filter(rel => rel.DogId == searchDogDB[i].id);
                let temperament1 = await Temperament.findByPk(searchRelationship[0].TemperamentId);
                let temperament2 = await Temperament.findByPk(searchRelationship[1].TemperamentId);
                let dogDB = {
                    id: searchDogDB[i].id,
                    image: searchDogDB[i].image,
                    name: searchDogDB[i].name,
                    height: searchDogDB[i].height,
                    weight: searchDogDB[i].weight,
                    life_span: searchDogDB[i].life_span,
                    temperament: temperament1.name + "," + " " + temperament2.name
                }
                filterBreed.push(dogDB)
            }
        }
        if (filterBreed.length > 0) {
            res.status(200).json(filterBreed);
        } else {
            res.status(404).json({ error: "This breed of dog does not exist" })
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = getDogByName;