import { Component } from "react";
import CityAirQuality from "./CityAirQuality";

import CityAQILineChart from "./CityAQILineChart";
import CityAQITinyLineChart from "./CityAQITinyLineChart";

class AirQuality extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentSelectedCity: ""
    };
    this.updateSelectedCity = this.updateSelectedCity.bind(this);
  }

  getCities() {
    let cityWiseAQIMap = this.props.cityWiseAQIMap;
    // console.log("cityWiseAQIMap :: ", cityWiseAQIMap);
    let cities = [];
    for (let city in cityWiseAQIMap) {
      cities.push({
        city,
        aqi: cityWiseAQIMap[city].currentAQI,
        lastUpdatedAt: cityWiseAQIMap[city].lastUpdatedAt
      });
    }
    // console.log("cities :: ", cities);
    return cities;
  }
  updateSelectedCity(city) {
    this.setState({ currentSelectedCity: city });
  }

  getAQIDataForCity(city) {
    if (!city) return [];
    let cityWiseAQIMap = this.props.cityWiseAQIMap;
    return cityWiseAQIMap[city];
  }

  render() {
    return (
      <div>
        <h2>Live City-Wise AQI Tracker</h2>
        <h4>
          <i>
            NOTE: Click on the City row to see the Statistics of the City as
            Graph (Line Chart)
          </i>
        </h4>
        <table>
          <thead>
            <tr>
              <th>City</th>
              <th>AQI</th>
              <th>Last updated</th>
            </tr>
          </thead>
          <tbody>
            {this.getCities().map((city, index) => (
              <CityAirQuality
                city={city.city}
                aqi={city.aqi}
                lastUpdatedAt={city.lastUpdatedAt}
                key={city.city}
                onClickHandler={this.updateSelectedCity}
              />
            ))}
          </tbody>
        </table>
        {this.state.currentSelectedCity && (
          <>
            <h2 className="selectedCity">
              Stats for City - {this.state.currentSelectedCity}
            </h2>
            <CityAQILineChart
              cityAQIData={this.getAQIDataForCity(
                this.state.currentSelectedCity
              )}
              city={this.state.currentSelectedCity}
            />
          </>
        )}
      </div>
    );
  }
}

export default AirQuality;
