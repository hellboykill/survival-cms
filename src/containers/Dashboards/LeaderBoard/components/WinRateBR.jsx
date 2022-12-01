import React from 'react';
import PropTypes from 'prop-types';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Brush,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import Panel from '../../../../shared/components/PanelWithFuntion';
import { Button} from 'reactstrap';
//import getTooltipStyles from '../../../../shared/helpers';

 const dataSet = [{"name":"Stage_1","rate":97.47},{"name":"Stage_2","rate":66.53},{"name":"Stage_3","rate":63.55},{"name":"Stage_4","rate":45},{"name":"Stage_5","rate":63.43},{"name":"Stage_6","rate":41.57},{"name":"Stage_7","rate":35.55},{"name":"Stage_8","rate":41.01},{"name":"Stage_9","rate":29.22},{"name":"Stage_10","rate":50.89},{"name":"Stage_11","rate":30.02},{"name":"Stage_12","rate":45.73},{"name":"Stage_13","rate":59.15},{"name":"Stage_14","rate":47.91},{"name":"Stage_15","rate":40.53},{"name":"Stage_16","rate":48.59},{"name":"Stage_17","rate":24.88},{"name":"Stage_18","rate":27.08},{"name":"Stage_19","rate":36.18},{"name":"Stage_20","rate":45},{"name":"Stage_21","rate":7.12},{"name":"Stage_22","rate":33.39},{"name":"Stage_23","rate":71.74},{"name":"Stage_24","rate":43.4},{"name":"Stage_25","rate":50.62},{"name":"Stage_26","rate":29.63},{"name":"Stage_27","rate":13.24},{"name":"Stage_28","rate":8.25},{"name":"Stage_29","rate":63.75},{"name":"Stage_30","rate":76.72},{"name":"Stage_31","rate":66.78},{"name":"Stage_32","rate":25.15},{"name":"Stage_33","rate":46.52},{"name":"Stage_34","rate":33.21},{"name":"Stage_35","rate":44.04},{"name":"Stage_36","rate":4.15},{"name":"Stage_37","rate":36.46},{"name":"Stage_38","rate":56.06},{"name":"Stage_39","rate":33.66},{"name":"Stage_40","rate":51.56},{"name":"Stage_41","rate":11.34},{"name":"Stage_42","rate":40.07},{"name":"Stage_43","rate":32.86},{"name":"Stage_44","rate":13.24},{"name":"Stage_45","rate":56.23},{"name":"Stage_46","rate":31.62},{"name":"Stage_47","rate":8.94},{"name":"Stage_48","rate":29.55},{"name":"Stage_49","rate":63.09},{"name":"Stage_50","rate":17.55},{"name":"Stage_51","rate":45.67},{"name":"Stage_52","rate":38.42},{"name":"Stage_53","rate":38.99},{"name":"Stage_54","rate":11.83},{"name":"Stage_55","rate":6.13},{"name":"Stage_56","rate":9.32},{"name":"Stage_57","rate":15.29},{"name":"Stage_58","rate":29.59},{"name":"Stage_59","rate":12.81},{"name":"Stage_60","rate":1.7},{"name":"Stage_61","rate":22.13},{"name":"Stage_62","rate":47.81},{"name":"Stage_63","rate":36.94},{"name":"Stage_64","rate":31.21},{"name":"Stage_65","rate":26.7},{"name":"Stage_66","rate":22.06},{"name":"Stage_67","rate":42.09},{"name":"Stage_68","rate":19.65},{"name":"Stage_69","rate":15},{"name":"Stage_70","rate":10.97},{"name":"Stage_71","rate":10.11},{"name":"Stage_72","rate":17.36},{"name":"Stage_73","rate":13.95},{"name":"Stage_74","rate":18.27},{"name":"Stage_75","rate":7.6},{"name":"Stage_76","rate":15.81},{"name":"Stage_77","rate":10.07},{"name":"Stage_78","rate":14.97},{"name":"Stage_79","rate":31.75},{"name":"Stage_80","rate":10.89},{"name":"Stage_81","rate":16.76},{"name":"Stage_82","rate":63.14},{"name":"Stage_83","rate":19.93},{"name":"Stage_84","rate":0.84},{"name":"Stage_85","rate":56.65},{"name":"Stage_86","rate":27.44},{"name":"Stage_87","rate":18.24},{"name":"Stage_88","rate":44.12},{"name":"Stage_89","rate":22.68},{"name":"Stage_90","rate":3.29},{"name":"Stage_91","rate":40.17},{"name":"Stage_92","rate":39.01},{"name":"Stage_93","rate":45.86},{"name":"Stage_94","rate":27.29},{"name":"Stage_95","rate":37.57},{"name":"Stage_96","rate":28.45},{"name":"Stage_97","rate":23.77},{"name":"Stage_98","rate":17.45},{"name":"Stage_99","rate":23.31},{"name":"Stage_100","rate":10.68},{"name":"Stage_101","rate":11.97},{"name":"Stage_102","rate":3.18},{"name":"Stage_103","rate":14.9},{"name":"Stage_104","rate":23.44},{"name":"Stage_105","rate":17.13},{"name":"Stage_106","rate":19.96},{"name":"Stage_107","rate":18.32},{"name":"Stage_108","rate":12.9},{"name":"Stage_109","rate":7.5},{"name":"Stage_110","rate":16.02},{"name":"Stage_111","rate":18.16},{"name":"Stage_112","rate":13.19},{"name":"Stage_113","rate":26.46},{"name":"Stage_114","rate":2.39},{"name":"Stage_115","rate":16.62},{"name":"Stage_116","rate":35.35},{"name":"Stage_117","rate":21.58},{"name":"Stage_118","rate":2.29},{"name":"Stage_119","rate":15.29},{"name":"Stage_120","rate":1.71},{"name":"Stage_121","rate":40.51},{"name":"Stage_122","rate":13.63},{"name":"Stage_123","rate":4.46},{"name":"Stage_124","rate":9.23},{"name":"Stage_125","rate":18.69},{"name":"Stage_126","rate":3.01},{"name":"Stage_127","rate":12.44},{"name":"Stage_128","rate":36.09},{"name":"Stage_129","rate":23.56},{"name":"Stage_130","rate":21.67},{"name":"Stage_131","rate":40.29},{"name":"Stage_132","rate":10.54},{"name":"Stage_133","rate":5.12},{"name":"Stage_134","rate":19.64},{"name":"Stage_135","rate":30.38},{"name":"Stage_136","rate":16.28},{"name":"Stage_137","rate":52.08},{"name":"Stage_138","rate":14.18},{"name":"Stage_139","rate":47.92},{"name":"Stage_140","rate":14.29},{"name":"Stage_141","rate":15.04},{"name":"Stage_142","rate":37.21},{"name":"Stage_143","rate":16.46},{"name":"Stage_144","rate":4.02},{"name":"Stage_145","rate":81.82},{"name":"Stage_146","rate":43.33},{"name":"Stage_147","rate":60.87},{"name":"Stage_148","rate":38.1},{"name":"Stage_149","rate":30.95},{"name":"Stage_150","rate":16.98},{"name":"Stage_151","rate":81.25},{"name":"Stage_152","rate":47.62},{"name":"Stage_153","rate":61.11},{"name":"Stage_154","rate":66.67},{"name":"Stage_155","rate":66.67},{"name":"Stage_156","rate":23.08},{"name":"Stage_157","rate":9.26},{"name":"Stage_158","rate":17.14},{"name":"Stage_159","rate":16},{"name":"Stage_160","rate":40.74},{"name":"Stage_161","rate":54.55},{"name":"Stage_162","rate":81.82},{"name":"Stage_163","rate":71.43},{"name":"Stage_164","rate":21.43},{"name":"Stage_165","rate":33.33},{"name":"Stage_166","rate":30.77},{"name":"Stage_167","rate":37.5},{"name":"Stage_168","rate":71.43},{"name":"Stage_169","rate":100},{"name":"Stage_170","rate":100},{"name":"Stage_171","rate":100},{"name":"Stage_172","rate":100},{"name":"Stage_173","rate":71.43},{"name":"Stage_174","rate":66.67},{"name":"Stage_175","rate":80},{"name":"Stage_176","rate":66.67},{"name":"Stage_177","rate":75},{"name":"Stage_178","rate":80},{"name":"Stage_179","rate":83.33},{"name":"Stage_180","rate":58.33},{"name":"Stage_181","rate":45.45},{"name":"Stage_182","rate":12.5},{"name":"Stage_183","rate":62.5},{"name":"Stage_184","rate":100},{"name":"Stage_185","rate":42.86},{"name":"Stage_186","rate":12.5}];
