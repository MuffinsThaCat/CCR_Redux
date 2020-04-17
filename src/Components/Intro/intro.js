import React, { Component } from "react";
import AOS from "aos";
import "./intro.css";

class Intro extends Component {
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
        <div className="container-fluid">
          <div className="row justify-content-center">
            {/* <div
              className="col-12 col-sm-12 col-md-12 col-lg-5 col-xl-5"
              data-aos="slide-right"
              data-aos-offset="200"
              // data-aos-delay="50"
              data-aos-duration="1000"
            > */}
            {/* <div className="mt-5 mb-5">
                <div className="row">
                  <img
                    className="intro-logo"
                    src={require("../../Assets/Logo/intro-logo.png")}
                    alt="logo"
                  />
                </div>
                <div className="row">
                  <h2 className="intro-title">What is Prove It ?</h2>
                </div>
                <div className="row">
                  <button className="btn btn-lg btn-intro">Read Full Doc</button>
                </div>
              </div> */}
            {/* </div> */}
            <div className="col-12 col-sm-12 col-md-12 col-lg-7 col-xl-7">
              <div
                className="flow-control"
                // data-aos="slide-left"
                // data-aos-offset="200"
                // data-aos-delay="50"
                // data-aos-duration="1000"
              >
                <div className="carousel-inner intro-carousel">
                  <div className="carousel-item active">
                    <div className="intro-text">
                      Today, in order to prove the existence of a document at a
                      specific point in time you would be required to go to a
                      notary, who would sign and stamp your document, and then
                      submit it to a public registry. To prove the submission of
                      that document you would have to return to a notary and
                      request a letter attesting to the document’s existence in
                      a particular registry.
                      <br />
                      <br />
                      Proof of Existence solves the necessity for 3rd party
                      notarization and attestation by providing a trustless,
                      digital interface in order to prove that a document
                      existed in a certain state at a specific time.
                      <br />
                      <br />
                      Prove It streamlines this process, disintermediating the
                      manual, static approach of third parties by establishing
                      an open and trustless digital process to protect the claim
                      of a novel value entry on a distributed ledger. Put off to
                      the side: The US Copyright Office records by hand almost
                      500,000 copyright interests per year and generates
                      revenues of $220 million and paid out $148 million to
                      copyright owners whose work was used under licenses
                      annually. It also manages over $1 billion in copyright
                      assets
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row mt-5">
            <div className="col-xl-1 col-lg-1 col-md-0 col-sm-0 col-0"></div>
            <div className="col-xl-10 col-lg-10 col-md-12 col-sm-12 col-12">
              <div className="row">
                <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-12">
                  <div
                    className="intro-bottom-box"
                    data-aos="zoom-in-right"
                    data-aos-offset="200"
                    // data-aos-delay="50"
                    data-aos-duration="1000"
                  >
                    <div className="row">
                      <img
                        className="intro-bottom-box-icon"
                        src={require("../../Assets/Logo/pencil.svg")}
                        alt="pen"
                      />
                    </div>
                    <div className="row">
                      <h5 className="intro-bottom-box-title">
                        Record Evidence
                      </h5>
                    </div>
                    <div className="row">
                      <div className="pt-2 intro-bottom-box-text">
                        Simple, intuitive interface to record evidence. Very low
                        transaction cost guarantees easy access to everyone.
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-12">
                  <div
                    className="intro-bottom-box"
                    data-aos="zoom-in-right"
                    data-aos-offset="200"
                    // data-aos-delay="50"
                    data-aos-duration="1000"
                  >
                    <div className="row">
                      <img
                        className="intro-bottom-box-icon"
                        src={require("../../Assets/Logo/lock.svg")}
                        alt="pen"
                      />
                    </div>
                    <div className="row">
                      <h5 className="intro-bottom-box-title">
                        Immutable Ledger
                      </h5>
                    </div>
                    <div className="row">
                      <div className="pt-2 intro-bottom-box-text">
                        Fingerprints (hash) of documents get stored on the
                        public blockchain. We store data for future generations.
                        so redundancy of multiple blockchains is our key to
                        maximise the integrity of our proof system.
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-12">
                  <div
                    className="intro-bottom-box"
                    data-aos="zoom-in-left"
                    data-aos-offset="200"
                    // data-aos-delay="50"
                    data-aos-duration="1000"
                  >
                    <div className="row">
                      <img
                        className="intro-bottom-box-icon"
                        src={require("../../Assets/Logo/third-party.svg")}
                        alt="pen"
                      />
                    </div>
                    <div className="row">
                      <h5 className="intro-bottom-box-title">
                        Transparent Independent Validation
                      </h5>
                    </div>
                    <div className="row">
                      <div className="pt-2 intro-bottom-box-text">
                        Easily prove the authenticity of your documents and
                        enable third parties to verify the information
                        independently.
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-12">
                  <div
                    className="intro-bottom-box"
                    data-aos="zoom-in-left"
                    data-aos-offset="200"
                    // data-aos-delay="50"
                    data-aos-duration="1000"
                  >
                    <div className="row">
                      <img
                        className="intro-bottom-box-icon"
                        src={require("../../Assets/Logo/envelope.svg")}
                        alt="pen"
                      />
                    </div>
                    <div className="row">
                      <h5 className="intro-bottom-box-title">Privacy</h5>
                    </div>
                    <div className="row">
                      <div className="pt-2 intro-bottom-box-text">
                        Your document fingerprints don’t allow recreation of
                        your original document content. Which data you want to
                        publish is fully in your hands.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-1 col-lg-1 col-md-0 col-sm-0 col-0"></div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Intro;
