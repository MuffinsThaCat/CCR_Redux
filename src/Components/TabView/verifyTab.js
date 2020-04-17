import React, { Component, Fragment } from "react";
import { SHA256 } from "crypto-js";
import { getProveAction } from "../../Actions/getProve";
import { getDownloadAction } from "../../Actions/getDownload";
import { connect } from "react-redux";
import { BaseURL } from "../../Actions/BaseURL";
import axios from "axios";

import "./Tabs.css";
import "./detail.css";

class VerifyTab extends Component {
  state = {
    hash: "",
    name: "",
    password: "",
    loading: false,
    hashExists: false,
    txId: ""
  };

  checkHash = async hash => {
    const interval = setInterval(async () => {
      // const hashURL = `https://explorer-testnet.mvs.org/mit/${hash}`;
      const hashURL = `https://proveit-muffins.firebaseapp.com/api/prove?hash=${hash}`;
      const response = await axios.get(hashURL);
      if (response.data.status === "published") {
        this.setState({
          hashExists: true,
          txId: response.data.proofs[0].txid
        });
        clearInterval(interval);
      }
    }, 10000);
  };

  processFileVerify = files => {
    const file = files[0];
    const reader = new FileReader();
    reader.onload = event => {
      const data = event.target.result;
      this.setState({ hash: SHA256(data) + "" });
    };
    reader.readAsBinaryString(file);
  };
  handleVerifyFileName = files => {
    const file = files[0];
    this.setState({ name: file.name });
  };

