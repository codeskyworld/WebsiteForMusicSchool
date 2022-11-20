const axios = require('axios');

const gigBookingFunctions = {
    addGigBooking: async () => {
        await axios.post("http://localhost:3001/gigBooking", {
            headers: {
                accept: "application/json",
                "Content-Type": "application/json",
            },
            data: {
                email: "email1",
                gigName: "gigName",
                bookingTime: "currentTime",
                paymentStatus: "pending",
                currentStatus: "pending",
            }
        }).then((res) => {
            result = res.data.success;
        }).catch(err => 'error');
        return result;
    },

    getGigBooking: async () => {
        await axios.get("http://localhost:3001/gigsBooking").then((response) => {
            if (Object.keys(response).length !== 0)
                result = true;
            else
                result = false;
        })
        return result;
    },

    deleteGigBooking: async () => {
        await axios.post("http://localhost:3001/gigBookingDeletion", {
            headers: {
                accept: "application/json",
                "Content-Type": "application/json",
            },
            data: {
                email: "email1",
                gigName: "gigName",
            }
        }).then((res) => {
            result = res.data.success;
        }).catch(err => 'error');
        return result;
    },
}

module.exports = gigBookingFunctions;