import React, { Component } from "react";
import AOS from "aos";
import "./newsLetter.css";

class NewsLetter extends Component {
  state = {};
  componentDidMount() {
    AOS.init();

    // You can also pass an optional settings object
    // below listed default settings
    AOS.init({
      // Global settings:
      disable: false, // accepts following values: 'phone', 'tablet', 'mobile', boolean, expression or function
      startEvent: "DOMContentLoaded", // name of the event dispatched on the document, that AOS should initialize on
      initClassName: "aos-init", // class applied after initialization
      animatedClassName: "aos-animate", // class applied on animation
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
        <div>
          <div className="row">
            <div className="col-xl-3 col-lg-3 col-md-2 col-sm-2 col-xs-2" />
            <div
              className="text-center col-xl-6 col-lg-6 col-md-8 col-sm-8 col-xs-8"
              style={{ padding: "0% 6% 0% 6%"}}
            >
              <img
                className="newsLetterImage"
                width ="300"
                alt="Newsletter Image"
                data-aos="zoom-in"
                data-aos-offset="200"
                // data-aos-delay="50"
                data-aos-duration="1000"
                src={require("../../Assets/Logo/newsletter.png")}
                style={{ width:"300px", }}

              />
            </div>
            <div className="text-center col-xl-3 col-lg-3 col-md-2 col-sm-2 col-xs-2" />
          </div>
          <div className="row" style={{ padding: "5% 5% 5% 5%" }}>
            <input
              type="text"
              placeholder="First Name"
              className="textFieldFName"
              data-aos="slide-right"
              data-aos-offset="200"
              // data-aos-delay="50"
              data-aos-duration="1000"
            />
            <input
              type="text"
              placeholder="Last Name"
              className="textFieldLName"
              data-aos="slide-right"
              data-aos-offset="200"
              // data-aos-delay="50"
              data-aos-duration="1000"
            />
            <input
              type="email"
              placeholder="Email"
              className="textFieldEmail"
              data-aos="slide-right"
              data-aos-offset="200"
              // data-aos-delay="50"
              data-aos-duration="1000"
            />
          </div>
          <div className="row">
            <div className="col-md-3 col-sm-3 col-xs-3" />
            <div
              className="text-center col-xl-6 col-lg-6 col-md-8 col-sm-8 col-xs-8"
              style={{ padding: "0% 6% 0% 6%" }}
            >
              <button
                id="newsLetterButton"
                className="mt-4 mb-5 btn subcribeButton"
              >
                Subscribe
              </button>
            </div>
            <div className="col-xl-3 col-lg-3 col-md-2 col-sm-2 col-xs-2" />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default NewsLetter;
