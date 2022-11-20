const axios = require('axios');

const gigFunctions = {

    addGig: async () => {
        await axios.post("http://localhost:3001/gigCreation", {
            headers: {
                accept: "application/json",
                "Content-Type": "application/json",
            },
            data: {
                gigName: "gigName1",
                style: "style",
                price: "price",
                description: "description",
                place: "place",
                startTime: "startTime",
                endTime: "endTime",
                dateList: "dateList",
                oneForOne: "oneForOne",
                picturePath: "picturePath",
            }
        })
            .then((res) => {
                result = res.data.success;
            }).catch(err => 'error');
        return result;
    },

    getGig: async () => {
        axios.get("http://localhost:3001/gigs").then((response) => {
            if (Object.keys(response).length !== 0)
                result = true;
            else
                result = false;
        })
        return result;
    },

    updateGig: async () => {

        const res = await axios.post("http://localhost:3001/gigEdition", {
            headers: {
                accept: "application/json",
                "Content-Type": "application/json",
            },
            data: {
                gigName: "gigName",
                style: "style",
                price: "price",
                description: "description",
                place: "place",
                startTime: "startTime",
                endTime: "endTime",
                dateList: "dateList",
                oneForOne: "oneForMany",
                picturePath: "picturePath",
            }
        }).then((res) => {
            result = res.data.success;
        }).catch(err => 'error');
        return result;
    },

    deleteGig: async () => {
        await axios.post("http://localhost:3001/gigDeletion", {
            headers: {
                accept: "application/json",
                "Content-Type": "application/json",
            },
            data: {
                gigName: "gigName1",
            }
        }).then((res) => {
            result = res.data.success;
        }).catch(err => 'error');
        return result;
    },
}

module.exports = gigFunctions;