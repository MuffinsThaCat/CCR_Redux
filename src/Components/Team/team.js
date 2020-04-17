import React, { Component } from "react";
import AOS from "aos";
import "./team.css";

class Team extends Component {
  state = {};
  componentDidMount() {
    AOS.init();

    // You can also pass an optional settings object
    // below listed default settings
    AOS.init({
      // Global settings:
      disable: false, // accepts following values: 'phone', 'tablet', 'mobile', boolean, expression or function
      startEvent: "DOMContentLoaded", // name of the event dispatched on the document, that AOS should initialize on
      initClassName: "aos-init", // className applied after initialization
      animatedClassName: "aos-animate", // className applied on animation
      useClassNames: false, // if true, will add content of `data-aos` as classes on scroll
      disableMutationObserver: false, // disables automatic mutations' detections (advanced)
      debounceDelay: 50, // the delay on debounce used while resizing window (advanced)
      throttleDelay: 99, // the delay on throttle used while scrolling the page (advanced)

      // Settings that can be overridden on per-element basis, by `data-aos-*` attributes:
      offset: 120, // offset (in px) from the original trigger point
      delay: 0, // values from 0 to 3000, with step 50ms
      duration: 400, // values from 0 to 3000, with step 50ms
      easing: "ease", // default easing for AOS animations
      once: true, // whether animation should happen only once - while scrolling down
      mirror: false, // whether elements should animate out while scrolling past them
      anchorPlacement: "top-bottom" // defines which position of the element regarding to window should trigger the animation
    });
  }
  render() {
    return (
      <React.Fragment>
        <div style={{ overflow: "hidden" }}>
          <div className="row">
            <div className="col-xl-3 col-lg-3 col-md-2 col-sm-2 col-xs-2" />
              <div
                className="text-center col-xl-6 col-lg-6 col-md-8 col-sm-8 col-xs-8"
                style={{ padding: "0% 6% 7% 6%"}}
              >
                <img
                  className=""
                  width ="300"
                  alt="CryptoCopyright Team Image"
                  data-aos="zoom-in"
                  data-aos-offset="200"
                  // data-aos-delay="50"
                  data-aos-duration="1000"
                  src={require("../../Assets/Logo/team-title.png")}
                  style={{ width:"300px", }}

                />
              </div>
            <div className="col-xl-3 col-lg-3 col-md-2 col-sm-2 col-xs-2" />
          </div>
          <div className="row" style={{ textAlign: "center" }}>
            <div
              className="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-xs-12 mt-4 teamFirstRow"
              data-aos="fade-right"
              data-aos-offset="200"
              // data-aos-delay="50"
              data-aos-duration="1000"
            >
              <img
                className="teamImage"
                src={require("../../Assets/Images/Eric.jpg")}
                alt="Eric Gu"
              />
              <div style={{ marginTop: "15px" }}>
                <span className="teamName">Eric Gu</span>
              </div>
              <div style={{ marginTop: "10px" }}>
                <span className="teamDesc">
                  Early crypto adopter, famous investor and advisor for
                  blockchain projects
                </span>
              </div>
            </div>
            <div
              className="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-xs-12 mt-4 teamFirstRow"
              data-aos="fade-right"
              data-aos-offset="200"
              // data-aos-delay="50"
              data-aos-duration="1000"
            >
              <img
                className="teamImage"
                src={require("../../Assets/Images/Christine.jpg")}
                alt="Christine Duhaime"
              />
              <div style={{ marginTop: "15px" }}>
                <span className="teamName">Christine Duhaime</span>
              </div>
              <div style={{ marginTop: "10px" }}>
                <span className="teamDesc">
                  Lawyer in financial regulation, asset recovery, combatting
                  financial crime, AI and tech
                </span>
              </div>
            </div>
            <div
              className="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-xs-12 mt-4 teamFirstRow"
              data-aos="fade-right"
              data-aos-offset="200"
              // data-aos-delay="50"
              data-aos-duration="1000"
            >
              <img
                className="teamImage"
                src={require("../../Assets/Images/tal.jpg")}
                alt="Tal Zisckind"
              />
              <div style={{ marginTop: "15px" }}>
                <span className="teamName">Tal Zisckind</span>
              </div>
              <div style={{ marginTop: "10px" }}>
                <span className="teamDesc">Explorer of the Metaverse</span>
              </div>
            </div>
          </div>
          <div className="row" style={{ textAlign: "center" }}>
            <div
              className="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-xs-12 mt-4 teamSecondRow"
              data-aos="fade-left"
              data-aos-offset="200"
              // data-aos-delay="50"
              data-aos-duration="1000"
            >
              <img
                className="teamImage"
                src={require("../../Assets/Images/sven.jpg")}
                alt="Sven Mutzl"
              />
              <div style={{ marginTop: "15px" }}>
                <span className="teamName">Sven Mutzl</span>
              </div>
              <div style={{ marginTop: "10px" }}>
                <span className="teamDesc">Coffee to code processor</span>
              </div>
            </div>
            <div
              className="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-xs-12 mt-4 teamSecondRow"
              data-aos="fade-left"
              data-aos-offset="200"
              // data-aos-delay="50"
              data-aos-duration="1000"
            >
              <img
                className="teamImage"
                src={require("../../Assets/Images/laurent.jpg")}
                alt="Laurent Salou"
              />
              <div style={{ marginTop: "15px" }}>
                <span className="teamName">Laurent Salou</span>
              </div>
              <div style={{ marginTop: "10px" }}>
                <span className="teamDesc">Metaverse developer</span>
              </div>
            </div>
            <div
              className="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-xs-12 mt-4 teamSecondRow"
              data-aos="fade-left"
              data-aos-offset="200"
              // data-aos-delay="50"
              data-aos-duration="1000"
            >
              <img
                className="teamImage"
                src={require("../../Assets/Images/Emma.jpg")}
                alt="Emma Hsueh"
              />
              <div style={{ marginTop: "15px" }}>
                <span className="teamName">Emma Hsueh</span>
              </div>
              <div style={{ marginTop: "10px" }}>
                <span className="teamDesc">
                  Core developer and data analyst with experience in blockchain,
                  informatics and machine learning
                </span>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Team;
