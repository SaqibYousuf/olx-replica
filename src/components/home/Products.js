import React, { useEffect, useState } from "react";
import truck from "../../Imgaes/truck.webp";
import { Icon } from "semantic-ui-react";
import InfiniteScroll from "react-infinite-scroll-component";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { getSingleData } from "./../store/middleware/middleware";
function Product(props) {

  function fetchMoreData() {

    setTimeout(() => {
  
      props.setArr(props.arr.concat(Array.from({ length: 20 })));
    }, 1500);
  }
  useEffect(() => {
    props.getSingleData();
  }, []);
  
  return (
    <>
    
      {
      props.arr
        .map((a, index) => (
          <div
            className="Product"
            key={index}
            onClick={() => [
              props.getSingleData(a),
              props.history.push(`/product/view/${a.key}`),
            ]}
          >
            <div
              className="productImage"
              style={{ backgroundImage: `url(${a.imageURL[0]})` }}
            >
              <div className="feature">
                <Icon name="heart outline" />
                {/* <p>FEATURED</p> */}
              </div>
            </div>
            <div className="detail">
              <h3>RS {a.price}</h3>
              <p className="Modal">{a.descript}</p>
              {/* <p className="des">{a.descript}</p> */}
              <p className="moment">{a.moment}</p>
            </div>
          </div>
        ))}
      {/* </InfiniteScroll> */}
    </>
  );

 
}

const mapStateToProps = (state) => {
  return {
    singleData: state.singleData,
  };
};
const mapDispatchToProps = { getSingleData };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Product));
