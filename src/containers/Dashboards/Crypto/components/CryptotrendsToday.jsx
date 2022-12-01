/* eslint-disable react/no-array-index-key */
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { PieChart, Pie, Tooltip, Legend, ResponsiveContainer,Label } from 'recharts';
import { withTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import Panel from '../../../../shared/components/Panel';

import getTooltipStyles from '../../../../shared/helpers';

const data01 = [
  { name: 'Bitcoin', value: 20432, fill: '#4ce1b6' },
  { name: 'Ethereum', value: 15432, fill: '#70bbfd' },
  { name: 'Bitcoin Cash', value: 12934, fill: '#f6da6e' },
  { name: 'Ripple', value: 9934, fill: '#ff4861' },
];

const COLORS = [
  '#0088FE',
  '#00C49F',
  '#FFBB28',
  '#FF8042',
  '#9f68c1',
  '#80f818',
  '#d91a9e',
  '#f97a9b',
  '#e1829b',
  '#836d3f',

  '#02a8b3',
  '#e94af3',
  '#f91422',
  '#ec4478',
  '#34c3b2',
  '#c6364d',
  '#fd5277',
  '#96e485',
  '#c79c5a',

  '#55648f',
  '#e5327d',
  '#bcdc19',
  '#48f866',
  '#0a22d7',
  '#d2087e',
  '#4963aa',
  '#137e22',
  '#4d082b',
  '#404f4b',
];

const style = (dir) => {
  const left = dir === 'ltr' ? { left: 0 } : { right: 0 };
  return {
    ...left,
    width: 150,
    lineHeight: '24px',
    position: 'absolute',
  };
};

const renderLegend = ({ payload }) => (
  <ul className="dashboard__chart-legend">
    {payload.map((entry, index) => (
      <li key={`item-${index}`}>
        <span style={{ backgroundColor: entry.color }} />
        {entry.value}
      </li>
    ))}
  </ul>
);

renderLegend.propTypes = {
  payload: PropTypes.arrayOf(
    PropTypes.shape({
      color: PropTypes.string,
      vslue: PropTypes.string,
    })
  ).isRequired,
};

class CryptotrendsToday extends PureComponent {
  static propTypes = {
    t: PropTypes.func.isRequired,
    dir: PropTypes.string.isRequired,
    themeName: PropTypes.string.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      x: 0,
      y: 0,
    };
  }

  onMouseMove = (e) => {
    const { dir } = this.props;
    if (e.tooltipPosition) {
      this.setState({
        x: dir === 'ltr' ? e.tooltipPosition.x : e.tooltipPosition.x / 10,
        y: e.tooltipPosition.y,
      });
    }
  };

  render() {
    const { t, dir, themeName } = this.props;
    const { x, y } = this.state;

    return (
      <Panel lg={12} xl={4} xs={12} title="IAP Today" subhead="">
        <div className="dashboard__stat dashboard__stat--budget">
          <div className="dashboard__stat-main">
            <p className="dashboard__stat-main-title">Total IAP</p>
            <p className="dashboard__stat-main-number">${this.props.total}</p>
            <hr />
          </div>
        </div>
        <div dir={dir}>
          <ResponsiveContainer
            className="dashboard__chart-pie dashboard__chart-pie--crypto"
            height={360}
          >
            {/* x={cx} y={cy} dy={8} */}
           
            <PieChart className="dashboard__chart-pie-container">
           
              <Tooltip
                formatter={(value) => `$${value.toFixed(2)}`}
                position={{ x, y }}
                {...getTooltipStyles(themeName)}
              />
              <Pie
                data={this.props.lsCountryIAP.map((item, index) => {
                  item.fill = COLORS[index % COLORS.length];
                  return item;
                })}
                dataKey="total"
                cy={175}
                innerRadius={100}
                outerRadius={160}
                label={(value) => value.name}
                onMouseMove={this.onMouseMove}
              >

              {/* <Label  position="center"> </Label> */}
              </Pie>

              {/* <Legend
                layout="vertical"
                verticalAlign="bottom"
                wrapperStyle={style(dir)}
                content={renderLegend}
              /> */}
            </PieChart>
          </ResponsiveContainer>
        </div>
      </Panel>
    );
  }
}

export default connect((state) => ({ themeName: state.theme.className }))(
  withTranslation('common')(CryptotrendsToday)
);
