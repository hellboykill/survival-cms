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

// const data = [{"name":"Stage_0","total":4830,"win":4057},{"name":"Stage_1","total":2054,"win":1416},{"name":"Stage_2","total":4511,"win":3846},{"name":"Stage_3","total":2381,"win":1660},{"name":"Stage_4","total":1272,"win":542},{"name":"Stage_5","total":3037,"win":2363},{"name":"Stage_6","total":1437,"win":802},{"name":"Stage_7","total":4616,"win":3839},{"name":"Stage_8","total":2037,"win":1302},{"name":"Stage_9","total":1074,"win":448},{"name":"Stage_10","total":1736,"win":974},{"name":"Stage_11","total":4541,"win":3938},{"name":"Stage_12","total":2209,"win":1518},{"name":"Stage_13","total":2717,"win":1935},{"name":"Stage_14","total":2021,"win":1359},{"name":"Stage_15","total":4937,"win":4264},{"name":"Stage_16","total":2476,"win":1833},{"name":"Stage_17","total":1442,"win":678},{"name":"Stage_18","total":3934,"win":3303},{"name":"Stage_19","total":1412,"win":793},{"name":"Stage_20","total":2777,"win":2037},{"name":"Stage_21","total":3277,"win":2592},{"name":"Stage_22","total":4505,"win":3892},{"name":"Stage_23","total":3409,"win":2650},{"name":"Stage_24","total":2199,"win":1485},{"name":"Stage_25","total":3439,"win":2673},{"name":"Stage_26","total":4926,"win":4188},{"name":"Stage_27","total":3446,"win":2752},{"name":"Stage_28","total":1281,"win":555},{"name":"Stage_29","total":2767,"win":2162},{"name":"Stage_30","total":1720,"win":1044},{"name":"Stage_31","total":2740,"win":2058},{"name":"Stage_32","total":1575,"win":914},{"name":"Stage_33","total":4733,"win":4070},{"name":"Stage_34","total":3121,"win":2411},{"name":"Stage_35","total":1189,"win":446},{"name":"Stage_36","total":1011,"win":351},{"name":"Stage_37","total":1512,"win":883},{"name":"Stage_38","total":1126,"win":377},{"name":"Stage_39","total":3474,"win":2817},{"name":"Stage_40","total":3791,"win":3141},{"name":"Stage_41","total":3419,"win":2650},{"name":"Stage_42","total":1263,"win":552},{"name":"Stage_43","total":4828,"win":4162},{"name":"Stage_44","total":1444,"win":828},{"name":"Stage_45","total":4006,"win":3278},{"name":"Stage_46","total":4787,"win":4144},{"name":"Stage_47","total":2998,"win":2305},{"name":"Stage_48","total":2217,"win":1601},{"name":"Stage_49","total":4803,"win":4120},{"name":"Stage_50","total":2986,"win":2278},{"name":"Stage_51","total":2135,"win":1462},{"name":"Stage_52","total":3395,"win":2696},{"name":"Stage_53","total":4722,"win":4088},{"name":"Stage_54","total":2689,"win":2086},{"name":"Stage_55","total":4023,"win":3358},{"name":"Stage_56","total":3243,"win":2505},{"name":"Stage_57","total":3890,"win":3188},{"name":"Stage_58","total":3705,"win":3052},{"name":"Stage_59","total":3265,"win":2518},{"name":"Stage_60","total":1100,"win":395},{"name":"Stage_61","total":1511,"win":882},{"name":"Stage_62","total":1173,"win":488},{"name":"Stage_63","total":3279,"win":2672},{"name":"Stage_64","total":4100,"win":3426},{"name":"Stage_65","total":3402,"win":2713},{"name":"Stage_66","total":4212,"win":3578},{"name":"Stage_67","total":3468,"win":2756},{"name":"Stage_68","total":2736,"win":2044},{"name":"Stage_69","total":4590,"win":3832},{"name":"Stage_70","total":992,"win":231},{"name":"Stage_71","total":1643,"win":903},{"name":"Stage_72","total":4549,"win":3907},{"name":"Stage_73","total":1886,"win":1183},{"name":"Stage_74","total":1876,"win":1216},{"name":"Stage_75","total":1627,"win":842},{"name":"Stage_76","total":3583,"win":2857},{"name":"Stage_77","total":2464,"win":1798},{"name":"Stage_78","total":3082,"win":2357},{"name":"Stage_79","total":4897,"win":4146},{"name":"Stage_80","total":2472,"win":1693},{"name":"Stage_81","total":3297,"win":2660},{"name":"Stage_82","total":1593,"win":892},{"name":"Stage_83","total":4054,"win":3339},{"name":"Stage_84","total":2433,"win":1684},{"name":"Stage_85","total":3009,"win":2221},{"name":"Stage_86","total":2383,"win":1602},{"name":"Stage_87","total":1530,"win":797},{"name":"Stage_88","total":1809,"win":1111},{"name":"Stage_89","total":2188,"win":1533},{"name":"Stage_90","total":1435,"win":753},{"name":"Stage_91","total":3069,"win":2458},{"name":"Stage_92","total":1857,"win":1244},{"name":"Stage_93","total":1979,"win":1378},{"name":"Stage_94","total":3030,"win":2287},{"name":"Stage_95","total":4970,"win":4354},{"name":"Stage_96","total":1931,"win":1305},{"name":"Stage_97","total":3363,"win":2634},{"name":"Stage_98","total":4487,"win":3855},{"name":"Stage_99","total":2642,"win":1990},{"name":"Stage_100","total":1984,"win":1298},{"name":"Stage_101","total":1197,"win":515},{"name":"Stage_102","total":4828,"win":4223},{"name":"Stage_103","total":3351,"win":2626},{"name":"Stage_104","total":1217,"win":455},{"name":"Stage_105","total":4816,"win":4112},{"name":"Stage_106","total":3037,"win":2280},{"name":"Stage_107","total":3749,"win":2954},{"name":"Stage_108","total":3915,"win":3209},{"name":"Stage_109","total":3145,"win":2508},{"name":"Stage_110","total":4568,"win":3911},{"name":"Stage_111","total":1358,"win":598},{"name":"Stage_112","total":2169,"win":1406},{"name":"Stage_113","total":4715,"win":4056},{"name":"Stage_114","total":3302,"win":2583},{"name":"Stage_115","total":973,"win":318},{"name":"Stage_116","total":2581,"win":1909},{"name":"Stage_117","total":1040,"win":438},{"name":"Stage_118","total":1058,"win":391},{"name":"Stage_119","total":2440,"win":1698},{"name":"Stage_120","total":2663,"win":2051},{"name":"Stage_121","total":3112,"win":2314},{"name":"Stage_122","total":3661,"win":3033},{"name":"Stage_123","total":1838,"win":1219},{"name":"Stage_124","total":1980,"win":1269},{"name":"Stage_125","total":1589,"win":930},{"name":"Stage_126","total":4227,"win":3524},{"name":"Stage_127","total":4816,"win":4115},{"name":"Stage_128","total":2312,"win":1587},{"name":"Stage_129","total":3969,"win":3199},{"name":"Stage_130","total":3044,"win":2308},{"name":"Stage_131","total":803,"win":62},{"name":"Stage_132","total":2440,"win":1663},{"name":"Stage_133","total":2897,"win":2289},{"name":"Stage_134","total":1675,"win":1063},{"name":"Stage_135","total":2272,"win":1609},{"name":"Stage_136","total":1114,"win":453},{"name":"Stage_137","total":4015,"win":3341},{"name":"Stage_138","total":2745,"win":2057},{"name":"Stage_139","total":1527,"win":913},{"name":"Stage_140","total":3672,"win":2906},{"name":"Stage_141","total":1013,"win":406},{"name":"Stage_142","total":2011,"win":1332},{"name":"Stage_143","total":4758,"win":3974},{"name":"Stage_144","total":3289,"win":2557},{"name":"Stage_145","total":2787,"win":2088},{"name":"Stage_146","total":1880,"win":1225},{"name":"Stage_147","total":2933,"win":2245},{"name":"Stage_148","total":3685,"win":2940},{"name":"Stage_149","total":4154,"win":3554},{"name":"Stage_150","total":1824,"win":1211},{"name":"Stage_151","total":1592,"win":883},{"name":"Stage_152","total":4055,"win":3439},{"name":"Stage_153","total":2828,"win":2128},{"name":"Stage_154","total":3321,"win":2622},{"name":"Stage_155","total":2003,"win":1292},{"name":"Stage_156","total":2157,"win":1516},{"name":"Stage_157","total":3878,"win":3201},{"name":"Stage_158","total":2033,"win":1328},{"name":"Stage_159","total":1170,"win":454},{"name":"Stage_160","total":956,"win":253},{"name":"Stage_161","total":3592,"win":2821},{"name":"Stage_162","total":2769,"win":2136},{"name":"Stage_163","total":1673,"win":1050},{"name":"Stage_164","total":1760,"win":1016},{"name":"Stage_165","total":2850,"win":2059},{"name":"Stage_166","total":3936,"win":3224},{"name":"Stage_167","total":2699,"win":2075},{"name":"Stage_168","total":4313,"win":3655},{"name":"Stage_169","total":1914,"win":1228},{"name":"Stage_170","total":4768,"win":3982},{"name":"Stage_171","total":1150,"win":380},{"name":"Stage_172","total":1084,"win":356},{"name":"Stage_173","total":2157,"win":1469},{"name":"Stage_174","total":2323,"win":1622},{"name":"Stage_175","total":2593,"win":1962},{"name":"Stage_176","total":3699,"win":3090},{"name":"Stage_177","total":975,"win":185},{"name":"Stage_178","total":3550,"win":2827},{"name":"Stage_179","total":2828,"win":2033},{"name":"Stage_180","total":3285,"win":2517},{"name":"Stage_181","total":1754,"win":1026},{"name":"Stage_182","total":1959,"win":1162},{"name":"Stage_183","total":1274,"win":491},{"name":"Stage_184","total":4728,"win":4021},{"name":"Stage_185","total":3997,"win":3259},{"name":"Stage_186","total":4499,"win":3727},{"name":"Stage_187","total":2214,"win":1478},{"name":"Stage_188","total":3434,"win":2653},{"name":"Stage_189","total":1800,"win":1123},{"name":"Stage_190","total":3052,"win":2320},{"name":"Stage_191","total":1006,"win":350},{"name":"Stage_192","total":4724,"win":4096},{"name":"Stage_193","total":3203,"win":2480},{"name":"Stage_194","total":3946,"win":3254},{"name":"Stage_195","total":2885,"win":2132},{"name":"Stage_196","total":877,"win":271},{"name":"Stage_197","total":4572,"win":3914},{"name":"Stage_198","total":3923,"win":3151},{"name":"Stage_199","total":4412,"win":3760}];
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
	return `${decimal}`;
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
          <li style={{color: '#0088FE'}}>
            {`Users: ${payload[0].payload.users} `}
          </li>
           {/*
          <li style={{color: '#FF8042'}}>
            {`Win: ${payload[0].payload.Win} `}
          </li> */}
	        <li >
            {`${payload[0].name}: ${payload[0].value.toLocaleString()} `}
          </li>
      </ul>
    </div>
  );

  };
} 


const BtcEth = ({ theme, dir, data,callback }) => (
  <Panel
    xl={12}
    lg={12}
    md={12}
    xs={12}
    title="Return Count By Stage"
    subhead="Số lần return trung bình của User theo Stage  "
  >
    <div dir="ltr" >
    {/* <Button name="back" className="icon" color="success" onClick={e => callback(e)}>Back</Button>
    <Button name="next" className="icon" color="success" onClick={e => callback(e)}>Next</Button>
    className="dashboard__area" */}
      <ResponsiveContainer height={350} >
        <AreaChart  stackOffset="expand" data={data} margin={{ top: 20, left: -15, bottom: 20 }}> 
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
            name="Return"
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
