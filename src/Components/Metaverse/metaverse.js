import React, { Component } from "react";
import AOS from "aos";
import "./metaverse.css";

class Metaverse extends Component {
  state = {};
  _componentDidMount() {
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
                  alt="Metaverse Image"
                  data-aos="zoom-in"
                  data-aos-offset="200"
                  // data-aos-delay="50"
                  data-aos-duration="1000"
                  src={require("../../Assets/Logo/metaverse-title.png")}
                  style={{ width:"300px", }}

                />
              </div>
            <div className="col-xl-3 col-lg-3 col-md-2 col-sm-2 col-xs-2" />
          </div>
          <div className="row" style={{ textAlign: "center" }}>
            <div
              className="col-xl-3 col-lg-3 col-md-3 col-sm-6 col-xs-12 mt-4 firstFrame"
              data-aos="flip-right"
              data-aos-offset="200"
              // data-aos-delay="50"
              data-aos-duration="1000"
            >
              <img
                className="metaverseIcons"
                src={require("../../Assets/Logo/blockchain.PNG")}
                alt="Metaverse Blockchain"
              />
              <div className="mettext">
                <span className="metaverseIconText pt-2">
                  Public blockchain with a <br /> high
                  grade of decentralization
                </span>
              </div>
            </div>
            <div
              className="col-xl-3 col-lg-3 col-md-3 col-sm-6 col-xs-12 mt-4 secondFrame"
              data-aos="flip-right"
              data-aos-offset="200"
              // data-aos-delay="50"
              data-aos-duration="1000"
            >
              <img
                className="metaverseIcons"
                src={require("../../Assets/Logo/dollar.png")}
                alt="Dollar"
              />
              <div className="mettext">
                <span className="metaverseIconText pt-2">
                  Experts on asset <br /> tokenization
                </span>
              </div>
            </div>
            <div
              className="col-xl-3 col-lg-3 col-md-3 col-sm-6 col-xs-12 mt-4 thirdFrame"
              data-aos="flip-left"
              data-aos-offset="200"
              // data-aos-delay="50"
              data-aos-duration="1000"
            >
              <img
                className="metaverseIcons"
                src={require("../../Assets/Logo/Services.png")}
                alt="Metaverse Services"
              />
              <div className="mettext">
                <span className="metaverseIconText pt-2">
                  Blockchain as a service <br /> solution
                </span>
              </div>
            </div>

            <div
              className="col-xl-3 col-lg-3 col-md-3 col-sm-6 col-xs-12 mt-4 fourthFrame"
              data-aos="flip-left"
              data-aos-offset="200"
              // data-aos-delay="50"
              data-aos-duration="1000"
            >
              <img
                className="metaverseIcons"
                src={require("../../Assets/Logo/earth.png")}
                alt="Earth"
              />
            <div className="mettext">
                <span className="metaverseIconText">
                  Open Source development <br /> community
                </span>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Metaverse;
