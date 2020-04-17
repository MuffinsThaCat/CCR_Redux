import React, { Component } from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import RaisedButton from "material-ui/RaisedButton";
import TextField from "material-ui/TextField";
import { connect } from "react-redux";
import { getItem, addItem } from "../../utils/idb";
import { createWallet } from "../../Actions/walletGeneration";
import { login_out } from "../../Actions/Authentication";
import { updateAccount } from "../../Actions/Account";
import { keyString256, aesEncrypt } from "../../utils/creepto";
import { run } from "../../BlockchainLogic/Faucet";

import "./Login.css";

const style = {
  margin: 15
};

class Register extends Component {
  state = {
    username: "",
    password: "",
    passwordMatch: "",
    email: "",
    error: null,
    loading: false,
    mnemonic: "",
    avatar: ""
  };

  handleClick = async () => {
    let { password, username, email, passwordMatch } = this.state;
    if (password && username && email && passwordMatch) {
      if (passwordMatch === password) {
        if (username.length > 3) {
          let exsitedAccount = await getItem("accountInfo");
          let existedLoggedIn = await getItem("loggedIn");

          if (existedLoggedIn === undefined && exsitedAccount === undefined) {
            this.setState({ loading: true });
            let avatarAPI = await fetch(
              `https://explorer-testnet.mvs.org/api/avatar/${username}`
            );

            let avatarInfo = await avatarAPI.json();
            if ((await avatarInfo.result) === null) {
              try {
                const [mnemonic, avatar] = await run(username);
                this.setState({ avatar, mnemonic });
              } catch (err) {
                this.setState({ error: err.message, loading: false });

                return false;
              }
              let passHash = keyString256(password);
              const key = passHash.key;
              const salt = passHash.salt;
              let encryptedHash = aesEncrypt(key, this.state.mnemonic);

              let secret = {
                avatar: this.state.avatar,
                salt: salt,
                walletInfo: encryptedHash
              };

              await addItem(
                ["accountInfo", "loggedIn", "mnemonic"],
                [secret, true, this.state.mnemonic]
              );
              this.props.login_out(true);
              this.props.updateAccount(secret);
              this.props.createWallet(this.state.mnemonic, this.state.avatar);
              this.setState({ loading: false });
            } else {
              this.setState({
                error: "The chosen username is taken, please try another name.",
                loading: false
              });
            }
            
          } else {
            this.setState({ error: "Account already existed." });
          }
        } else {
          this.setState({ error: "Username must be at least 3 charaters." });
        }
      } else {
        this.setState({ error: "Your password did not match." });
      }
    } else {
      this.setState({ error: "All fields are mandatory." });
    }
  };

  componentWillUnmount() {
    this.setState({ loading: false });
  }

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
                            id="username"
                            hintText="Enter your digital identity"
                            floatingLabelText="Digital Identity"
                            onFocus={e => this.setState({ error: null })}
                            onChange={e =>
                              this.setState({ username: e.target.value })
                            }
                          />
                          <br />
                          <TextField
                            id="email"
                            type="email"
                            hintText="Enter your email"
                            floatingLabelText="Email"
                            onFocus={e => this.setState({ error: null })}
                            onChange={e =>
                              this.setState({ email: e.target.value })
                            }
                          />
                          <br />
                          <TextField
                            id="password"
                            type="password"
                            hintText="Enter your Password"
                            floatingLabelText="Password"
                            onFocus={e => this.setState({ error: null })}
                            onChange={e => {
                              this.setState({ password: e.target.value });
                            }}
                          />
                          <br />
                          <TextField
                            id="passwordMatch"
                            type="password"
                            hintText="Re-Enter your Password"
                            floatingLabelText="Password Again"
                            onFocus={e => this.setState({ error: null })}
                            onChange={e => {
                              this.setState({ passwordMatch: e.target.value });
                            }}
                          />
                          <br />
                          {this.state.error ? (
                            <span className="error">{this.state.error}</span>
                          ) : (
                            ""
                          )}
                          <br />
                          <RaisedButton
                            disabled={
                              this.state.password &&
                              this.state.email &&
                              this.state.username &&
                              !this.state.loading
                                ? false
                                : true
                            }
                            label={
                              this.state.loading
                                ? "Talking to Metaverse..."
                                : "Register"
                            }
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

const mapStateToProps = () => ({});

export default connect(mapStateToProps, {
  createWallet,
  updateAccount,
  login_out
})(Register);
