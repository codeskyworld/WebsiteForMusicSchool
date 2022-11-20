const axios = require('axios');

const userFunctions = {
    addUser: async () => {
        let result = "";
        await axios.post("http://localhost:3001/register", {
            headers: {
                accept: "application/json",
                "Content-Type": "application/json",
            },
            data: {
                email: "email",
                surname: "surname",
                firstName: "firstName",
                telephone: "telephone",
                whetherBlacklist: false,
                password: "password",
            }
        })
            .then((res) => {
                result = res.data.success;
            })
            .catch(err => 'error');
        return result;
    },

    getUser: async () => {
        let result = "";
        await axios.get("http://localhost:3001/users").then((response) => {
            if (Object.keys(response).length !== 0)
            result =  true;
            else
            result = false;
        })
        return result;
    },


    updateUser: async () => {
        const res = await axios.post("http://localhost:3001/userEdition", {
            headers: {
                accept: "application/json",
                "Content-Type": "application/json",
            },
            data: {
                email: "email",
                surname: "surname",
                firstName: "firstName",
                telephone: "telephone",
                whetherBlacklist: true,
                originalPassword: "password",
                password: "password",
            }
        }).then((res) => {
            result = res.data.success;
        }).catch(err => 'error');
        return result;
    },

    deleteUser: async () => {
        await axios.post("http://localhost:3001/userDeletion", {
            headers: {
                accept: "application/json",
                "Content-Type": "application/json",
            },
            data: {
                email: "email",
            }
        }).then((res) => {
            result = res.data.success;
        }).catch(err => 'error');
        return result;
    },
}

module.exports = userFunctions;