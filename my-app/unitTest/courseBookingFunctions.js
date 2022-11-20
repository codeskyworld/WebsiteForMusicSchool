const axios = require('axios');

const courseBookingFunctions = {
    addCourseBooking: async () => {
        await axios.post("http://localhost:3001/courseBooking", {
            headers: {
                accept: "application/json",
                "Content-Type": "application/json",
            },
            data: {
                email: "email",
                courseName: "courseName",
                bookingTime: "currentTime",
                paymentStatus: "pending",
                currentStatus: "pending",
            }
        }).then((res) => {
            result = res.data.success;
        }).catch(err => 'error');
        return result;
    },

    getCourseBooking: async () => {
        await axios.get("http://localhost:3001/coursesBooking").then((response) => {
            if (Object.keys(response).length !== 0)
                result = true;
            else
                result = false;
        })
        return result;
    },

    deleteCourseBooking: async () => {
        await axios.post("http://localhost:3001/courseBookingDeletion", {
            headers: {
                accept: "application/json",
                "Content-Type": "application/json",
            },
            data: {
                email: "email",
                courseName: "courseName",
            }
        }).then((res) => {
            result = res.data.success;
        }).catch(err => 'error');
        return result;
    },
}

module.exports = courseBookingFunctions;