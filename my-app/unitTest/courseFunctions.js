const axios = require('axios');

const courseFunctions = {
    addCourse: async () => {
        await axios.post("http://localhost:3001/courseCreation", {
            headers: {
                accept: "application/json",
                "Content-Type": "application/json",
            },
            data: {
                courseName: "courseName1",
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

    getCourse: async () => {
        await axios.get("http://localhost:3001/courses").then((response) => {
            if (Object.keys(response).length !== 0)
                result = true;
            else
                result = false;
        })
        return result;
    },

    updateCourse: async () => {
        const res = await axios.post("http://localhost:3001/courseEdition", {
            headers: {
                accept: "application/json",
                "Content-Type": "application/json",
            },
            data: {
                courseName: "courseName",
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

    deleteCourse: async () => {
        await axios.post("http://localhost:3001/courseDeletion", {
            headers: {
                accept: "application/json",
                "Content-Type": "application/json",
            },
            data: {
                courseName: "courseName1",
            }
        }).then((res) => {
            result = res.data.success;
        }).catch(err => 'error');
        return result;
    },
}

module.exports = courseFunctions;