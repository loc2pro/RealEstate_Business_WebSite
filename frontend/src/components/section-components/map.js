import React, { Component } from "react";
import { Link } from "react-router-dom";
import parse from "html-react-parser";

class Map extends Component {
  render() {
    let publicUrl = process.env.PUBLIC_URL + "/";

    return (
      <div className="google-map mb-120">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.856369942459!2d106.68526211411674!3d10.82230176130618!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3174deb3ef536f31%3A0x8b7bb8b7c956157b!2zVHLGsOG7nW5nIMSQ4bqhaSBo4buNYyBDw7RuZyBuZ2hp4buHcCBUUC5IQ00!5e0!3m2!1svi!2s!4v1652455295858!5m2!1svi!2s"
          width="100%"
          height="100%"
          frameBorder={0}
          allowFullScreen
          aria-hidden="false"
          tabIndex={0}
        />
      </div>
    );
  }
}

export default Map;
