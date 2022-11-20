import './App.css';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Register from "./Register";
import Login from "./Login";
import Test from "./Test";
import HomePage from './HomePage';
import Header from './Header';
import Pricing from './Pricing';
import Admin from './Admin';
import Contact from './Contact';
import About from './About';
import Footer from './Footer';
import CourseCreation from './CourseCreation';
import GigCreation from './GigCreation';
import GuitarLessons from './GuitarLessons';
import Gigs from './Gigs';
import FileUpload from './components/FileUpload';
import FileDownload from './components/FileDownload';
import TeacherStatus from './TeacherStatus';
import StudentStatus from './StudentStatus';
import BookingCourses from './BookingCourses'
import CourseDetail from './CourseDetail';
import BookingGigs from './BookingGigs';
import GigDetail from './GigDetail';
import CourseEdit from './CourseEdit';
import GigEdit from './GigEdit';
import MessageBoard from './MessageBoard';
import UpdatePersonInformation from './UpdatePersonInformation';
import Search from './Search';



export default function App() {
  const [loggedAsStudent, setLoggedAsStudent] = useState(false);
  const [loggedAsTeacher, setLoggedAsTeacher] = useState(false);
  const [loggedAsAdministrator, setLoggedAsAdministrator] = useState(false);

  useEffect(() => {
    let emailStorage = localStorage.getItem("email");
    if (emailStorage === "Administrator") {
      setLoggedAsAdministrator(true);
    }
    else if (emailStorage === "Teacher") {
      setLoggedAsTeacher(true);
    }
    else if (emailStorage) {
      setLoggedAsStudent(true);
    }
  }, []);


  return (
    <Router>
      <div>
        <Header loggedAsStudent={loggedAsStudent} loggedAsTeacher={loggedAsTeacher} loggedAsAdministrator={loggedAsAdministrator}/>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/test" component={Test} />
          <Route exact path="/messageBoard" component={MessageBoard} />
          <Route exact path="/about" component={About} />
          <Route exact path="/contact" component={Contact} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/admin" component={Admin} />
          <Route exact path="/pricing" component={Pricing} />
          <Route exact path="/courseCreation" component={CourseCreation} />
          <Route exact path="/bookingCourses" component={BookingCourses} />
          <Route exact path="/courseDetail/:course" component={CourseDetail} />
          <Route exact path="/courseEdit/:course" component={CourseEdit} />
          <Route exact path="/gigCreation" component={GigCreation} />
          <Route exact path="/bookingGigs" component={BookingGigs} />
          <Route exact path="/gigEdit/:gig" component={GigEdit} />
          <Route exact path="/gigDetail/:gig" component={GigDetail} />
          <Route exact path="/GuitarLessons" component={GuitarLessons} />
          <Route exact path="/gigs" component={Gigs} />
          <Route exact path="/fileUpload" component={FileUpload} />
          <Route exact path="/fileDownload" component={FileDownload} />
          <Route exact path="/teacherStatus" component={TeacherStatus} />
          <Route exact path="/studentStatus" component={StudentStatus} />
          <Route exact path="/updatePersonInformation" component={UpdatePersonInformation} />
          <Route exact path="/search/:query" component={Search} />
        </Switch>
        <Footer />
      </div>
    </Router>



  );
}