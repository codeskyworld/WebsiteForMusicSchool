const express = require('express')
const app = express()
const fileUpload = require('express-fileupload');
const bcrypt = require("bcrypt");

const mysql = require('mysql')

const cors = require('cors');
app.use(cors());
app.use(express.json());
app.use(fileUpload());
app.use(express.static('uploads'));


const db = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    password: 'password',
    database: 'employeesystem',
})


//Used for test, realised in unitTest
app.post("/create", (req, res) => {
    const name = req.body.name;
    const age = req.body.age;
    const country = req.body.country;
    const position = req.body.position;
    const wage = req.body.wage;

    db.query(
        "INSERT INTO employees (name, age, country, position, wage) VALUES (?,?,?,?,?)",
        [name, age, country, position, wage],
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send("Values Inserted");
            }
        }
    );
});
//Used for test
app.get('/employees', (req, res) => {
    db.query("SELECT * FROM employees", (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});




//Used for user register
app.post("/register", (req, res) => {

    const email = req.body.data.email;
    const surname = req.body.data.surname;
    const firstName = req.body.data.firstName;
    const telephone = req.body.data.telephone;
    const whetherBlacklist = req.body.data.whetherBlacklist;
    const password = req.body.data.password;

    const saltRounds = 10;
    const hashpassword = bcrypt.hashSync(password, saltRounds);

    db.query(
        "INSERT INTO musers (email, surname, firstName, telephone, whetherBlacklist, password) VALUES (?,?,?,?,?,?)",
        [email, surname, firstName, telephone, whetherBlacklist, hashpassword],
        (err, result) => {
            if (err) {
                console.log("insert failed!" + err)
                res.status(404).json({
                    error: true,
                    message: "Error executing query" + err,
                });
            } else {
                console.log("insert succeeded!")
                res.status(200).json({
                    success: true,
                    message: "New User has been registered successfully."
                });
            }
        }
    );
});

//Used for user login
app.post("/login", async (req, res) => {

    const email = req.body.data.email;
    const password = req.body.data.password;

    db.query(
        "SELECT * FROM musers WHERE email = ?",
        [email],
        async (err, result) => {
            if (Object.keys(result).length === 0) {
                res.status(400).json({
                    success: false,
                    message: "User doesn't exist!",
                });
            }
            else {
                console.log("999999999");
                const comparison = await bcrypt.compare(password, result[0].password);

                console.log("login comparison is " + comparison);
                if (comparison) {
           
                    res.status(200).json({
                        success: true,
                        message: "New User has login successfully."
                    });
                } else {
           
                    res.status(401).json({
                        error: true,
                        message: "Password is incorrect",
                    });
                }

            }
        }
    );
});



//Used for checking current person information
app.post("/checkCurrentInformation", (req, res) => {

    const email = req.body.data.email;
    db.query(
        "SELECT * FROM musers WHERE email = ?",
        [email],
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send(result);
            }
        }
    );
});




//Used for user edition
app.post("/userEdition", async (req, res) => {
   
    const email = req.body.data.email;
    const surname = req.body.data.surname;
    const firstName = req.body.data.firstName;
    const telephone = req.body.data.telephone;
    const whetherBlacklist = req.body.data.whetherBlacklist;
    const originalPassword = req.body.data.originalPassword;
    const password = req.body.data.password;

    db.query(
        "SELECT * FROM musers WHERE email = ?",
        [email],
        async (err, result) => {
            if (!result) {
                res.status(400).json({
                    success: false,
                    message: "User already doesn't exist!",
                });
            }
            else {
                const comparison = await bcrypt.compare(originalPassword, result[0].password);
                if (comparison) {
                    const saltRounds = 10;
                    const hashpassword = bcrypt.hashSync(password, saltRounds);

                    db.query(
                        "UPDATE musers SET surname = ?, firstName = ?, telephone = ?, whetherBlacklist = ?, password = ? WHERE email = ?",
                        [surname, firstName, telephone, whetherBlacklist, hashpassword, email],
                        (err, result) => {
                            if (err) {
                                console.log("update personal information failed!" + err)
                                res.status(404).json({
                                    error: true,
                                    message: "Error executing query" + err,
                                });
                            }
                            else {
                                res.status(200).json({
                                    success: true,
                                    message: "New User has login successfully."
                                });
                            }
                        }
                    );
                } else {
                    console.log("This is an error of password check for updating");
                    res.status(401).json({
                        error: true,
                        message: "Password is incorrect",
                    });
                }

            }
        }
    );
});


