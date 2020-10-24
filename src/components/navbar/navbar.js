import React, { useEffect, useState } from "react";
import firebase from "firebase";
import logo from "./../../Imgaes/olx.png";
import "./navbar.scss";
import "semantic-ui-css/semantic.min.css";
import {
  Icon,
  Input,
  Dropdown,
  Menu,
  Button,
  Header,
  Image,
  Modal,
  Search,
} from "semantic-ui-react";
import { Link, BrowserRouter as Router, withRouter } from "react-router-dom";
import Carousel from "react-multi-carousel";
import loginslider1 from "./../../Imgaes/loginslider.webp";
import loginslider2 from "./../../Imgaes/loginslider2.webp";
import loginslider3 from "./../../Imgaes/loginslider3.webp";
import SecModal from "./SecModal";
import LoginModal from "./LoginModal";
import Verify from "./verify";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import { PinDropSharp } from "@material-ui/icons";
import { connect } from "react-redux";
import {
  getData,
  logOut,
  getSingleData,
} from "./../store/middleware/middleware";
import { item } from "../../Imgaes/container.webp";

const options = [
  { key: 1, text: "Choice 1", value: 1 },
  { key: 2, text: "Choice 2", value: 2 },
  { key: 3, text: "Choice 3", value: 3 },
];

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 1,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 1,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 1,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "row",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));
function Navbar(props) {
  const classes = useStyles();
  let [loginButton, setLoginButton] = useState(true);
  let [loginEmail, setLoginEmail] = useState(false);
  let [next, setNext] = useState(false);
  let [phoneNumber, setPhoneNUmber] = useState("");
  let [email, setEmail] = useState("");
  const [open, setOpen] = React.useState(false);
  let [user, setUser] = useState("");
  let catArr = {
    Mobile: "Mobile",
    Vehicles: "Vehicles",
    PropertySale: "Property for Sale",
    PropertyRent: "Property for Rent",
    Electronics: "Electronics & Home Appliances",
    Bikes: "Bikes",
    Business: "Business, Industrial & Agriculture",
    Services: "Services",
    Jobs: "Jobs",
    Animals: "Animals",
    Furniture: "Furniture: & Home Decor",
    Fashion: "Fashion: & Beauty",
    Books: "Books, Sports & Hobbies",
    Kids: "Kids",
  };
  let subCat = {
    Mobile: ["Tablets", "Mobile Accessories", "Mobile Phones"],
    Vehicles: [
      "Cars",
      "Cars on Installments",
      "Cars Accessories",
      "Spare Parts",
      "Buses, Vans & Trucks",
      "Rickshaw & Chingchi",
      "Other Vehicles",
      "Boats",
      "Tractors & Trailers",
    ],
    PropertySale: [
      " Land & Plots",
      "Houses",
      "Apartments & Flats",
      "Shops - Offices - Commercial Space",
      "Portions & Floors",
    ],
    PropertyRent: [
      "Houses",
      "Apartments & Flats",
      "Portions & Floors",
      "Shops - Offices - Commercial Space",
      "Rooms",
      "Roommates & Paying Guests",
      "Vacation Rentals - Guest Houses",
      "Land & Plots",
    ],
    Electronics: [
      "Computers & Accessories",
      "TV - Video - Audio",
      "Cameras & Accessories",
      "Games & Entertainment",
      "Other Home Appliances",
      "Generators, UPS & Power Solutions",
      "Kitchen Appliances",
      "AC & Coolers",
      "Fridges & Freezers",
      "Washing Machines & Dryers",
    ],
    Bikes: [
      "Motorcycles",
      "Spare Parts",
      "Bicycles",
      "ATV & Quads",
      "Scooters",
    ],
    Business: [
      "Business for Sale",
      "Food & Restaurants",
      "Trade & Industrial",
      "Construction & Heavy Machinery",
      "Agriculture",
      "Other Business & Industry",
      "Medical & Pharma",
    ],
    Services: [
      " Education & Classes",
      "Travel & Visa",
      "Car Rental",
      "Drivers & Taxi",
      "Web Development",
      "Other Services",
      "Electronics & Computer Repair",
      "Event Services",
      "Health & Beauty",
      "Maids & Domestic Help",
      "Movers & Packers",
      "Home & Office Repair",
      "Catering & Restaurant",
      "Farm & Fresh Food",
    ],
    Jobs: [
      "Online",
      "Marketing",
      "Advertising & PR",
      "Education",
      "Customer Service",
      "Sales",
      "IT & Networking",
      "Hotels & Tourism",
      "Clerical & Administration",
      "Human Resources",
      "Accounting & Finance",
      "Manufacturing",
      "Medical",
      "Domestic Staff",
      "Part - Time",
      "Other Jobs",
    ],
    Animals: [
      "Fish & Aquariums",
      "Birds",
      "Hens & Aseel",
      "Cats",
      "Dogs",
      "Livestock",
      "Horses",
      "Pet Food & Accessories",
      "Other Animals",
    ],
    Furniture: [
      "Sofa & Chairs",
      "Beds & Wardrobes",
      "Home Decoration",
      "Tables & Dining",
      "Garden & Outdoor",
      "Painting & Mirrors",
      "Rugs & Carpets",
      "Curtains & Blinds",
      "Office Furniture",
      "Other Household Items",
    ],
    Fashion: [
      "Accessories",
      "Clothes",
      "Footwear",
      "Jewellery",
      "Make Up",
      "Skin & Hair",
      "Watches",
      "Wedding",
      "Lawn & Pret",
      "Couture",
      "Other Fashion",
    ],
    Books: [
      "Books & Magazines",
      "Musical Instruments",
      "Sports Equipment",
      "Gym & Fitness",
      "Other Hobbies",
    ],
    Kids: [
      " Kids Furniture",
      "Toys",
      "Prams & Walkers",
      "Swings & Slides",
      "Kids Bikes",
      "Kids Accessories",
    ],
  };
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      setUser(user);
    } else {
      // No user is signed in.
    }
  });

  let [arr, setArr] = useState("");
  let [value, setValue] = useState("");
  let [searchArr, setSearchArr] = useState("");
  let [searchDrop, setSearchDrop] = useState(false);
  useEffect(() => {
    props.getData();
  }, []);
  useEffect(() => {
    if (props.data.productData) {
      setArr(Object.values(props.data.productData));
    }
  }, [props.data]);
  let [filterArr, setFilterArr] = useState([]);
  let arr2 = [];
  function search(ev) {
    if (ev.target.value === "") {
      setSearchDrop(false);
    }
    setValue(ev.target.value);
    // Regexfilter(arr, value, "mainCatogorie");
    arr2 = [...arr];
    arr2 = arr.filter((b) =>
      b.mainCatogorie.toLowerCase().match(value.toLowerCase())
    );
    setFilterArr(arr2);
  }
  let [userDrop, setUserDrop] = useState(false);
  return (
    <Router>
      <div className="Navbar">
        <div className="logo" onClick={() => props.history.push("/")}>
          <img src={logo} />
        </div>
        <div className="location">
          <Input className="input" iconPosition="left" placeholder="search">
            <Icon className="searchIcon" name="search" />
            <input />
            {/* <Icon name="chevron down"/> */}
          </Input>
        </div>
        <div className="search">
          <Input
            className="input"
            action={{ icon: "search" }}
            placeholder="Search..."
            onChange={(ev) => [setSearchDrop(true), search(ev)]}
          />
          <div className="searchItems">
            {searchDrop
              ? [
                  filterArr.length
                    ? filterArr.map((a, i) => {
                        return (
                          <div
                            className="item"
                            onClick={() => [
                              props.getSingleData(a),
                              props.history.push(`/products/view/${a.key}`),
                              setSearchDrop(false),
                            ]}
                          >
                            <div
                              className="itemImage"
                              style={{
                                backgroundImage: `url(${a.imageURL[0]})`,
                              }}
                            ></div>
                            <div className="itemName">
                              <h5>{a.title}</h5>
                              <p>{a.mainCatogorie}</p>
                              <p className="loc">
                                {a.state}/{a.city}
                              </p>
                            </div>
                          </div>
                        );
                      })
                    : null,
                ]
              : null}
          </div>
        </div>
        <div className="navLinks">
          {!user ? (
            <Link>
              {loginButton ? (
                <LoginModal
                  loginButton={loginButton}
                  setLoginButton={setLoginButton}
                  loginEmail={loginEmail}
                  setLoginEmail={setLoginEmail}
                  open={open}
                  setOpen={setOpen}
                />
              ) : (
                [
                  next ? (
                    <Verify
                      loginButton={loginButton}
                      setLoginButton={setLoginButton}
                      loginEmail={loginEmail}
                      setLoginEmail={setLoginEmail}
                      open={open}
                      setOpen={setOpen}
                      setNext={setNext}
                      next={next}
                      email={email}
                      phoneNumber={phoneNumber}
                    />
                  ) : (
                    <>
                      <SecModal
                        loginButton={loginButton}
                        setLoginButton={setLoginButton}
                        loginEmail={loginEmail}
                        setLoginEmail={setLoginEmail}
                        open={open}
                        setOpen={setOpen}
                        setNext={setNext}
                        setPhoneNUmber={setPhoneNUmber}
                        phoneNumber={phoneNumber}
                        setEmail={setEmail}
                        email={email}
                      />
                    </>
                  ),
                ]
              )}
            </Link>
          ) : null}
          <Icon
            name="comment outline"
            className="linkIcon"
            onClick={() => props.history.push(`/messeges/id`)}
          />
          {/* </Link> */}
          <Link className="linkIcon">
            <Icon name="bell outline" />
          </Link>
          {user ? (
            <Link className="linkIcon" onClick={() => setUserDrop(true)}>
              <div className={classes.root}>
                <Avatar alt={user.displayName} Sharp src={user.photoURL} />
                <Icon name="chevron down" />
              </div>
              {userDrop ? (
                <div className="userDrop">
                  <p>Hello</p>
                  <div className="userAv">
                    <Avatar alt={user.displayName} Sharp src={user.photoURL} />
                    <div className="edit">
                      <h4
                        onClick={() =>
                          props.history.push(`/profile/${user.uid}`)
                        }
                      >
                        {user.displayName}
                      </h4>
                      <Link>Edit your profile</Link>
                    </div>
                  </div>
                  <hr />
                  <div className="menu">
                    <div>
                      <Icon name="adversal"  onClick={() =>
                          props.history.push(`/profile/${user.uid}`)
                        } /> My Ads
                    </div>
                    <div>
                      <Icon name="file alternate outline" />
                      Buy Business Packages
                    </div>
                    <div>Bought Packages & Billing</div>
                    <div onClick={()=>props.history.push('/editProfile/info')}>
                      <Icon name="settings" />
                      Setting
                    </div>
                    <div
                      style={{
                        borderTop: "1 solid rgba(0, 47, 52, 0.2)",
                        borderBottom: "1 solid rgba(0, 47, 52, 0.2)",
                      }}
                    >
                      <Icon name="download" />
                      Install OLX Lite
                    </div>
                    <div onClick={() => props.logOut()}>
                      <Icon name="sign-out" />
                      Logout
                    </div>
                  </div>
                </div>
              ) : null}
            </Link>
          ) : null}
          <Link>
            <button
              onClick={() => (user ? props.history.push("/post") : null)}
              className="Sell"
            >
              <Icon className="sellIcon" name="plus" />
              SELL
            </button>
          </Link>
        </div>
      </div>
      <div className="catNav">
        <div>
          <Menu className="menu">
            {/* <Menu.Item>Home</Menu.Item> */}
            <Dropdown
              className="catogories"
              text="Shopping"
              pointing
              className="link item"
            >
              <Dropdown.Menu id="catogories" className="catogories">
                <div className="innerCat">
                  {Object.values(subCat).length
                    ? Object.values(subCat)
                        .map((b, i) => {
                          return b.map((c, j) => {
                            return (
                              <Dropdown.Item
                                onClick={(ev) =>
                                  props.history.push(
                                    `/products/${ev.currentTarget.textContent}`
                                  )
                                }
                              >
                                {c}
                              </Dropdown.Item>
                            );
                          });
                        })
                    : null}
                </div>
              </Dropdown.Menu>
            </Dropdown>
            <Menu.Item>Forums</Menu.Item>
            <Menu.Item>Contact Us</Menu.Item>
          </Menu>
        </div>
      </div>
    </Router>
  );
}
const mapStateToProps = (state) => {
  return {
    data: state.data,
  };
};
const mapDispatchToProps = { getData, logOut, getSingleData };
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Navbar));
