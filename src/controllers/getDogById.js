const axios = require("axios");



const getDogById = async (req, res) => {

    try {
        const idBreed = parseInt(req.params.idBreed);
        let searchAllDogs = await axios(`http://localhost:3001/dogs`);
        searchAllDogs = searchAllDogs.data;
        const findBreed = searchAllDogs.find(breed => breed.id == idBreed);
        if (findBreed) {
            res.status(200).json({
                id: findBreed.id,
                image: findBreed.image,
                name: findBreed.name,
                height: findBreed.height,
                weight: findBreed.weight,
                life_span: findBreed.life_span,
                temperaments: findBreed.temperament
            })
        } else {
            res.status(404).json({ error: "This breed of dog does not exist" })
        }
    } catch (error) {
        res.status(404).json({ error: error.message });
    }

}

module.exports = getDogById;