import React, { PureComponent } from 'react';
import { Card, CardBody, Col } from 'reactstrap';
import {
  AreaChart, Tooltip, Area, ResponsiveContainer, XAxis,
} from 'recharts';
import TrendingDownIcon from 'mdi-react/TrendingDownIcon';
import TrendingUpIcon from 'mdi-react/TrendingUpIcon';
import PropTypes from 'prop-types';
import config from '../../../../config/appConfig';
import axios from 'axios';

const timeOfDay = 86400000;
const daySelected = [];
for(let i = 6; i >=0; i--) {
  daySelected.push(new Date(new Date().getTime() - timeOfDay * i).toISOString().slice(0, 10));
}
// var data = [];
// daySelected.forEach(e => {
//   let dayChoose = {};
//   dayChoose[e] = 0;
//   data.push(dayChoose);
// });
var data = [{ name: '6DaysAgo', DAU: 0},
  { name: '5DaysAgo', DAU: 0 },
  { name: '4DaysAgo', DAU: 0 },
  { name: '3DaysAgo', DAU: 0 },
  { name: '2DaysAgo', DAU: 0 },
  { name: 'YesterDay', DAU: 0 },
  { name: 'Now', DAU: 0 }];
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
  payload: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.number,
  })),
};

CustomTooltip.defaultProps = {
  active: false,
  payload: null,
};

export default class DAU extends PureComponent {
  static propTypes = {
    dir: PropTypes.string.isRequired,
  };

  constructor() {
    super();
    this.state = {
      activeIndex: 0,  
    };
  };

  componentDidMount() {
    axios
    .post(config.base_url + config.url_gameStats, {
      userID: sessionStorage.getItem('userID'),
    })
    .then(function(response) {
      if (response.status === 200) {
        let result = response.data;
        if (result.status === 'ok') {
          let DauResult = result.data.DAU;
          if(Array.isArray(DauResult)) {
            for(let i = 0; i < DauResult.length; i++) {
              data[i].DAU = DauResult[i];
           //   data[i][daySelected[i]] = data[i].DAU;
            }
            // for(let i = 0; i < DauResult.length; i++) {
            //   delete data[i].DAU;
            // }
        }
        }
      }})
    .catch(err => console.log(err))
  };

  conditionUpOrDown() {
    let firstHalf = 0;
    let lastHalf = 0;
    for(let i = 0; i < data.length; i ++)
    {
      if(i < (data.length - 2) / 2)
      {
        firstHalf += data[i].DAU;
      }
      if(i > (data.length - 2)  / 2)
      {
        lastHalf += data[i].DAU;
      }
    }
    if(firstHalf > lastHalf) return false;
    else return true;
  }
  render() {
    const { dir } = this.props;
    const { activeIndex } = this.state;
    //const activeItem = data[activeIndex];

    return (
      <Col md={12} xl={3} lg={6} xs={12}>
        <Card>
          <CardBody className="dashboard__card-widget">
            <div className="card__title">
              <h4 className="bold-text">DAU</h4>
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
              <p className="dashboard__total-stat">
                {this.props.dau}
              </p>
              <div className="dashboard__chart-container">
                <ResponsiveContainer height={70}>
                  <AreaChart data={data} margin={{ top: 0, left: 0, bottom: 0 }}>
                    <Tooltip content={<CustomTooltip />} />
                    <XAxis
                      hide
                      reversed={dir === 'rtl'}
                    />
                    <Area
                      name="DAU"
                      type="monotone"
                      dataKey="DAU"
                      fill= {this.conditionUpOrDown()?"#4ce1b6":"#c39fdf"}
                      stroke= {this.conditionUpOrDown()?"#4ce1b6":"#c39fdf"}
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
