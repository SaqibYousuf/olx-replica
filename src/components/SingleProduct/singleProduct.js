import React, { useEffect, useState } from "react";
import firebase from "firebase";
import { BrowserRouter as Router, Route, withRouter } from "react-router-dom";
import "./singleProduct.scss";
import toyota from "./../../Imgaes/ToyotaSure.PNG";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import truck from "./../../Imgaes/truck.webp";
import container from "./../../Imgaes/container.webp";
import { Breadcrumb, Icon } from "semantic-ui-react";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Slider from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { connect } from "react-redux";
import {
  getSingleData,
  getData,
  sendMsg,
} from "./../store/middleware/middleware";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
}));
const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

function SingleProduct(props) {
  const classes = useStyles();
  let [showNumber, setShowNumber] = useState(false);
  useEffect(() => {
    props.getData();
  }, []);

  let [path, setPath] = useState("");
  let url = "";
  useEffect(() => {
    url = props.history.location.pathname;
  }, []);
  useEffect(() => {
    setPath(url.slice(14));
  }, [url]);

  return props.data.productData
    ? Object.values(props.data.productData).length
      ? [
          props.data.productData.map((a, i) => {
            return path === props.data.productKey[i] ? (
              <div className="SingleProduct">
                <div className="breadDiv">
                  <Breadcrumb>
                    <Breadcrumb.Section link>Home</Breadcrumb.Section>
                    <Breadcrumb.Divider />
                    <Breadcrumb.Section link>
                      {a.mainCatogorie}
                    </Breadcrumb.Section>
                    <Breadcrumb.Divider />
                    <Breadcrumb.Section link>
                      {a.mainCatogorie} - {a.subCatogorie} - {a.type}
                    </Breadcrumb.Section>
                    <Breadcrumb.Divider />
                    <Breadcrumb.Section link>
                      {a.mainCatogorie} - {a.city} - {a.state}
                    </Breadcrumb.Section>
                    <Breadcrumb.Divider />
                    <Breadcrumb.Section link>
                      {a.mainCatogorie} - {a.type} - {a.title}
                    </Breadcrumb.Section>
                  </Breadcrumb>
                </div>
                <div className="AdToy">
                  <img src={toyota} />
                </div>
                <div className="proDetail">
                  <div className="left">
                    <div className="imageSlider">
                      <div className="feature">
                        <p >FEATURED</p>
                      </div>
                      <Carousel>
                        {a.imageURL.length
                          ? a.imageURL.map((a, i) => {
                              return (
                                <div className="imageDiv">
                                  <img src={a} />
                                </div>
                              );
                            })
                          : null}
                      </Carousel>
                    </div>
                    <div className="proDes">
                      {a.mainCatogorie === "Mobile" ? (
                        <>
                          <h3>Details</h3>
                          <div className="detail">
                            <p><b>Condition</b></p>
                            <p>{a.condition}</p>
                            <p><b>Type</b></p>
                            <p>{a.type}</p>
                          </div>
                        </>
                      ) : (
                        <>
                          <h3>Details</h3>
                          <div className="detail">
                            <p>Area unit</p>
                            <p>Square Feet</p>
                            <p>Area</p>
                            <p>240</p>
                          </div>
                        </>
                      )}
                      <hr />
                      <div>
                        <h3>Description</h3>
                        <p>{a.descript}</p>
                      </div>
                    </div>
                    <div className="Relatedads">
                      <h3>Related ads</h3>
                      <Slider responsive={responsive}>
                        {props.data.productData
                          ? [
                              Object.values(props.data.productData).length
                                ? props.data.productData.map((b, j) => {
                                    return b.mainCatogorie === a.mainCatogorie ? (
                                      <div className="Product">
                                        <div
                                          className="productImage"
                                          style={{
                                            backgroundImage: `url(${b.imageURL[0]})`,
                                          }}
                                        >
                                       
                                        </div>
                                        <div className="detail">
                                          <h3>RS {b.price} </h3>
                                          <p className="Modal"></p>
                                          <p className="des"></p>
                                          <p className="moment">{a.moment}</p>
                                        </div>
                                      </div>
                                    ):null;
                                  })
                                : null,
                            ]
                          : null}
                  
                      </Slider>
                      ;
                    </div>
                  </div>
                  <div className="Price">
                    <div className="price11">
                      <div className="priceDet">
                        <div>
                          <h1>Rs {a.price}</h1>
                          <p>
                            office containers/prefab school extentions
                            containers
                          </p>
                        </div>
                        <div className="iconDiv">
                          <Icon name="share alternate" />
                          <Icon name="heart outline" />
                        </div>
                      </div>
                      <div className="locDate">
                        <p>
                          {a.city}, {a.state}, Pakistan
                        </p>
                        <p>25sep</p>
                      </div>
                    </div>
                    <div className="sellerDes">
                      <div
                        className={(classes.root, "avatar")}
                        onClick={() =>
                          props.history.push(`/profile/${a.userId}`)
                        }
                      >
                        <Avatar
                          alt="Remy Sharp"
                          src="/static/images/avatar/1.jpg"
                          className={classes.large}
                        />
                      </div>
                      <div className="name">
                        <h2>{a.name}</h2>
                        <p>Member since Dec 2018</p>
                      </div>
                      <div className="chatButton">
                        <button
                          onClick={() =>
                            props.history.push(`/messeges/${a.key}`)
                          }
                        >
                          Chat with seller
                        </button>
                        <div className="number">
                          <Icon name="phone" />
                          {showNumber ? (
                            <p>{a.phoneNumber}</p>
                          ) : (
                            <p>** *** ***</p>
                          )}
                          <p
                            className="show"
                            onClick={() => setShowNumber(true)}
                          >
                            show number
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : null;
          }),
        ]
      : null
    : null;
}
const mapStateToProps = (state) => {
  return {
    singleData: state.singleData,
    data: state.data,
  };
};
const mapDispatchToProps = { getSingleData, getData, sendMsg };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(SingleProduct));
