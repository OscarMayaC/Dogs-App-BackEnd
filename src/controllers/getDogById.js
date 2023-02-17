const axios = require("axios");
const { Dog } = require("../db.js");
const { API_KEY } = process.env;


const getDogById = async (req, res) => {

    try {
        const idBreed = parseInt(req.params.idBreed);
        let searchDogApi = await axios(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`);
        searchDogApi = searchDogApi.data;
        const findBreed = searchDogApi.find(breed => breed.id == idBreed);
        if (findBreed) {
            res.status(200).json({
                id: findBreed.id,
                image: findBreed.image.url,
                name: findBreed.name,
                height: findBreed.height.metric,
                weight: findBreed.weight.metric,
                life_span: findBreed.life_span,
                temperaments: findBreed.temperament
            })
        } else {
            const searchDogDB = await Dog.findByPk(idBreed);
            res.status(200).json(searchDogDB)
        }
    } catch (error) {
        res.status(404).json({ error: "This breed of dog does not exist" });
    }

}

module.exports = getDogById;