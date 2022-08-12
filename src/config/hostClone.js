const SerieModel = require("../schema/truyen.js");

const getTopListSerieMovie = async() => {
    return await SerieModel.find()
        .sort({ Chapter: -1 })
        .select(["Chapter"])

};
const getTop = async(param) => {
    return await SerieModel.find({ Chapter: param })
        .select(["Chapter"])

};
module.exports = {
    getTopListSerieMovie,
    getTop
};