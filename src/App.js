import { Component } from "react";
import "./styles.css";

import AirQuality from "./component/AirQuality";

class App extends Component {
  constructor(props) {
    super(props);
    this.ws = new WebSocket("wss://city-ws.herokuapp.com");
    this.state = {
      cityWiseAQIMap: {}
    };
  }

  updateCitiesState(citiesUpdate) {
    let cityWiseAQIMap = this.state.cityWiseAQIMap;
    citiesUpdate.forEach((city) => {
      let dateInTs = new Date().getTime();
      if (
        cityWiseAQIMap[city.city] &&
        cityWiseAQIMap[city.city]["currentAQI"] !== city.aqi
      ) {
        cityWiseAQIMap[city.city]["currentAQI"] = city.aqi;
        cityWiseAQIMap[city.city]["lastUpdatedAt"] = dateInTs;
        cityWiseAQIMap[city.city]["previousAQIs"].push({
          aqi: city.aqi,
          updatedAt: dateInTs
        });
      } else {
        cityWiseAQIMap[city.city] = {
          currentAQI: city.aqi,
          previousAQIs: [
            {
              aqi: city.aqi,
              updatedAt: dateInTs
            }
          ],
          lastUpdatedAt: dateInTs
        };
      }
    });
    this.setState({ cityWiseAQIMap: cityWiseAQIMap });
  }
  componentDidMount() {
    this.ws.onopen = () => {
      // on connecting, do nothing but log it to the console
      // console.log("connected");
    };

    this.ws.onmessage = (evt) => {
      // listen to data sent from the websocket server
      const message = JSON.parse(evt.data);
      // this.setState({ cities: message });
      this.updateCitiesState(message);
      // console.log(message);
    };

    this.ws.onclose = () => {
      // console.log("disconnected");
      // automatically try to reconnect on connection loss
    };
  }

  render() {
    return (
      <AirQuality
        cityWiseAQIMap={this.state.cityWiseAQIMap}
        currentSelectedCity={this.state.currentSelectedCity}
      />
    );
  }
}

export default App;
