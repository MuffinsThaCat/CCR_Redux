import React, { Component } from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import RaisedButton from "material-ui/RaisedButton";
import TextField from "material-ui/TextField";
import Button from "material-ui/FlatButton";
import { connect } from "react-redux";

import { createWallet } from "../../Actions/walletGeneration";
import { login_out } from "../../Actions/Authentication";
import { updateAccount } from "../../Actions/Account";
import { getItem, deleteItem, updateItem, addItem } from "../../utils/idb";
import { keyString256, aesEncrypt, aesDecrypt } from "../../utils/creepto";
import { getAvatar } from "../../BlockchainLogic/Faucet";
import { getMits } from "../../BlockchainLogic/MitLogic";
import { getMitsAction } from "../../Actions/MitGeneration";

import "./Login.css";

const style = {
  margin: 15
};

class Login extends Component {
  state = {
    password: "",
    avatar: "",
    error: null
  };

  handleClick = async event => {
    event.preventDefault();
    if (this.state.password) {
      let password = this.state.password;
      let mnemonic;
      let { avatar, salt, walletInfo } = await getItem("accountInfo");
      let key = keyString256(password, salt).key;

      let decryptedMnemonic = aesDecrypt(key, walletInfo);

      if (walletInfo === aesEncrypt(key, decryptedMnemonic)) {
        mnemonic = decryptedMnemonic;
        let avatarInfo = await getAvatar(avatar);
        console.log(avatarInfo, "avatarInfo<-");
        if (await avatarInfo) {
          console.log(avatarInfo);
          let userAddress = await avatarInfo.address;
          let mits = await getMits([await userAddress]);

          await updateItem("loggedIn", true);
          await addItem(["mnemonic", "mits"], [mnemonic, mits]);
          this.props.createWallet(mnemonic, avatarInfo.symbol);
          this.props.login_out(true);
          this.props.getMitsAction(mits);
        }
      } else {
        this.setState({ error: "wrong password" });
      }
    }
  };

  handleRegister = async () => {
    await deleteItem("accountInfo");
    await deleteItem("loggedIn");
    this.props.updateAccount(null);
    this.props.login_out(false);
  };

  render() {
    return (
      <React.Fragment>
        <div className="container-fluid">
          <div className="row">
            <div className="col-2 col-sm-3 col-md-4 col-lg-4 col-xl-4"> </div>
            <div className="col-8 col-sm-6 col-md-4 col-lg-4 col-xl-4 logo-text-container">
              <div className="row">
                <div className="col">
                  <div className="text-center company-logo-section">
                    <img
                      className="company-logo"
                      src={require("../../Assets/Logo/crypto-copyright.png")}
                      alt="company-logo"
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <div className="text-center mt-2 text-animation">
                    <div>
                      <MuiThemeProvider>
                        <div>
                          <TextField
                            hintText="Enter your digital identity"
                            floatingLabelText="Digital Identity"
                            disabled
                            value={this.props.username}
                          />
                          <br />
                          <TextField
                            type="password"
                            hintText="Enter your Password"
                            floatingLabelText="Password"
                            onChange={e =>
                              this.setState({ password: e.target.value })
                            }
                            onFocus={e => this.setState({ error: null })}
                          />
                          <br />
                          {this.state.error ? (
                            <span className="error">{this.state.error}</span>
                          ) : (
                            ""
                          )}
                          <br />
                          <span>Or</span>
                          <br />
                          <Button
                            className="registerBtn"
                            onClick={this.handleRegister}
                          >
                            Register New Account
                          </Button>
                          <br />
                          <RaisedButton
                            disabled={this.state.password ? false : true}
                            label="Login"
                            variant="contained"
                            primary={true}
                            style={style}
                            onClick={this.handleClick}
                          />
                        </div>
                      </MuiThemeProvider>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-2 col-sm-3 col-md-4 col-lg-4 col-xl-4"></div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  // mnemonic : state.ProveitReducer.mnemonic
});
// this.props.mnemonic

export default connect(mapStateToProps, {
  createWallet,
  login_out,
  updateAccount,
  getMitsAction
})(Login);