// var dataSet = data.map(item=>{
//   item.rate = Math.round((item.win / item.total) * 100 ) ;
//   return item;
// })

const brush = (theme) => {
  if (theme === 'theme-light') {
    return '#f2f4f7';
  }
  return '#38373f';
};



const toPercent = (decimal) => {
	return `${decimal}%`;
};

const renderTooltipContent = (o) => {

  


	const { payload, label } = o;
 //const total = payload.reduce((result, entry) => (result + entry.value), 0);
// console.log(o);
// console.log(payload);
 if(payload.length === 0)
  return '';
 else
 {
  return (
  	<div className="customized-tooltip-content">
    	<p ><b>{`${label} `}</b></p>
      <ul className="list">
          {/* <li style={{color: '#0088FE'}}>
            {`Total: ${payload[0].payload.Total} `}
          </li>
          <li style={{color: '#FF8042'}}>
            {`Win: ${payload[0].payload.Win} `}
          </li> */}
	        <li >
            {`${payload[0].name}: ${payload[0].value}% `}
          </li>
      </ul>
    </div>
  );

  };
} 


const BtcEth = ({ theme, dir }) => (
  <Panel
    xl={12}
    lg={12}
    md={12}
    xs={12}
    title="Level WinRate Space Shooter"
    subhead="Tỷ lệ WinRate   "
  >
    <div dir="ltr">
  
      <ResponsiveContainer height={350} className="dashboard__area">
        <AreaChart  data={dataSet} margin={{ top: 20, left: -15, bottom: 20 }}> 
        {/* <AreaChart   stackOffset="expand" data={dataSet} margin={{ top: 20, left: -15, bottom: 20 }}>  */}
       
          <XAxis dataKey="name" tickLine={false} reversed={dir === 'rtl'} />
          <YAxis
            tickFormatter={toPercent}
            orientation={dir === 'rtl' ? 'right' : 'left'}
          />
          <Tooltip 
           content={renderTooltipContent} />
          <Legend />
          <CartesianGrid />
          <Brush
            dataKey="name"
            height={12}
            stroke={brush(theme)}
            fill={brush(theme)}
          />
          {/* <Area
            name="BTC"
            type="monotone"
            dataKey="eth"
            fill="#4ce1b6"
            stroke="#4ce1b6"
            fillOpacity={0.2}
          /> */}
          <Area
            name="WinRate"
            type="monotone"
            dataKey="rate"
            // stackId="1"
            fill="#70bbfd"
            stroke="#70bbfd"
            fillOpacity={0.2}
          />
           {/* <Area
            name="Total"
            type="monotone"
            dataKey="lose"
            stackId="1"
            fill="#70bbfd"
            stroke="#70bbfd"
            fillOpacity={0.2}
          /> */}
        </AreaChart>
      </ResponsiveContainer>
    </div>
  </Panel>
);

BtcEth.propTypes = {
  theme: PropTypes.string.isRequired,
  dir: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired
};

export default BtcEth;