//Used for editing user in blacklist
app.post("/userEditInBlacklist", (req, res) => {
    const email = req.body.data.email;
    const whetherBlacklist = req.body.data.whetherBlacklist;

    db.query(
        "UPDATE musers SET whetherBlacklist = ? WHERE email = ?",
        [whetherBlacklist, email],
        (err, result) => {
            if (err) {
                console.log("userEditInBlacklist update failed! " + err)
                res.status(404).json({
                    error: true,
                    message: "Error of userAddToBlacklist executing query" + err,
                });
            } else {
                console.log("userAddToBlacklist update succeeded!")
                res.status(200).json({
                    success: true,
                    message: `${email} has been added to Blacklist successfully.`
                });
            }
        }
    );
});


//Used for getting all the users 
app.get('/users', (req, res) => {
    db.query("SELECT * FROM musers", (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});

//Used for user deletion, realized in unitTest
app.post("/userDeletion", (req, res) => {
    const email = req.body.data.email;
    db.query(
        "DELETE FROM musers WHERE email = ?",
        [email],
        (err, result) => {
            if (err) {
                console.log("User Deletion failed!" + err)
                res.status(404).json({
                    error: true,
                    message: "Error executing query" + err,
                });
            } else {
                console.log("User Deletion succeeded!")
                res.status(200).json({
                    success: true,
                    message: "The User of id has been deleted successfully."
                });
            }
        }
    );
});



//Used for course creation
app.post("/courseCreation", (req, res) => {
    
    const courseName = req.body.data.courseName;
    const style = req.body.data.style;
    const price = req.body.data.price;
    const description = req.body.data.description;
    const place = req.body.data.place;
    const startTime = req.body.data.startTime;
    const endTime = req.body.data.endTime;
    const dateList = req.body.data.dateList;
    const oneForOne = req.body.data.oneForOne;
    const picturePath = req.body.data.picturePath;

    console.log("picturePath: " + picturePath);
    
    db.query(
        "INSERT INTO courses (courseName, style, price, description, place, startTime, endTime, dateList, oneForOne, picturePath) VALUES (?,?,?,?,?,?,?,?,?,?)",
        [courseName, style, price, description, place, startTime, endTime, dateList, oneForOne, picturePath],
        (err, result) => {
            if (err) {
                console.log("insert failed!" + err)
                res.status(404).json({
                    error: true,
                    message: "Error executing query" + err,
                });
            } else {
                console.log("insert succeeded!")
                res.status(200).json({
                    success: true,
                    message: "New Course has been created successfully."
                });
            }
        }
    );
});


app.get('/courses', (req, res) => {
    db.query("SELECT * FROM courses", (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});


//Used for course edition
app.post("/courseEdition", (req, res) => {
   
    const courseName = req.body.data.courseName;
    const style = req.body.data.style;
    const price = req.body.data.price;
    const description = req.body.data.description;
    const place = req.body.data.place;
    const startTime = req.body.data.startTime;
    const endTime = req.body.data.endTime;
    const dateList = req.body.data.dateList;
    const oneForOne = req.body.data.oneForOne;
    const picturePath = req.body.data.picturePath;

    console.log("picturePath: " + picturePath);
    
    db.query(
        "UPDATE courses SET style = ?, price = ?, description = ?, place = ?, startTime = ?, endTime = ?, dateList = ?, oneForOne =?, picturePath = ? WHERE courseName = ?",
        [style, price, description, place, startTime, endTime, dateList, oneForOne, picturePath, courseName],
        (err, result) => {
            if (err) {
                console.log("update failed!" + err)
                res.status(404).json({
                    error: true,
                    message: "Error executing query" + err,
                });
            } else {
                console.log("course update succeeded!")
                res.status(200).json({
                    success: true,
                    message: `${courseName} has been update successfully.`
                });
            }
        }
    );
});


//Used for check current course detail
app.post('/courseDetail', (req, res) => {

    const courseName = req.body.data.courseName;
    console.log("our courseName is " + courseName);

    db.query("SELECT * FROM courses WHERE courseName = ?",
        [courseName], (err, result) => {
            if (err) {
                console.log(err);
            } else {
                console.log("courseName result is " + result);
                res.send(result);
            }
        });
});



//Used for course deletion
app.post("/courseDeletion", (req, res) => {
    
    const courseName = req.body.data.courseName;
    db.query(
        "DELETE FROM courses WHERE courseName = ?",
        [courseName],
        (err, result) => {
            if (err) {
                console.log("Deletion failed!" + err)
                res.status(404).json({
                    error: true,
                    message: "Error executing query" + err,
                });
            } else {
                console.log("Deletion succeeded!")
                res.status(200).json({
                    success: true,
                    message: "The Course has been deleted successfully."
                });
            }
        }
    );
});




//Used for gig creation
app.post("/gigCreation", (req, res) => {
    
    const gigName = req.body.data.gigName;
    const style = req.body.data.style;
    const price = req.body.data.price;
    const description = req.body.data.description;
    const place = req.body.data.place;
    const startTime = req.body.data.startTime;
    const endTime = req.body.data.endTime;
    const dateList = req.body.data.dateList;
    const oneForOne = req.body.data.oneForOne;
    const picturePath = req.body.data.picturePath;

    console.log("picturePath: " + picturePath);

    db.query(
        "INSERT INTO gigs (gigName, style, price, description, place, startTime, endTime, dateList, oneForOne, picturePath) VALUES (?,?,?,?,?,?,?,?,?,?)",
        [gigName, style, price, description, place, startTime, endTime, dateList, oneForOne, picturePath],
        (err, result) => {
            if (err) {
                console.log("insert failed!" + err)
                res.status(404).json({
                    error: true,
                    message: "Error executing query" + err,
                });
            } else {
                console.log("insert succeeded!")
                res.status(200).json({
                    success: true,
                    message: "New Gig has been created successfully."
                });
            }
        }
    );
});


app.get('/gigs', (req, res) => {
    db.query("SELECT * FROM gigs", (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});


app.post('/gigDetail', (req, res) => {

    const gigName = req.body.data.gigName;
    console.log("our gigName is " + gigName);

    db.query("SELECT * FROM gigs WHERE gigName = ?",
        [gigName], (err, result) => {
            if (err) {
                console.log(err);
            } else {
                console.log("gigName result is" + result);
                res.send(result);
            }
        });
});


//Used for gig edition
app.post("/gigEdition", (req, res) => {
    
    const gigName = req.body.data.gigName;
    const style = req.body.data.style;
    const price = req.body.data.price;
    const description = req.body.data.description;
    const place = req.body.data.place;
    const startTime = req.body.data.startTime;
    const endTime = req.body.data.endTime;
    const dateList = req.body.data.dateList;
    const oneForOne = req.body.data.oneForOne;
    const picturePath = req.body.data.picturePath;

    db.query(
        "UPDATE gigs SET style = ?, price = ?, description = ?, place = ?, startTime = ?, endTime = ?, dateList = ?, oneForOne =?, picturePath = ? WHERE gigName = ?",
        [style, price, description, place, startTime, endTime, dateList, oneForOne, picturePath, gigName],
        (err, result) => {
            if (err) {
                console.log("update failed!" + err)
                res.status(404).json({
                    error: true,
                    message: "Error executing query" + err,
                });
            } else {
                console.log("update succeeded!")
                res.status(200).json({
                    success: true,
                    message: `${gigName} has been update successfully.`
                });
            }
        }
    );
});


//Used for gig deletion
app.post("/gigDeletion", (req, res) => {

    const gigName = req.body.data.gigName;
    db.query(
        "DELETE FROM gigs WHERE gigName = ?",
        [gigName],
        (err, result) => {
            if (err) {
                console.log("Deletion failed!" + err)
                res.status(404).json({
                    error: true,
                    message: "Error executing query" + err,
                });
            } else {
                console.log("Deletion succeeded!")
                res.status(200).json({
                    success: true,
                    message: "The gigName has been deleted successfully."
                });
            }
        }
    );
});


//Used for course booking
app.post("/courseBooking", (req, res) => {
 
    const email = req.body.data.email;
    const courseName = req.body.data.courseName;
    const bookingTime = req.body.data.bookingTime;
    const paymentStatus = req.body.data.paymentStatus;
    const currentStatus = req.body.data.currentStatus;

    db.query(
        "INSERT INTO coursesbooking (email, courseName, bookingTime, paymentStatus, currentStatus) VALUES (?,?,?,?,?)",
        [email, courseName, bookingTime, paymentStatus, currentStatus],
        (err, result) => {
            if (err) {
                console.log("insert failed!" + err)
                res.status(404).json({
                    error: true,
                    message: "Error executing query" + err,
                });
            } else {
                console.log("new course booking insert succeeded!")
                res.status(200).json({
                    success: true,
                    message: "New course booking has been inserted successfully."
                });
            }
        }
    );
});

//Used for getting all the courses Booking
app.get('/coursesBooking', (req, res) => {
    db.query("SELECT * FROM coursesbooking", (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});


//Used for archiving the courses Booking
app.post("/archivingCoursesBooking", (req, res) => {
    const id = req.body.data.id;
    const currentStatus = req.body.data.currentStatus;

    db.query(
        "UPDATE coursesbooking SET currentStatus = ? WHERE id = ?",
        [currentStatus, id],
        (err, result) => {
            if (err) {
                console.log("Archiving courses booking update failed! " + err)
                res.status(404).json({
                    error: true,
                    message: "Error of archiving courses booking executing query" + err,
                });
            } else {
                console.log("Archiving courses booking update succeeded!")
                res.status(200).json({
                    success: true,
                    message: "Archiving courses booking successfully"
                });
            }
        }
    );
});

//Used for archiving the gigs Booking
app.post("/archivingGigsBooking", (req, res) => {
    const id = req.body.data.id;
    const currentStatus = req.body.data.currentStatus;

    db.query(
        "UPDATE gigsbooking SET currentStatus = ? WHERE id = ?",
        [currentStatus, id],
        (err, result) => {
            if (err) {
                console.log("Archiving gigs booking update failed! " + err)
                res.status(404).json({
                    error: true,
                    message: "Error of archiving gigs booking executing query" + err,
                });
            } else {
                console.log("Archiving gigs booking update succeeded!")
                res.status(200).json({
                    success: true,
                    message: "Archiving gigs booking successfully"
                });
            }
        }
    );
});


//Used for getting all the gigs Booking
app.get('/gigsBooking', (req, res) => {
    db.query("SELECT * FROM gigsbooking", (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});


//Used for course booking deletion
app.post("/courseBookingDeletion", (req, res) => {
    const email = req.body.data.email;
    const courseName = req.body.data.courseName;
    db.query(
        "DELETE FROM coursesbooking WHERE email = ? and courseName = ?",
        [email, courseName],
        (err, result) => {
            if (err) {
                console.log("Course booking deletion failed!" + err)
                res.status(404).json({
                    error: true,
                    message: "Error executing query" + err,
                });
            } else {
                console.log("Course booking deletion succeeded!")
                res.status(200).json({
                    success: true,
                    message: "The course booking has been deleted successfully."
                });
            }
        }
    );
});


//Used for gig booking deletion
app.post("/gigBookingDeletion", (req, res) => {
    const email = req.body.data.email;
    const gigName = req.body.data.gigName;
    db.query(
        "DELETE FROM gigsbooking WHERE email = ? and gigName = ?",
        [email, gigName],
        (err, result) => {
            if (err) {
                console.log("Gig booking deletion failed!" + err)
                res.status(404).json({
                    error: true,
                    message: "Error executing query" + err,
                });
            } else {
                console.log("Gig booking deletion succeeded!")
                res.status(200).json({
                    success: true,
                    message: "The Gig booking has been deleted successfully."
                });
            }
        }
    );
});

//Used for gig booking
app.post("/gigBooking", (req, res) => {

    const email = req.body.data.email;
    const gigName = req.body.data.gigName;
    const bookingTime = req.body.data.bookingTime;
    const paymentStatus = req.body.data.paymentStatus;
    const currentStatus = req.body.data.currentStatus;

    db.query(
        "INSERT INTO gigsbooking (email, gigName, bookingTime, paymentStatus, currentStatus) VALUES (?,?,?,?,?)",
        [email, gigName, bookingTime, paymentStatus, currentStatus],
        (err, result) => {
            if (err) {
                console.log("insert failed!" + err)
                res.status(404).json({
                    error: true,
                    message: "Error executing query" + err,
                });
            } else {
                console.log("new gig booking insert succeeded!")
                res.status(200).json({
                    success: true,
                    message: "New gig booking has been inserted successfully."
                });
            }
        }
    );
});



//Used for booking courses
app.post('/getStudentBookingCourses', (req, res) => {

    const email = req.body.data.email;

    db.query("SELECT * FROM coursesbooking WHERE email = ?",
        [email], (err, result) => {
            if (err) {
                console.log(err);
            } else {
                console.log("getStudentBookingCourses' result is " + result);
                res.send(result);
            }
        });
});


//Used for booking gigs
app.post('/getStudentBookingGigs', (req, res) => {

    const email = req.body.data.email;

    db.query("SELECT * FROM gigsbooking WHERE email = ?",
        [email], (err, result) => {
            if (err) {
                console.log(err);
            } else {
                console.log("getStudentBookingGigs' result is" + result);
                res.send(result);
            }
        });
});


//Used for course booking
app.post("/messageCreation", (req, res) => {

    const email = req.body.data.email;
    const title = req.body.data.title;
    const description = req.body.data.description;
    const time = req.body.data.time;

    db.query(
        "INSERT INTO message (email, title, description, time) VALUES (?,?,?,?)",
        [email, title, description, time],
        (err, result) => {
            if (err) {
                console.log("message insert failed!" + err)
                res.status(404).json({
                    error: true,
                    message: "Error executing query" + err,
                });
            } else {
                console.log("new message insert succeeded!")
                res.status(200).json({
                    success: true,
                    message: "New message has been inserted successfully.",
                    newId: result.insertId,
                });
            }
        }
    );
});

// Used for getting message
app.get('/messages', (req, res) => {
    db.query("SELECT * FROM message", (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});


//Used for message deletion
app.post("/messageDeletion", (req, res) => {
    const id = req.body.data.id;
    db.query(
        "DELETE FROM message WHERE id = ?",
        [id],
        (err, result) => {
            if (err) {
                console.log("Message Deletion failed!" + err)
                res.status(404).json({
                    error: true,
                    message: "Error executing query" + err,
                });
            } else {
                console.log("Message Deletion succeeded!")
                res.status(200).json({
                    success: true,
                    message: "The Message of id has been deleted successfully."
                });
            }
        }
    );
});

//Used for search
app.post("/search", (req, res) => {
    const query = req.body.data.query;
    const fullQuery = "%" + query + "%";

    try {
        db.query(
            "SELECT * FROM courses WHERE courseName like ? OR style like ? OR description like ?",
            [fullQuery, fullQuery, fullQuery],
            (err, result) => {
                if (err) {
                    console.log("Searching failed! " + err)
                    res.status(404).json({
                        error: true,
                        message: "Searching executing query" + err,
                    });
                } else {
                    console.log("Searching succeeded!" + result);
                    res.send(result);
                }
            }
        );
    } catch (error) {
        console.error("Searching error is " + error);
    }
});


// Upload Endpoint
app.post('/upload', (req, res) => {
    if (req.files === null) {
        return res.status(400).json({ msg: 'No file uploaded' });
    }

    const file = req.files.file;

    file.mv(`${__dirname}/uploads/${file.name}`, err => {
        if (err) {
            console.error(err);
            return res.status(500).send(err);
        }

        res.json({ fileName: file.name, filePath: `http://localhost:3001/${file.name}` });

    });
});



const testFolder = './uploads/';
const fs = require('fs');

app.get('/files', (req, res) => {
    fs.readdir(testFolder, (err, files) => {
        if (err) {
            console.log(err);
        }
        else {
            res.send(files)
            files.forEach(file => {
                console.log(file);
            });
        }
    });
});



app.listen(3001, () => {
    console.log("Yey, your server is running on port 3001");
})