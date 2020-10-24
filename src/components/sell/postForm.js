import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import firebase from "firebase";
import { Breadcrumb, Input } from "semantic-ui-react";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
// import Navbar from "./components/navbar/navbar";
import {
  BrowserRouter as Router,
  Link,
  Route,
  withRouter,
} from "react-router-dom";
import AddAPhotoIcon from "@material-ui/icons/AddAPhoto";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { Select } from "semantic-ui-react";
import { Switch } from "@material-ui/core";
import { Button } from "semantic-ui-react";
import { postdata } from "./../store/middleware/middleware";
import { connect } from "react-redux";
const stateOpt = [
  { key: "select", value: "select", text: "-select-your-state-" },
  { key: "sindh", value: "sindh", text: "sindh" },
  { key: "punjab", value: "punjab", text: "punjab" },
  { key: "balochistan", value: "Balochistan", text: "Balochistan" },
  { key: "kpk", value: "kpk", text: "Khyberpakhtunkhua" },
];
const cityOpt = [
  { key: "select", value: "select", text: "-select-your-city-" },
  { key: "Sindh", value: "khi", text: "Karachi" },
  { key: "Sindh", value: "hyd", text: "Hyderabad" },
  { key: "Sindh", value: "suk", text: "Sukkur" },
  { key: "Punjab", value: "lhr", text: "Lahore" },
  { key: "Punjab", value: "guj", text: "GujranWala" },
  { key: "Punjab", value: "Muree", text: "Muree" },
  { key: "Balochistan", value: "qta", text: "Quetta" },
  { key: "Balochistan", value: "gdr", text: "Gwadar" },
  { key: "Balochistan", value: "klt", text: "Kaalat" },
  { key: "Khyberpakhtunkhua", value: "psh", text: "Peshawar" },
  { key: "Khyberpakhtunkhua", value: "abt", text: "Abbottabad" },
  { key: "Khyberpakhtunkhua", value: "kht", text: "Kohat" },
];
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}
// import PropTypes from "prop-types";
function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(1),
      flexGrow: 1,
      backgroundColor: theme.palette.background.paper,
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
function PostForm(props) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const classes = useStyles();
  let [user, setUser] = useState("");
  const ImageMap = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      setUser(user);
    } else {
      // No user is signed in.
    }
  });
  if(!props.mainCatog && !props.subCatog){
props.history.push('/post')
  }
  let [images, setImage] = useState("");
  let [imagesArr, setimagesArr] = useState([]);
  let [state, setState] = useState("");
  let [city, setCity] = useState("");
  let [condition, setConditon] = useState("");
  let [type, setType] = useState("");
  let [title, setTime] = useState("");
  let [descript, setDescript] = useState("");
  let [price, setPrice] = useState("");
  let [name, setName] = useState("");
  let [phoneNumber, setPhoneNumber] = useState("");
  let [showPhoneNumber, setShowPhoneNumber] = useState("");
  let [key, setKey] = useState(firebase.database().ref("Products").push().key);
  let [specificType, setSpecificType] = useState([]);
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
  useEffect(() => {
    if (props.mainCatog === "Mobile") {
      setSpecificType([
        "Iphone",
        "Android",
        "Danny",
        "QTabs",
        "Samsung",
        "Other",
      ]);
    } else if (props.mainCatog === "Vehicles") {
      setSpecificType(["Car", "Truck", "Bike", "Four wheel", "Other"]);
    } else if (
      props.mainCatog === "Property for Sale" ||
      props.mainCatog === "Property for Rent"
    ) {
      setSpecificType(["2 Rooms", "3 Rooms", "4 Rooms", "Luxury", "Other"]);
    } else if (props.mainCatog === "Electronics & Home Appliances") {
      setSpecificType(["Light", "Bulb", "Fan", "Crockery", "Other"]);
    } else if (props.mainCatog === "Bikes") {
      setSpecificType(["Bikes", "Haybusa", "70cc", "125cc", "Other"]);
    } else if (props.mainCatog === "Bikes") {
      setSpecificType(["Bikes", "Haybusa", "70cc", "125cc", "Other"]);
    } else if (props.mainCatog === "Jobs") {
      setSpecificType(["Full Time", "Part Time", "Other"]);
    }
  }, [props.mainCatog]);
  let subCat = {
    Mobile: ["Tablets", "Accessories", "Mobile Phones"],
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
 

  let [getfullDate, setfullDate] = useState(new Date().toDateString());
let [date,setDate] = useState(getfullDate.slice(4,10))

  let postObj = {
    mainCatogorie: props.mainCatog,
    subCatogorie: props.subCatog,
    state: state,
    city: city,
    condition: condition,
    type: type,
    title: title,
    descript: descript,
    price: price,
    name: name,
    phoneNumber: phoneNumber,
    showPhoneNumber: showPhoneNumber,
    userId: user.uid,
    userName: user.displayName,
    key: key,
    moment:date,
  };

  return (
    <div className="PostForm">
      <div className="form">
        <div className="formHead">
          <h3>SELECTED CATEGORY</h3>
          <div className="catogorie">
            <div>
              {" "}
              <Breadcrumb>
                <Breadcrumb.Section link>Home</Breadcrumb.Section>
                <Breadcrumb.Divider />
                <Breadcrumb.Section link>{props.mainCatog}</Breadcrumb.Section>
                <Breadcrumb.Divider />
                <Breadcrumb.Section link>{props.subCatog}</Breadcrumb.Section>
              </Breadcrumb>
            </div>
            <div>
              <Link>Change</Link>
            </div>
          </div>
        </div>
        <div className="formBody">
          <h3>INCLUDE SOME DETAILS</h3>
          <div className="feilds">
            <p>
              Conditions <sup>*</sup>
            </p>
            <div className="condition">
              <div
                className="buttonField"
                value="New"
                onClick={(ev) => setConditon(ev.currentTarget.textContent)}
              >
                New
              </div>
              <div
                className="buttonField"
                value="Used"
                onClick={(ev) => setConditon(ev.currentTarget.textContent)}
              >
                Used
              </div>
            </div>
            <div className="type">
              <p>
                Type <sup>*</sup>
              </p>
              <div className="typeField">
                {specificType.length
                  ? specificType.map((a, i) => {
                      return (
                        <div
                          className="buttonField"
                          onClick={(ev) =>
                            setType(ev.currentTarget.textContent)
                          }
                        >
                          {a}
                        </div>
                      );
                    })
                  : null}
              
              </div>
            </div>
            <div>
              <div className="title">
                <p>Ad title *</p>
                <Input
                  className="input"
                  onChange={(ev) => setTime(ev.target.value)}
                />
              </div>
              <div className="des">
                <p>Description *</p>
                <Input
                  className="descript"
                  onChange={(ev) => setDescript(ev.target.value)}
                />
              </div>
            </div>
            <hr />
            <div className="price">
              <h3>SET A PRICE</h3>
              <p>Price*</p>
              <Input
                className="priceInput"
                label="RS"
                iconPosition="left"
                placeholder="Search users..."
                onChange={(ev) => setPrice(ev.target.value)}
              />
            </div>
            <hr />
            <div className="ImagesUp">
              <h3>
                UPLOAD UP TO 12 PHOTOS
              </h3>
              <div className="imgColm">
                {ImageMap.length
                  ? ImageMap.map((a, i) => {
                      return (
                        <label className="label">
                          <div
                            className="Images"
                           
                            style={
                              images[i]
                                ? { backgroundImage: `url(${images[i]})` }
                                : null
                            }
                          >
                            {images[i] ? null : (
                              <>
                                <AddAPhotoIcon />
                                <p>Add photo</p>
                              </>
                            )}
                            <input
                              type="file"
                              onChange={(ev) => [
                                setImage([
                                  ...images,
                                  URL.createObjectURL(ev.target.files[0]),
                                ]),
                                setimagesArr([
                                  ...imagesArr,
                                  ev.target.files[0],
                                ]),
                              ]}
                            />
                          </div>
                        </label>
                      );
                    })
                  : null}
              </div>
              <hr />
              <div className="location">
                <h3>CONFIRM YOUR LOCATION</h3>
                <div className="locTab">
                  <div className={(classes.root, "innerTab")}>
                    <AppBar position="static" className="appBar">
                      <Tabs
                        value={value}
                        onChange={handleChange}
                        aria-label="simple tabs example"
                      >
                        <Tab label="List" {...a11yProps(0)} />
                        <Tab label="Location" {...a11yProps(1)} />
                        {/* <Tab label="Item Three" {...a11yProps(2)} /> */}
                      </Tabs>
                    </AppBar>
                    <TabPanel value={value} index={0}>
                  
                      <select
                        className="locSelect"
                        placeholder="Select your country"
                        // options={stateOpt}
                        onChange={(ev) => setState(ev.target.value)}
                      >
                        {stateOpt.length
                          ? stateOpt.map((a, i) => {
                              return <option>{a.text}</option>;
                            })
                          : null}
                      </select>
                      <br />
                      {/* <Select
                        className="locSelect"
                        placeholder="Select your country"
                        options={cityOpt}
                        onChange={(ev) => setCity(ev.target.value)}
                      /> */}
                      <select
                        className="locSelect"
                        placeholder="Select your country"
                        // options={stateOpt}
                        onChange={(ev) => setCity(ev.target.value)}
                      >
                        {cityOpt.length
                          ? cityOpt.map((a, i) => {
                              return state === a.key ? (
                                <option>{a.text}</option>
                              ) : null;
                            })
                          : null}
                      </select>
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                      Item Two
                    </TabPanel>
                  </div>
                </div>
              </div>
            </div>
            <hr />
            <div className="personalDetail">
              <h3>REVIEW YOUR DETAILS</h3>
              <div className="avatar">
                <Avatar
                  className="Image"
                  alt={user.displayName}
                  src={user.photoURL}
                />
                <div className="name">
                  <h5>Name:</h5>
                  <Input
                    placeholder="Search..."
                    onChange={(ev) => setName(ev.target.value)}
                  />
                </div>
              </div>
              <div className="phoneNumber">
                <h5>Your phone number</h5>
                {user.phoneNumber ? (
                  <p onChange={(ev) => setPhoneNumber(ev.target.value)}>
                    {user.phoneNumber}
                  </p>
                ) : (
                  <Input
                    className="input"
                    placeholder="Phone Number"
                    onChange={(ev) => setPhoneNumber(ev.target.value)}
                  />
                )}
              </div>
              <div className="phoneNumber">
                <h5>Show my phone number on my ads</h5>
                <Switch
                  checked={state.checkedB}
                  onChange={handleChange}
                  color="primary"
                  name="checkedB"
                  inputProps={{ "aria-label": "primary checkbox" }}
                />
              </div>
            </div>
            <hr />
            <div>
              <Button
                onClick={() => [
                  props.postdata(postObj, key, imagesArr),
                ]}
              >
                Post
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    // user: state.user,
  };
};
const mapDispatchToProps = { postdata };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(PostForm));
