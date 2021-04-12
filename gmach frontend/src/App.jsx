import React, { Component } from "react";
import "./App.css";
import { Route, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import List from "./component/list";
import Navbar from "./component/common/navbar";
import Footer from "./component/common/footer";
import Home from "./component/home";
import About from "./component/about";
import Signup from "./component/signup";
import Signin from "./component/signin";
import userService from "./services/userService";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import Logout from "./component/logout";
import Edituser from "./component/updateUser";
import Please from "./component/pleaseform";
import Status from "./component/status";
import Editplease from "./component/updateplease";
import Mystatus from "./component/mystatus";
import Adminsignin from "./component/adminsignin";

class App extends Component {
  state = { user: "" };

  async componentDidMount() {
    const data = await userService.getCurrentUser();
    console.log(data);
    this.setState({ user: data });
    // this.checkAdmin();
  }
  // checkAdmin = async () => {
  //   const user = await userService.getUserInfo();
  //   if (user.isAdmin) {
  //     this.setState({ user });
  //   }
  // };

  render() {
    const { user } = this.state;

    return (
      <>
        <ToastContainer />
        <header>
          <Navbar user={user} />
        </header>

        <main style={{ minHeight: "200px" }}>
          <Switch>
            <Route path="/logout" component={Logout} />
            <Route path="/signin" component={Signin} />
            <Route path="/signup" component={Signup} />
            <Route path="/adminsignin" component={Adminsignin} />
            <Route path="/about" component={About} />
            <Route path="/list" component={List} />
            <Route path="/please" component={Please} />
            <Route path="/status" component={Status} />
            <Route path="/mystatus" component={Mystatus} />
            <Route path="/updateplease/:id" component={Editplease} />
            <Route path="/users/edit/:id" component={Edituser} />
            <Route path="/" exact component={Home} />
          </Switch>
        </main>
        <footer>
          <Footer />
        </footer>
      </>
    );
  }
}
export default App;