  render() {
    return (
      <React.Fragment>
        <div className="container">
          <h3
            style={{
              fontWeight: "600"
            }}
          >
            Verify your document on the blockchain
          </h3>
          {this.props.proveSuccessMessage ? (
            <div className="row">
              <div
                className="col-12"
                style={{
                  textAlign: "center"
                }}
              ></div>
              {this.props.proveSuccessMessage.hasPassword ? (
                <div className="col-12 row">
                  <div className="col-xl-3 col-lg-3 col-md-2 col-sm-2 col-xs-2" />
                  <div
                    className="col-xl-6 col-lg-6 col-md-8 col-sm-8 col-xs-8"
                    style={{ padding: "0% 6% 0% 6%" }}
                  >
                    <input
                      style={{ borderRadius: "10px", fontSize: "30px" }}
                      className="form-control form-control-lg"
                      onChange={e =>
                        this.setState({ password: e.target.value })
                      }
                      type="password"
                      value={this.state.password}
                      placeholder="Password"
                    />
                  </div>
                  <div className="col-xl-3 col-lg-3 col-md-2 col-sm-2 col-xs-2" />
                </div>
              ) : (
                ""
              )}
              {this.props.proveSuccessMessage.hasFile ? (
                <div className="col-12 row">
                  <div className="col-xl-3 col-lg-3 col-md-2 col-sm-2 col-xs-2" />
                  <div
                    className="col-xl-6 col-lg-6 col-md-8 col-sm-8 col-xs-8"
                    style={{ padding: "0% 6% 0% 6%" }}
                  >
                    <a
                      href={
                        BaseURL +
                        "/download?hash=" +
                        this.state.hash +
                        "&password=" +
                        this.state.password
                      }
                      target={
                        BaseURL +
                        "/download?hash=" +
                        this.state.hash +
                        "&password=" +
                        this.state.password
                      }
                    >
                      <button
                        disabled={this.state.password ? false : true}
                        // onClick={() => {
                        //   this.props.getDownloadAction(
                        //     this.state.hash,
                        //     this.state.password,
                        //     this
                        //   );
                        // }}
                        className="mt-4 mb-5 btn btn-verify"
                      >
                        Download
                      </button>
                    </a>
                  </div>
                  <div className="col-xl-3 col-lg-3 col-md-2 col-sm-2 col-xs-2" />
                </div>
              ) : (
                ""
              )}
              <div className="col-12" style={{ marginTop: "-20px" }}>
                <div className="panel">
                  {/* <details style={{ overflowX: "auto", overflowY: "hidden" }}> */}
                  <summary>
                    <ul>
                      <li className="titleValue">
                        <Fragment>
                          <a
                            className={this.state.hashExists ? "" : "hidden"}
                            href={`https://explorer-testnet.mvs.org/tx/${this.state.txId}`}
                            target={`https://explorer-testnet.mvs.org/tx/${this.state.txId}`}
                          >
                            <b style={{ fontSize: 25 }}>
                              Metaverse official explorer
                            </b>
                          </a>
                          <div className="loading-bar">
                            <div
                              className={this.state.hashExists ? "start" : ""}
                              id="bar"
                            ></div>
                          </div>
                        </Fragment>
                      </li>
                    </ul>
                  </summary>
                </div>
              </div>
            </div>
          ) : (
            <div className="row mt-5">
              <div className="mt-5 col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12">
                <span className=""
                  style={{
                    fontWeight: "600",
                    fontSize: "18px",
                    color: "#6F706F"
                  }}
                >


                </span>
                <div className="mt-4">
                  <input
                    type="file"
                    id="fileInputVerify"
                    name="selectedFile"
                    onChange={e => {
                      this.processFileVerify(e.target.files);
                      this.handleVerifyFileName(e.target.files);
                    }}
                    style={{ display: "none" }}
                    className="inputfile inputfile-6"
                    data-multiple-caption="{count} files selected"
                    multiple
                  />
                  <label
                    htmlFor="fileInputVerify"
                    className="btn btn-lg "
                    style={{
                      backgroundColor: "#F9F7F7",
                      padding: "2%",
                      border: "1px solid #D4D1D0",
                      // color: "#969696",
                      fontSize: "18px",
                      display: "inline-block",
                      borderRadius: "5px",
                      marginTop: "16px",
                      cursor: "pointer"
                    }}
                  >
                    Browse A File
                  </label>
                </div>
                <div className="mt-2">
                  <span
                    style={{
                      fontWeight: "400",
                      color: "#BDBEBE"
                    }}
                  >
                    {this.state.name ? this.state.name : "No file is added"}
                  </span>
                </div>
              </div>
              <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12">
                <h2
                  style={{
                    // color: "#6F706F",
                    fontWeight: "600"
                  }}
                >
                  Input a Document Hash
                </h2>
                <span
                  style={{
                    fontWeight: "400",
                    fontSize: "16px",
                    color: "#6F706F",
                    marginLeft: "10px"
                  }}
                >
                  Input the SHA256 checksum hexadecimal digest for your file
                  here.
                </span>
                <div style={{ padding: "3.5% 4% 4% 6%" }}>
                  <input
                    style={{ borderRadius: "5px", fontSize: "23px" }}
                    className="form-control form-control-lg"
                    onChange={e => this.setState({ hash: e.target.value })}
                    type="text"
                    value={this.state.hash}
                    placeholder=""
                  />
                </div>
              </div>
            </div>
          )}

          <div
            className="row"
            style={{ textAlign: "center", marginTop: "20px" }}
          >
            <div className="col-12">
              {this.props.ErrMsg === "Item not found. Proof failed." ? (
                <kbd style={{ fontSize: "16px" }}>
                  This document not found.&nbsp;&nbsp;
                  <span
                    style={{
                      color: "#FF0000"
                    }}
                  >
                    Error...
                  </span>
                </kbd>
              ) : (
                ""
              )}
            </div>
          </div>
          <div className="row">
            <div className="col-xl-3 col-lg-3 col-md-2 col-sm-2 col-xs-2" />
            <div
              className="col-xl-6 col-lg-6 col-md-8 col-sm-8 col-xs-8"
              style={{ padding: "0% 6% 0% 6%" }}
            >
              <button
                className="mt-4 mb-5 btn btn-verify"
                style={{ fontWeight: "400" }}
                onClick={() => {
                  if (!this.state.hashExists) {
                    this.checkHash(this.state.hash);
                    if (!this.state.loading) {
                      this.setState(
                        {
                          loading: true
                        },
                        () => {
                          this.timer = setTimeout(() => {}, this.state.loading);
                          this.props.getProveAction(this.state.hash, this);
                        }
                      );
                    }
                  } else {
                    window.location.reload();
                  }
                }}
              >
                {this.state.loading && (
                  <i className="spinner-border" role="status" />
                )}
                {!this.state.loading && (
                  <span>{this.state.hashExists ? "Verify New" : "Verify"}</span>
                )}
              </button>
            </div>
            <div className="col-xl-3 col-lg-3 col-md-2 col-sm-2 col-xs-2" />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  ErrMsg: state.ProveitErrorReducer.ProveErrorMsg,
  proveSuccessMessage: state.ProveitReducer.proveSuccessMsg,
  downloadErrorMessage: state.ProveitErrorReducer.DownloadErrorMsg,
  downloadSuccessMessage: state.ProveitReducer.downloadSuccessMsg
});

export default connect(mapStateToProps, { getProveAction, getDownloadAction })(
  VerifyTab
);
