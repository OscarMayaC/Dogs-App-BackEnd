// const axios = require("axios")
// const { Dog } = require("../db.js")
// const { Temperament } = require("../db.js");

// //esta funcion llamara a todos los perros de la api
// // y los guardara en la base de datos

// const getApiDataDog = async () => {

//     try {
//         let allDogsApi = await axios(`https://api.thedogapi.com/v1/breeds?api_key=live_Z3Hv8xEqwnZiwhOEIgfR8AMh80mDf20PuWuh2iO3tmpdzqDWy0yzmudvBm9ePX88`);

//         allDogsApi = allDogsApi.data.map(dog => {
//             return ({
//                 id: dog.id,
//                 image: dog.image.url,
//                 name: dog.name,
//                 height: dog.height.metric,
//                 weight: dog.weight.metric,
//                 life_span: dog.life_span
//             })
//         })
//         return allDogsApi
//     } catch (error) {
//         return { error: error.message }
//     }

// }

// const getApiDataTemperament = async () => {
//     try {
//         let counter = 0;
//         let allDogsApi = await axios(`https://api.thedogapi.com/v1/breeds?api_key=live_Z3Hv8xEqwnZiwhOEIgfR8AMh80mDf20PuWuh2iO3tmpdzqDWy0yzmudvBm9ePX88`);
//         allDogsApi = allDogsApi.data;
//         let temperaments = []
//         for (let i = 0; i < allDogsApi.length; i++) {
//             let temp = allDogsApi[i].temperament;
//             temp = temp.split(",");
//             for (let j = 0; j < temp.length; j++) {
//                 let word = temp[j]
//                 word = word.trim();
//                 let verification = temperaments.find(tempera => tempera.name == word)
//                 if (verification) {

//                 } else {
//                     temperaments.push({
//                         id: counter = counter + 1,
//                         name: temp[j]
//                     });
//                 }
//             }
//         }
//         return temperaments;
//     } catch (error) {
//         return { error: error.message }
//     }
// }


// const saveDataApi = async () => {

//     try {
//         let allDogs = await getApiDataDog();
//         let allTemperaments = await getApiDataTemperament();
//         await Dog.bulkCreate(allDogs);
//         return await Temperament.bulkCreate(allTemperaments);

//     } catch (error) {
//         return { error: error.message }
//     }


// }

// module.exports = saveDataApi;
