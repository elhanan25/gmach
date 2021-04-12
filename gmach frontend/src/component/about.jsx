import React, { Component } from "react";
import PageHeader from "./common/header";

class About extends Component {
  state = {};
  render() {
    return (
      <>
      <div className="container">
        <PageHeader titleText=" אודות הגמח אהבת חסד " />
        <div className="row">
          <div className="col-12">
            
            <p className="alert alert-info text-right">

           
           <br /> .בגמ"ח שלנו תוכלו לקבל את מבוקשכם במהירות בע"ה

גמ"ח ההלוואות אהבת חסד נוסד בשנת תשפ"א -2021 בירושלים. 
<br />
מטרתו היא לעזור לאנשים במצוקה כלכלית הדרושים להלוואות.
<br />


            </p>
          </div>
        </div>
      </div>
      </>
    );
  }
}

export default About;
