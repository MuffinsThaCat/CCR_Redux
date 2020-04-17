import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";
import { connect } from "react-redux";
import { getMits } from "../../../BlockchainLogic/MitLogic";
import { getAvatar } from "../../../BlockchainLogic/Faucet";
import { getMitsAction } from "../../../Actions/MitGeneration";
import { updateItem, getItem } from "../../../utils/idb";

import "./listMits.css";

class ListMits extends Component {
  state = {
    loading: false
  };
  address;

  async componentDidMount() {
    let { avatar } = await getItem("accountInfo");
    let avatarInfo = await getAvatar(await avatar);
    if (await avatarInfo) {
      this.address = await avatarInfo.address;
      let mits = await getMits([await this.address]);
      await updateItem("mits", mits);
      this.props.getMitsAction(mits);
    }
  }

  handleRefresh = async () => {
    this.setState({ loading: true });
    const mits = await getMits([this.address]);
    this.props.getMitsAction(mits);
    await updateItem("mits", mits);
    setTimeout(() => this.setState({ loading: false }), 1000);
  };

  render() {
    return (
      <div>
        {this.props.mits.length ? (
          <React.Fragment>
            {this.state.loading ? (
              <CircularProgress color="#aaa" size={20} />
            ) : (
              <img
                src={require("../../../Assets/Logo/refresh-button.png")}
                alt="Refresh Button"
                className="refreshImg"
                onClick={this.handleRefresh}
              />
            )}
            <Grid className="mitContainer" container spacing={2}>
              {this.props.mits.map(mit => (
                <Grid
                  key={mit.symbol}
                  className="cardHolder"
                  item
                  container
                  sx={12}
                  md={6}
                >
                  <Card className="card" key={mit.symbol}>
                    <CardHeader
                      avatar={
                        <Avatar
                          alt="default metaverse mit icon"
                          src={require("../../../Assets/Logo/WechatIMG187.jpeg")}
                          aria-label="recipe"
                          className="avatar"
                        />
                      }
                      title={mit.content}
                      subheader={`Owned By: ${mit.owner}`}
                    />
                    <CardContent>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        component="p"
                      >
                        <strong>Your File Hash : </strong>
                        {mit.symbol}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </React.Fragment>
        ) : (
          <React.Fragment>
           {this.state.loading ? (
              <CircularProgress color="#aaa" size={20} />
            ) : (
              <img
                src={require("../../../Assets/Logo/refresh-button.png")}
                alt="Refresh Button"
                className="refreshImg"
                onClick={this.handleRefresh}
              />
            )}
            <h4>Please create some MITS</h4>
          </React.Fragment>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  mits: state.ProveitReducer.mits,
  avatar: state.ProveitReducer.account.avatar
});

export default connect(mapStateToProps, { getMitsAction })(ListMits);
