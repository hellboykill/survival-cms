import React, { PureComponent } from "react";
import { Card, CardBody, Col } from "reactstrap";
import { AreaChart, Tooltip, Area, ResponsiveContainer, XAxis } from "recharts";
import TrendingUpIcon from "mdi-react/TrendingUpIcon";
import TrendingDownIcon from "mdi-react/TrendingDownIcon";
import PropTypes from "prop-types";
import config from "../../../../config/appConfig";
import axios from "axios";

var data = [
  { name: "6DaysAgo", PU: 0 },
  { name: "5DaysAgo", PU: 0 },
  { name: "4DaysAgo", PU: 0 },
  { name: "3DaysAgo", PU: 0 },
  { name: "2DaysAgo", PU: 0 },
  { name: "YesterDay", PU: 0 },
  { name: "Now", PU: 0 },
];

const CustomTooltip = ({ active, payload }) => {
  if (active) {
    return (
      <div className="dashboard__total-tooltip">
        <p className="label">{`${payload[0].value}`}</p>
      </div>
    );
  }

  return null;
};

CustomTooltip.propTypes = {
  active: PropTypes.bool,
  payload: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.number,
    })
  ),
};

CustomTooltip.defaultProps = {
  active: false,
  payload: null,
};

export default class PU extends PureComponent {
  static propTypes = {
    dir: PropTypes.string.isRequired,
  };

  constructor() {
    super();
    this.state = {
      activeIndex: 0,
    };
  }

  componentDidMount() {
    axios
      .post(config.base_url + config.url_gameStats, {
        userID: sessionStorage.getItem("userID"),
      })
      .then(function(response) {
        if (response.status === 200) {
          let result = response.data;
          if (result.status === "ok") {
            let PuResult = result.data.PU;
            if (Array.isArray(PuResult)) {
              for (let i = 0; i < PuResult.length; i++) {
                data[i].PU = PuResult[i];
              }
            }
          }
        }
      })
      .catch((err) => console.log(err));
  }

  conditionUpOrDown() {
    let firstHalf = 0;
    let lastHalf = 0;
    for (let i = 0; i < data.length; i++) {
      if (i < (data.length - 2) / 2) {
        firstHalf += data[i].PU;
      }
      if (i > (data.length - 2) / 2) {
        lastHalf += data[i].PU;
      }
    }
    if (firstHalf > lastHalf) return false;
    else return true;
  }

  render() {
    const { dir } = this.props;
    const { activeIndex } = this.state;
    const activeItem = data[activeIndex];

    return (
      <Col md={12} xl={3} lg={6} xs={12}>
        <Card>
          <CardBody className="dashboard__card-widget">
            <div className="card__title">
              <h4 className="bold-text">PU</h4>
              <h5 className="subhead">Today</h5>
            </div>
            <div className="dashboard__total dashboard__total--area">
              {(() => {
                if (this.conditionUpOrDown()) {
                  return <TrendingUpIcon className="dashboard__trend-icon" />;
                } else {
                  return <TrendingDownIcon className="dashboard__trend-icon" />;
                }
              })()}
              <p className="dashboard__total-stat">{this.props.pu}</p>
              <div className="dashboard__chart-container">
                <ResponsiveContainer height={70}>
                  <AreaChart
                    data={data}
                    margin={{ top: 0, left: 0, bottom: 0 }}
                  >
                    <Tooltip content={<CustomTooltip />} />
                    <XAxis hide reversed={dir === "rtl"} />
                    <Area
                      name="PU"
                      type="monotone"
                      dataKey="PU"
                      fill={this.conditionUpOrDown() ? "#4ce1b6" : "#c39fdf"}
                      stroke={this.conditionUpOrDown() ? "#4ce1b6" : "#c39fdf"}
                      fillOpacity={0.2}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </CardBody>
        </Card>
      </Col>
    );
  }
}
