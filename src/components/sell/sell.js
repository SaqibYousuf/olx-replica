import React, { useEffect, useState } from "react";
import firebase from "firebase";
import { BrowserRouter as Router, Route, withRouter } from "react-router-dom";
import "./sell.scss";
import {
  Icon,

} from "semantic-ui-react";
import { connect } from "react-redux";

function Sell(props) {
  let catArr = {
    Mobile: "Mobile",

    Vehicles: "Vehicles",

    PropertySale: "Property for Sale",

    PropertyRent: "Property for Rent",

    Electronics: "Electronics & Home Appliances",

    Bikes: "Bikes:",

    Business: "Business, Industrial & Agriculture",

    Services: "Services",

    Jobs: "Jobs:",

    Animals: "Animals",

    Furniture: "Furniture: & Home Decor",

    Fashion: "Fashion: & Beauty",

    Books: "Books, Sports & Hobbies",

    Kids: "Kids",
  };

  let subCat = {
    Mobile: ["Tablets", "Mobile Accessories", "Mobile"],
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

  let [filterCat, setFilterCat] = useState("");
  
  return (
    <div className="Sell">
      <h2>POST YOUR AD</h2>
      <div className="postCat">
        <div className="cac">
          <h4>CHOOSE A CATEGORY</h4>
        </div>
        <div className="categoreis">
          <div className="mainCat">
            {Object.values(catArr).length
              ? Object.values(catArr).map((a, i) => {
                  return (
                    <div
                      className="catmenu"
                      onClick={() => 
                        [setFilterCat(Object.keys(catArr)[i]),
                        props.setMainCat(a)
                      ]
                      }
                    >
                      <p>{Object.values(catArr)[i]}</p>
                      <Icon name="chevron right"/>
                    </div>
                  );
                })
              : null}
          </div>
          <div className="subCat">
            {filterCat && Object.values(subCat).length
              ? Object.values(subCat)
                  .filter((obj, i) => filterCat === Object.keys(subCat)[i])[0]
                  .map((a, i) => {
                    
                    return (
                      <div
                        className="catmenu"
                        onClick={() => [props.setSubCat(a),props.history.push('/post/form')]}
                      >
                        <p>{a}</p>
                      </div>
                    );
                  })
              : null}
          </div>
        </div>
      </div>
    </div>
  );
}
// const mapStateToProps = (state) => {
//   return {
//     // user: state.user,
//   };
// };
// const mapDispatchToProps = { LogIn };

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )
export default withRouter(Sell);
