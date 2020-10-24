import React, { useEffect, useState } from "react";
// import logo from "./logo.svg";
// import "./App.css";
import firebase from "firebase";
// import Navbar from "./components/navbar/navbar";
import pamphle1 from "../../Imgaes/hero_bg_pk.jpg";
import "./home.scss";
import vivoAd from "../../Imgaes/vivoAd.jpg";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import truck from "../../Imgaes/truck.webp";
import { Icon } from "semantic-ui-react";
import ad2 from "./../../Imgaes/ad2.png";
import appAdd from "./../../Imgaes/app.webp";
import appstore from "../../Imgaes/appstore.webp";
import playStore from "../../Imgaes/playstore.webp";
import Product from "./Products";
import InfiniteScroll from "react-infinite-scroll-component";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { getData } from "./../store/middleware/middleware";

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 4,
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
function Home(props) {
  let [arr, setArr] = useState([]);

  useEffect(() => {
    let objarr = [];
    for (let i = 0; i < 100; i++) {
      objarr.push({
        price: "120,000",
        Modal: "2020 - 1 km",
        des: "Millat Massey Ferguson 375",
        moment: "Today",
      });
    }
    setArr(objarr);
    // console.log(arr);
  }, []);
  useEffect(() => {
    props.getData();
  }, []);
  useEffect(() => {
    if (props.data) {
      console.log(props.data.productData);
    }
  }, [props.data]);
  console.log(props.user)

  return (
    <div className="Home">
      <div
        className="pamphlet"
        style={{ backgroundImage: `url(${pamphle1})` }}
      ></div>
      <div className="Advert">
        <img src={vivoAd} />
      </div>
      <div className="slider">
        <div className="More">
          <div className="moreHead">
            <h2>More on Tractors & Trailers</h2>
            <p>View more</p>
          </div>
          <Carousel responsive={responsive}>
            <div className="Product">
              <div
                className="productImage"
                style={{ backgroundImage: `url(${truck})` }}
              >
                <div className="feature">
                  <p>FEATURED</p>
                  <Icon className="icon" name="heart outline" />
                </div>
              </div>
              <div className="detail">
                <h3>RS 120,000</h3>
                <p className="Modal">2020 - 1 km</p>
                <p className="des">Millat Massey Ferguson 375</p>
                <p className="moment">Today</p>
              </div>
            </div>
            <div className="Product">
              <div
                className="productImage"
                style={{ backgroundImage: `url(${truck})` }}
              >
                <div className="feature">
                  <p>FEATURED</p>
                  <Icon name="heart outline" />
                </div>
              </div>
              <div className="detail">
                <h3>RS 120,000</h3>
                <p className="Modal">2020 - 1 km</p>
                <p className="des">Millat Massey Ferguson 375</p>
                <p className="moment">Today</p>
              </div>
            </div>
            <div className="Product">
              <div
                className="productImage"
                style={{ backgroundImage: `url(${truck})` }}
              >
                <div className="feature">
                  <p>FEATURED</p>
                  <Icon name="heart outline" />
                </div>
              </div>
              <div className="detail">
                <h3>RS 120,000</h3>
                <p className="Modal">2020 - 1 km</p>
                <p className="des">Millat Massey Ferguson 375</p>
                <p className="moment">Today</p>
              </div>
            </div>
            <div className="Product">
              <div
                className="productImage"
                style={{ backgroundImage: `url(${truck})` }}
              >
                <div className="feature">
                  <p>FEATURED</p>
                  <Icon name="heart outline" />
                </div>
              </div>
              <div className="detail">
                <h3>RS 120,000</h3>
                <p className="Modal">2020 - 1 km</p>
                <p className="des">Millat Massey Ferguson 375</p>
                <p className="moment">Today</p>
              </div>
            </div>
            <div className="Product">
              <div
                className="productImage"
                style={{ backgroundImage: `url(${truck})` }}
              >
                <div className="feature">
                  <p>FEATURED</p>
                  <Icon name="heart outline" />
                </div>
              </div>
              <div className="detail">
                <h3>RS 120,000</h3>
                <p className="Modal">2020 - 1 km</p>
                <p className="des">Millat Massey Ferguson 375</p>
                <p className="moment">Today</p>
              </div>
            </div>
            <div className="Product">
              <div
                className="productImage"
                style={{ backgroundImage: `url(${truck})` }}
              >
                <div className="feature">
                  <p>FEATURED</p>
                  <Icon name="heart outline" />
                </div>
              </div>
              <div className="detail">
                <h3>RS 120,000</h3>
                <p className="Modal">2020 - 1 km</p>
                <p className="des">Millat Massey Ferguson 375</p>
                <p className="moment">Today</p>
              </div>
            </div>
            <div className="Product">
              <div
                className="productImage"
                style={{ backgroundImage: `url(${truck})` }}
              >
                <div className="feature">
                  <p>FEATURED</p>
                  <Icon name="heart outline" />
                </div>
              </div>
              <div className="detail">
                <h3>RS 120,000</h3>
                <p className="Modal">2020 - 1 km</p>
                <p className="des">Millat Massey Ferguson 375</p>
                <p className="moment">Today</p>
              </div>
            </div>
          </Carousel>
        </div>
      </div>
      <div className="FreshRec">
        <h2>Fresh recommendations</h2>
        <div className="AllProduct">
          {props.data.productData ? [

            Object.values(props.data.productData).length ? <Product arr={Object.values(props.data.productData)} setArr={setArr} /> : null
          ]
            : null}
        </div>
        <div className="loadMorebtn">
          <button>Load more</button>
        </div>
      </div>
      <div className="ad2">
        <img src={ad2} />
      </div>
      <div className="appAdd">
        <div className="appImg">
          <img src={appAdd} />
        </div>
        <div className="appIntro">
          <h1>TRY THE OLX APP</h1>
          <p>
            Buy, sell and find just about anything using the app on your mobile.
          </p>
        </div>
        <div className="appLink">
          <h5>GET YOUR APP TODAY</h5>
          <div className="store">
            <img src={appstore} />
            <img src={playStore} />
          </div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  console.log(state.data)
  return {
    data: state.data,
  };
};
const mapDispatchToProps = { getData };

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Home));
