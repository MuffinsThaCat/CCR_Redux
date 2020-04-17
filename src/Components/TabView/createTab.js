import React, { Component } from "react";
import { SHA256 } from "crypto-js";
import TextField from "material-ui/TextField";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import { connect } from "react-redux";
import Metaverse from "metaversejs";
import {postVerify} from "../../Actions/postVerify"
import { postStoreAction } from "../../Actions/postStore";
import { getStoreAction } from "../../Actions/getStore";
import { getMitsAction } from "../../Actions/MitGeneration";

import { getAvatar } from "../../BlockchainLogic/Faucet";
import { issueMIT } from "../../BlockchainLogic/MitLogic";
import { getMits } from "../../BlockchainLogic/MitLogic";
import { updateItem } from "../../utils/idb";
import "./Tabs.css";
import {CopyToClipboard} from 'react-copy-to-clipboard';


class CreateTab extends Component {
  state = {
    hash: "",
    password: "",
    meta: "",
    fileName: "",
    file: [],
    file_base64:"",
    checkboxStatus: false,
    loading: false,
    recordStatus: true,
    contentStatus: true,
    mitContent: "",
    error: null,
    value: '',
   copied: false
  };

  processFile = files => {
    const file = files[0];
    console.log(file)
    const reader = new FileReader();
    reader.onload = event => {
      console.log(event)
      const data = event.target.result;
      console.log(data)
      let result=reader.readAsBinaryString(file);
      console.log(result)
      this.setState({ recordStatus: false });
      this.setState({ fileName:data });
      this.setState({ hash: SHA256(data) + "" });
      this.setState({file_base64:new Buffer(result).toString('base64')})
    };
    //reader.readAsBinaryString(file);
  };
  handleChange(e) {
    this.setState({ checkboxStatus: e.target.checked }, () => {
      console.log(this.state.checkboxStatus);
    });
  }
  handleClick = async () => {
    if (!this.state.loading) {
      const mnemonic = this.props.mnemonic;
      const wallet = await Metaverse.wallet.fromMnemonic(mnemonic, "testnet");
      console.log(this.props.avatar, "avatar in createTab.js as a prop");
      if (await getAvatar(this.props.avatar)) {
        await issueMIT(wallet, this.state.mitContent, this.state.hash);
        const addresses = await wallet.getAddresses();
        const mits = await getMits(addresses);
        await updateItem("mits", mits);
        this.props.getMitsAction(mits);
        this.setState(
          {
            loading: true
          },
          () => {
            this.timer = setTimeout(() => {}, this.state.loading);
            this.state.password
              ? this.props.postStoreVerify(
                  this.state.fileName,
                  this.state.file,
                  this.state.hash,
                  
                  this
                )
              : this.props.getStoreAction(this.state.hash, this);
          }
        );
      } else {
        this.setState({
          error:
            "Blockchain did not find any avatar related to your account. Try again after 3 minutes."
        });
      }
    }
  };

