import React, { Component } from "react";
import PageHeader from "./common/header";

class Home extends Component {
  state = {};
  render() {
    return (
      <>
        <div className="container text-right">
          <PageHeader titleText="מרכז ההלוואות אהבת חסד" />

          <br></br>
          <div className="row d-flex justify-content-center m-0 auto">
            <div
              id="levin"
              className="col-4 mt-20"
              style={{ width: "100px", height: "300px", borderRadius: "25%" }}
            >
              <img
                className="mt-10 rounded-circle"
                width="100%"
                height="100%"
                src="https://cdn.pixabay.com/photo/2014/08/02/14/24/flag-408317__340.jpg"
                alt="degel"
              ></img>
            </div>
            <div
              className="col-4"
              style={{ width: "100px", height: "300px", border: "" }}
            >
              <img
                className="mt-10 rounded-circle shadow"
                width="100%"
                height="100%"
                src="https://cdn.pixabay.com/photo/2018/09/24/23/52/jerusalem-artichoke-3701223__340.jpg"
                alt="degel"
              ></img>
            </div>

            <div
              className="col-4"
              style={{ width: "100px", height: "300px", border: "25% " }}
            >
              <img
                className=" mt-10 rounded-circle shadow"
                width="100%"
                height="100%"
                src="https://cdn.pixabay.com/photo/2017/09/18/14/52/sunbeam-2761911__340.jpg"
                alt="degel"
              ></img>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Home;
