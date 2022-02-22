import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import FormData from "form-data";
import { postProduct } from "../actions/productActions";
import { Map, Marker, GoogleApiWrapper } from "google-maps-react";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";

function Post() {
  const dispatch = useDispatch();
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const [address, setAddress] = useState("");
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");
  const [mapCenter, setMapCenter] = useState({
    lat: 10.8230989,
    lng: 106.6296638,
  });
  const [productForm, setProductForm] = useState({
    name: "",
    user: userInfo?._id,
    image: null,
    status: "",
    type: "",
    address: "",
    description: "",
    price: "",
    acreage: "",
    bedroom: "",
    toilet: "",
    countInStock: "",
  });
  const handleCreate = (e) => {
    e.preventDefault();
    console.log("product", productForm);
    const data = new FormData();
    data.append("name", productForm.name);
    data.append("user", productForm.user);
    data.append("status", productForm.status);
    data.append("type", productForm.type);
    data.append("address", productForm.address);
    data.append("description", productForm.description);
    data.append("price", productForm.price);
    data.append("acreage", productForm.acreage);
    data.append("bedroom", productForm.bedroom);
    data.append("toilet", productForm.toilet);
    data.append("countInStock", productForm.countInStock);
    data.append("image", productForm.image);
    console.log(data);
    const create = dispatch(postProduct(data));
    create.then((data) => {
      console.log(data);
    });
    resetForm();
  };

  const resetForm = () => {
    setProductForm({
      name: "",
      user: null,
      image: null,
      status: "",
      type: "",
      address: "",
      description: "",
      price: "",
      acreage: "",
      bedroom: "",
      toilet: "",
      countInStock: "",
    });
  };

  const handleChangedInput = (e) => {
    setProductForm({ ...productForm, [e.target.name]: e.target.value });
  };

  const handleChange = (address) => {
    // this.setState({ address });
    setAddress(address);
  };

  const handleSelect = (address) => {
    setAddress(address);
    geocodeByAddress(address)
      .then((results) => getLatLng(results[0]))
      .then((latLng) => {
        console.log("lat", latLng.lat);
        console.log("lng", latLng.lng);
        setMapCenter(latLng);
      })
      .catch((error) => console.error("Error", error));
  };

  return (
    <div>
      <div className="row" style={{ width: "100%" }}>
        <div className="row center" style={{ width: "100%" }}>
          <form enctype="multipart/form-data">
            <h1 style={{ textAlign: "center" }}>Bất Động Sản Phát Lộc</h1>

            <div class="contentform">
              <div id="sendmessage">Đăng bài</div>

              <div class="leftcontact">
                <div class="form-group">
                  <p>
                    Tên Tài Sản<span>*</span>
                  </p>
                  <span class="icon-case">
                    <i class="fa fa-male"></i>
                  </span>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    value={productForm.name}
                    onChange={handleChangedInput}
                    data-rule="required"
                  />
                  <div class="validation"></div>
                </div>

                <div class="form-group">
                  <p>
                    Loại <span>*</span>
                  </p>
                  <span class="icon-case">
                    <i class="fa fa-user"></i>
                  </span>
                  <input
                    type="text"
                    name="type"
                    id="type"
                    value={productForm.type}
                    onChange={handleChangedInput}
                  />
                  <div class="validation"></div>
                </div>

                <div class="form-group">
                  <p>
                    Trạng Thái <span>*</span>
                  </p>
                  <span class="icon-case">
                    <i class="fa fa-envelope-o"></i>
                  </span>
                  <input
                    type="text"
                    name="status"
                    id="status"
                    value={productForm.status}
                    onChange={handleChangedInput}
                  />
                  <div class="validation"></div>
                </div>

                <div class="form-group">
                  <p>
                    Giá <span>*</span>
                  </p>
                  <span class="icon-case">
                    <i class="fa fa-home"></i>
                  </span>
                  <input
                    type="number"
                    name="price"
                    id="price"
                    value={productForm.price}
                    onChange={handleChangedInput}
                  />
                  <div class="validation"></div>
                </div>

                <div class="form-group">
                  <p>
                    Diện tích <span>*</span>
                  </p>
                  <span class="icon-case">
                    <i class="fa fa-location-arrow"></i>
                  </span>
                  <input
                    type="number"
                    name="acreage"
                    id="acreage"
                    value={productForm.acreage}
                    onChange={handleChangedInput}
                  />
                  <div class="validation"></div>
                </div>

                <div class="form-group">
                  <p>
                    Phòng Ngủ <span>*</span>
                  </p>
                  <span class="icon-case">
                    <i class="fa fa-map-marker"></i>
                  </span>
                  <input
                    type="number"
                    name="bedroom"
                    id="bedroom"
                    value={productForm.bedroom}
                    onChange={handleChangedInput}
                  />
                  <div class="validation"></div>
                </div>
              </div>

              <div class="rightcontact">
                <div class="form-group">
                  <p>
                    Phòng Vệ Sinh <span>*</span>
                  </p>
                  <span class="icon-case">
                    <i class="fa fa-building-o"></i>
                  </span>
                  <input
                    type="number"
                    name="toilet"
                    id="toilet"
                    value={productForm.toilet}
                    onChange={handleChangedInput}
                  />
                  <div class="validation"></div>
                </div>

                <div class="form-group">
                  <p>
                    Số Lượng <span>*</span>
                  </p>
                  <span class="icon-case">
                    <i class="fa fa-phone"></i>
                  </span>
                  <input
                    type="text"
                    name="countInStock"
                    id="countInStock"
                    value={productForm.countInStock}
                    onChange={handleChangedInput}
                  />
                  <div class="validation"></div>
                </div>

                <div class="form-group">
                  <p>
                    Hình Ảnh <span>*</span>
                  </p>
                  <span class="icon-case">
                    <i class="fa fa-info"></i>
                  </span>
                  <input
                    type="file"
                    name="image"
                    id="image"
                    onChange={(e) => {
                      e.preventDefault();
                      const file = e.target.files[0];
                      setProductForm({ ...productForm, image: file });
                      console.log(file);
                    }}
                  />
                  <div class="validation"></div>
                </div>

                <div class="form-group">
                  <p>
                    Mô tả chi tiết <span>*</span>
                  </p>
                  <span class="icon-case">
                    <i class="fa fa-comment-o"></i>
                  </span>
                  <input
                    type="text"
                    name="description"
                    id="description"
                    value={productForm.description}
                    onChange={handleChangedInput}
                  />
                  <div class="validation"></div>
                </div>
                <div class="form-group">
                  <p>
                    Địa chỉ <span>*</span>
                  </p>
                  <span class="icon-case">
                    <i class="fa fa-comment-o"></i>
                  </span>
                  <input
                    type="text"
                    name="address"
                    id="address"
                    value={productForm.address}
                    onChange={handleChangedInput}
                  />
                  <div class="validation"></div>
                </div>

                {/* <div class="form-group">
                <p>
                  Message <span>*</span>
                </p>
                <span class="icon-case">
                  <i class="fa fa-comments-o"></i>
                </span>
                <textarea
                  name="message"
                  rows="14"
                  data-rule="required"
                  data-msg="Vérifiez votre saisie sur les champs : Le champ 'Message' doit être renseigné."
                ></textarea>
                <div class="validation"></div>
              </div> */}
              </div>
            </div>
            <button onClick={handleCreate} class="bouton-contact">
              Đăng Bài
            </button>
          </form>
        </div>
      </div>
      <div className="row" style={{ width: "100%" }}>
        <div className="row center">
          <div id="googleMaps">
            <PlacesAutocomplete
              value={address}
              onChange={handleChange}
              onSelect={handleSelect}
            >
              {({
                getInputProps,
                suggestions,
                getSuggestionItemProps,
                loading,
              }) => (
                <div>
                  <input
                    {...getInputProps({
                      placeholder: "Search Places ...",
                      className: "location-search-input",
                    })}
                  />
                  <div className="autocomplete-dropdown-container">
                    {loading && <div>Loading...</div>}
                    {suggestions.map((suggestion) => {
                      const className = suggestion.active
                        ? "suggestion-item--active"
                        : "suggestion-item";
                      // inline style for demonstration purpose
                      const style = suggestion.active
                        ? { backgroundColor: "#fafafa", cursor: "pointer" }
                        : { backgroundColor: "#ffffff", cursor: "pointer" };
                      return (
                        <div
                          {...getSuggestionItemProps(suggestion, {
                            className,
                            style,
                          })}
                        >
                          <span>{suggestion.description}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </PlacesAutocomplete>
            <Map
              google={window.google}
              apiKey={"AIzaSyDnMQ1A8AKcQcbuAsiZWVaSt1j_MyB6kCs"}
              initialCenter={{
                lat: mapCenter.lat,
                lng: mapCenter.lng,
              }}
              center={{
                lat: mapCenter.lat,
                lng: mapCenter.lng,
              }}
            >
              <Marker
                position={{
                  lat: mapCenter.lat,
                  lng: mapCenter.lng,
                }}
              />
            </Map>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyDnMQ1A8AKcQcbuAsiZWVaSt1j_MyB6kCs",
})(Post);