  render() {
    return (
      <React.Fragment>
        <div className="container">
          <h3
            style={{
              color: "#050607",
              fontWeight: "600"
            }}
          >
            Record your document hash on the blockchain
          </h3>

          <span
            style={{
              // fontFamily: "Proxima Nova",
              fontWeight: "500",
              color: "#000000"
            }}
          >
            The hash is a sha256 hash of the content of your document.
            <br />
            The filename is not part of the calculation.
            <br />
          </span>

          {this.props.successMsg === "SUCCESS" ? (
            <div>
              <h3
                style={{
                  color: "#050607",
                  // fontFamily: "Proxima Nova",
                  fontWeight: "500"
                }}
              >
                Your hash has been successfully added to the ledger.
              </h3>
              <span id="theHash">{this.state.hash}</span>
              <CopyToClipboard text={this.state.hash}
                onCopy={() => this.setState({copied: true})}>
                  <button id="btnCopy" type="button" class=" mt-3 btn btn-outline-secondary btn-md btn-block">
                    Copy Your Hash
                  </button>
              </CopyToClipboard>

            </div>
          ) : (
            <div>
              <div className="row">
                <div className="d-none d-xl-block d-lg-block d-md-block d-sm-block col-xl-3 col-lg-3 col-md-2 col-sm-2" />
                <div
                  className="col-xl-6 col-lg-6 col-md-8 col-sm-8 col-xs-6"
                  style={{ marginTop: "20px" }}
                >
                  <input
                    type="file"
                    id="fileInput"
                    onChange={e => {
                      this.processFile(e.target.files);
                      // this.handleFileName(e.target.files);
                      console.log(e.target.files[0]);
                      this.setState({ file: e.target.files[0] });
                    }}
                    name="selectedFile"
                    style={{ display: "none" }}
                    className="inputfile inputfile-6"
                    data-multiple-caption="{count} files selected"
                    multiple
                  />

                <label className="input-group mb-3" htmlFor="fileInput">
                  <div className="input-group-prepend">
                    <button className="btn btn-input dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                      Browse
                    </button>
                    <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                      <a className="dropdown-item" >Audiovisual Works</a>
                      <a className="dropdown-item" >Dramatic Works</a>
                      <a className="dropdown-item" >Legal Documentation</a>
                      <a className="dropdown-item" >Literary Works</a>
                      <a className="dropdown-item" >Musical Works</a>
                      <a className="dropdown-item" >Pictorial/Graphical Works</a>
                      <a className="dropdown-item" >Other</a>
                    </div>
                  </div>
                  <input  className="form-control bg-light" aria-label="Text input with dropdown button" placeholder ={this.state.file.name
                    ? this.state.file.name
                    : "Please Select A File"} disabled
                    />
                </label>
                </div>

                <div className="d-none d-xl-block d-lg-block d-md-block d-sm-block col-xl-3 col-lg-3 col-md-2 col-sm-2" />
              </div>
              <div className="row justify-content-center">
                <div
                  className="col-xl-3 col-lg-3 col-md-8 col-sm-6 col-xs-12"
                  style={{ marginTop: "20px" }}
                >
                  <div className="custom-control custom-checkbox mb-3">
                    <input
                      type="checkbox"
                      className="custom-control-input form-control-lg"
                      id="customCheck"
                      onChange={e => this.handleChange(e)}
                      name="example1"
                      style={{ padding: "100px" }}
                    />
                    <label
                      className="custom-control-label"
                      htmlFor="customCheck"
                      style={{
                        fontWeight: "400",
                        color: "#000000",
                        marginLeft: "10px"
                      }}
                    >
                      Save the file online
                    </label>
                  </div>
                  <br />
                  <MuiThemeProvider>
                    <TextField
                      id="outlined-helperText"
                      placeholder="Your Token Symbol"
                      className="mitInput"
                      variant="outlined"
                      onChange={e =>
                        this.setState({ mitContent: e.target.value })
                      }
                    />
                  </MuiThemeProvider>
                </div>
              </div>
              {this.state.checkboxStatus === true ? (
                <div>
                  <div className="row">
                    <div className="col-xl-3 col-lg-3 col-md-2 col-sm-2 col-xs-2" />
                    <div
                      className="col-xl-6 col-lg-6 col-md-8 col-sm-8 col-xs-8"
                      style={{ padding: "0% 6% 0% 6%" }}
                    >
                      <input
                        type="password"
                        placeholder="Password (Optional)"
                        onChange={e =>
                          this.setState({ password: e.target.value })
                        }
                        className="form-control mb-3 mt-2"
                        style={{
                          paddingLeft: "25px",
                          fontFamily: "Proxima Nova",
                          color: "#BDBEBE",
                          borderRadius: "10px"
                        }}
                      />
                    </div>
                    <div className="col-xl-3 col-lg-3 col-md-2 col-sm-2 col-xs-2" />
                  </div>
                  <div className="row">
                    <div className="col-xl-3 col-lg-3 col-md-2 col-sm-2 col-xs-3" />
                    <div className="col-xl-6 col-lg-6 col-md-8 col-sm-8 col-xs-6">
                      <span
                        className="mt-1 mb-2"
                        style={{
                          fontFamily: "Proxima Nova",
                          fontWeight: "400",
                          fontSize: "12px",
                          color: "#000000",
                          marginLeft: "10px"
                        }}
                      >
                        You can in addition add a password. <br />
                        In that case, you will need both the hash and the
                        password to download the file
                      </span>
                    </div>
                    <div className="col-xl-3 col-lg-3 col-md-2 col-sm-2 col-xs-3" />
                  </div>
                </div>
              ) : (
                ""
              )}
            </div>
          )}
          <div
            className="row"
            style={{ textAlign: "center", marginTop: "20px" }}
          >
            <div className="col-12">
              {this.props.errorMsg === "DUPLICATE_ENTRY" ? (
                <kbd style={{ fontFamily: "Proxima Nova", fontSize: "16px" }}>
                  This document has already been registered.&nbsp;&nbsp;
                  <span
                    style={{
                      color: "#FF0000"
                    }}
                  >
                    Warning!!!
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
              <br />
              {this.state.error ? (
                <span className="error">{this.state.error}</span>
              ) : (
                ""
              )}
              {this.props.successMsg === "SUCCESS" ? (
                <button
                  onClick={() => {
                    window.location.reload();
                  }}
                  className="mt-4 mb-5 btn btn-another"
                >
                  Record Another
                </button>
              ) : this.state.recordStatus === true ? (
                <button disabled className="mt-4 mb-5 btn btn-verify btn-create-disabled">
                  Record
                </button>
              ) : (
                <button
                  className="mt-4 mb-5 btn btn-create"
                  disabled={
                    this.state.loading && !this.state.symbol ? true : false
                  }
                  onClick={this.handleClick}
                >
                  {this.state.loading && (
                    <i className="spinner-border" role="status" />
                  )}
                  {!this.state.loading && <span>Record</span>}
                </button>
              )}
            </div>
            <div className="col-xl-3 col-lg-3 col-md-2 col-sm-2 col-xs-2" />
          </div>
        </div>
      </React.Fragment>
    );
  }
}


const mapStateToProps = state => ({
  successMsg: state.ProveitReducer.successMsg,
  // SuccessMsg: state.ProveitReducer.getStoreSuccessMsg,
  errorMsg: state.ProveitErrorReducer.StoreErrorMsg,
  // ErrorMsg: state.ProveitErrorReducer.getStoreErrorMsg
  avatar: state.ProveitReducer.avatar,
  mnemonic: state.ProveitReducer.mnemonic
});

//grab avatar and address here from reducer
//pass these to action and to MitLogic.js

export default connect(mapStateToProps, {
  postStoreAction,
  getStoreAction,
  getMitsAction
})(CreateTab);
