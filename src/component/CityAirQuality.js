import { Component } from "react";
import ReactTimeAgo from "react-time-ago";

class CityAirQuality extends Component {
  constructor(props) {
    super(props);
  }

  getColor() {
    let aqi = this.props.aqi;
    let classObj = {
      color: null,
      level: null,
      healthImplication: null,
      CautionaryStatement: null
    };
    if (aqi >= 0 && aqi <= 50) {
      return {
        color: "#5ba84f",
        level: "Good",
        healthImplication:
          "Air quality is considered satisfactory, and air pollution poses little or no risk",
        CautionaryStatement: null
      };
    } else if (aqi > 50 && aqi <= 100) {
      return {
        color: "#a3c853",
        level: "Satisfactory",
        healthImplication:
          "Air quality is acceptable; however, for some pollutants there may be a moderate health concern for a very small number of people who are unusually sensitive to air pollution.",
        CautionaryStatement:
          "Active children and adults, and people with respiratory disease, such as asthma, should limit prolonged outdoor exertion."
      };
    } else if (aqi > 100 && aqi <= 200) {
      return {
        color: "#fdef35",
        level: "Moderate",
        healthImplication:
          "Members of sensitive groups may experience health effects. The general public is not likely to be affected.",
        CautionaryStatement:
          "Active children and adults, and people with respiratory disease, such as asthma, should limit prolonged outdoor exertion."
      };
    } else if (aqi > 200 && aqi <= 300) {
      return {
        color: "#f09c33",
        level: "Poor",
        healthImplication:
          "Everyone may begin to experience health effects; members of sensitive groups may experience more serious health effects",
        CautionaryStatement:
          "Active children and adults, and people with respiratory disease, such as asthma, should avoid prolonged outdoor exertion; everyone else, especially children, should limit prolonged outdoor exertion"
      };
    } else if (aqi > 300 && aqi <= 400) {
      return {
        color: "#e74d33",
        level: "Very Poor",
        healthImplication:
          "Health warnings of emergency conditions. The entire population is more likely to be affected.",
        CautionaryStatement:
          "Active children and adults, and people with respiratory disease, such as asthma, should avoid all outdoor exertion; everyone else, especially children, should limit outdoor exertion."
      };
    } else if (aqi > 400) {
      return {
        color: "#b03823",
        level: "Severe",
        healthImplication:
          "Health alert: everyone may experience more serious health effects",
        CautionaryStatement: "Everyone should avoid all outdoor exertion"
      };
    }
    return classObj;
  }

  render() {
    return (
      <tr
        style={{ background: this.getColor().color }}
        onClick={() => this.props.onClickHandler(this.props.city)}
      >
        <td>{this.props.city}</td>
        <td>{this.props.aqi.toFixed(2)}</td>
        <td>
          <ReactTimeAgo
            date={this.props.lastUpdatedAt}
            locale="en"
            timeStyle="round"
          />
        </td>
      </tr>
    );
  }
}

export default CityAirQuality;
