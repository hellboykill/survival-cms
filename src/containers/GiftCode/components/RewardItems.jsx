import React from 'react';
import { Card,  CardBody, Table,Col,Row } from 'reactstrap';
import { withTranslation } from 'react-i18next';
import PropTypes from 'prop-types';


const RewardItems = ({t}) => (
  <Col height="500px" lg={12} xl={12} md={12} title="Rewards List">
    {/* <Card>
      <CardBody>
        <h3>List Key Gift Code</h3>
        <br/>
        <h4>1. Currency:  Gas,  Titanium,  EXP,   Gold,  Cash</h4>
        <h4>2. Key:  Silver Key,   GoldenKey</h4>
        <h4>3. Blueprint:   Blueprint,   Weapon Blueprint,   Module Chip Blueprint,   Drone Chip Blueprint, Armor Blueprint,   Weapon Blueprint</h4>
        <h4>4. Equipment: Equipment Common,   Equipment Great,   Equipment Rare,   
                Equipment Epic,   Equipment Perfect Epic, Weapon Common , Chip Common,
                Drone Common,
                Armor Common,
                Weapon Great,
                Chip Great,
                Drone Great,
                Armor Great,
                Weapon Rare,
                Chip Rare,
                Drone Rare,
                Armor Rare,
                Weapon Epic,
                Drone Epic,
                Armor Epic,
                Chip Epic,
                Weapon Perfect Epic</h4>
      <h4>5. Tank: Container Auto Bot,
Armored Car,
Bat Mobile,
COMBAT_AGRIMOTOR,
BASHER Car,
TANK_575,
TRUCK_137,
DESERT_PATROL_VEHICLE,
FROSTBITE,
Protector</h4>
  <h4>6. ITEM:  
Reviral
Atk Speed Booster,
Attack Booster,
HP Booster,
Evasion Booster,
</h4>
<h4>7. Point:   
Honor Point,
Allies Point
</h4>
<h4>8. Item Event:  
Goldring,
GingerPie,
Dice</h4>
<h4>9. Item Coin Bonus Campaign:  
X2_30,
X2_60,
X2_120,
X3_30,
X3_60,
X3_120
</h4>
<h4>10. Common:  Glory_Chest,
Vip_Glory_Chest,
ChipJP,
Rubik_Chest,
TicketWB</h4>
<h4>11. Resource Captain:   
Dog_Tag,
Medal,
Piece_of_Soul</h4>
<h4>12. Captain:  Lin_Yingjie,
Caterina_Vecellio,
Imamu_Iweala,
Johnny_Kage,
Zigger_Serrano,
Jackson_Franky,
Adalinda_Lehmann </h4>
<h4>13. Captain Piece:   Captain Piece,
Piece_Lin_Yingjie,
Piece_Caterina_Vecellio,
Piece_Imamu_Iweala,
Piece_Johnny_Kage,
Piece_Zigger_Serrano,
Piece_Jackson_Franky,
Piece_Adalinda_Lehmann</h4>

      </CardBody>
    </Card> */}
  </Col>
)

RewardItems.propTypes = {
  t: PropTypes.func.isRequired,
};

export default withTranslation('common')(RewardItems);


// const RewardItems = ({ t }) => (
//   <Col height="500px" lg={6} xl={6} md={12} title="Rewards List">
//      <Card>
//      <CardBody>
//     <div styles={{ height: '500px', overflowY: 'scroll' }} >
//       <Row>
//     <Col  lg={6} xl={6} md={6} >
//     <Table  >
//       <thead>
//         <tr>
//           <th width="8%">Image</th>
//           <th width="52%">Name</th>         
//         </tr>
//       </thead>
//       <tbody>
//         <tr>
//           <td><img width="40" height="40" src={process.env.PUBLIC_URL + '/img/flags/0.png'} alt="flag" /> </td>
//           <td>Coin</td>
//         </tr>
//         <tr>
//           <td><img width="40" height="40"  src={process.env.PUBLIC_URL + '/img/flags/1.png'} alt="flag" /> </td>
//           <td>Gem</td>
//         </tr>
//         <tr>
//           <td><img width="40" height="40"  src={process.env.PUBLIC_URL + '/img/flags/2.png'} alt="flag" /> </td>
//           <td>Stone</td>
//         </tr>
//         <tr>
//           <td><img width="40" height="40"  src={process.env.PUBLIC_URL + '/img/flags/3.png'} alt="flag" /> </td>
//           <td>Soul Stone</td>
//         </tr>
//         <tr>
//           <td><img width="40" height="40"  src={process.env.PUBLIC_URL + '/img/flags/6.png'} alt="flag" /> </td>
//           <td>TIER_9_DRAGON</td>
//         </tr>
//         <tr>
//           <td><img width="40" height="40"  src={process.env.PUBLIC_URL + '/img/flags/7.png'} alt="flag" /> </td>
//           <td>TIER_10_DRAGON</td>
//         </tr>
//         <tr>
//           <td><img width="40" height="40"  src={process.env.PUBLIC_URL + '/img/flags/9.png'} alt="flag" /> </td>
//           <td>TIER_11_DRAGON</td>
//         </tr>
//         <tr>
//           <td><img width="40" height="40"  src={process.env.PUBLIC_URL + '/img/flags/10.png'} alt="flag" /> </td>
//           <td>TIER_1_DRAGON</td>
//         </tr>
//         <tr>
//           <td><img width="40" height="40"  src={process.env.PUBLIC_URL + '/img/flags/11.png'} alt="flag" /> </td>
//           <td>TIER_2_DRAGON</td>
//         </tr>
//         <tr>
//           <td><img width="40" height="40"  src={process.env.PUBLIC_URL + '/img/flags/12.png'} alt="flag" /> </td>
//           <td>TIER_3_DRAGON</td>
//         </tr>
//         <tr>
//           <td><img width="40" height="40"  src={process.env.PUBLIC_URL + '/img/flags/13.png'} alt="flag" /> </td>
//           <td>TIER_4_DRAGON</td>
//         </tr>
//         <tr>
//           <td><img width="40" height="40"  src={process.env.PUBLIC_URL + '/img/flags/14.png'} alt="flag" /> </td>
//           <td>TIER_5_DRAGON</td>
//         </tr>
//         <tr>
//           <td><img width="40" height="40"  src={process.env.PUBLIC_URL + '/img/flags/15.png'} alt="flag" /> </td>
//           <td>TIER_6_DRAGON</td>
//         </tr>
//         <tr>
//           <td><img width="40" height="40"  src={process.env.PUBLIC_URL + '/img/flags/16.png'} alt="flag" /> </td>
//           <td>TIER_7_DRAGON</td>
//         </tr>
//         <tr>
//           <td><img width="40" height="40"  src={process.env.PUBLIC_URL + '/img/flags/17.png'} alt="flag" /> </td>
//           <td>TIER_8_DRAGON</td>
//         </tr>
//         <tr>
//           <td><img width="40" height="40"  src={process.env.PUBLIC_URL + '/img/flags/18.png'} alt="flag" /> </td>
//           <td>X2_HATCHING_TIME</td>
//         </tr>
//         <tr>
//           <td><img width="40" height="40"  src={process.env.PUBLIC_URL + '/img/flags/19.png'} alt="flag" /> </td>
//           <td>X3_HATCHING_TIME</td>
//         </tr>
//         <tr>
//           <td><img width="40" height="40"  src={process.env.PUBLIC_URL + '/img/flags/19.png'} alt="flag" /> </td>
//           <td>X3_HATCHING_TIME</td>
//         </tr>
//         <tr>
//           <td><img width="40" height="40"  src={process.env.PUBLIC_URL + '/img/flags/21.png'} alt="flag" /> </td>
//           <td>X5_HATCHING_TIME</td>
//         </tr>
//         <tr>
//           <td><img width="40" height="40"  src={process.env.PUBLIC_URL + '/img/flags/22.png'} alt="flag" /> </td>
//           <td>TIER_17_DRAGON (Rayquaz)</td>
//         </tr>
//         <tr>
//           <td><img width="40" height="40"  src={process.env.PUBLIC_URL + '/img/flags/23.png'} alt="flag" /> </td>
//           <td>TIER_19_DRAGON</td>
//         </tr>
//         <tr>
//           <td><img width="40" height="40"  src={process.env.PUBLIC_URL + '/img/flags/24.png'} alt="flag" /> </td>
//           <td>TIER_15_DRAGON</td>
//         </tr>
//         <tr>
//           <td><img width="40" height="40"  src={process.env.PUBLIC_URL + '/img/flags/25.png'} alt="flag" /> </td>
//           <td>TIER_12_DRAGON</td>
//         </tr>
//         <tr>
//           <td><img width="40" height="40"  src={process.env.PUBLIC_URL + '/img/flags/26.png'} alt="flag" /> </td>
//           <td>TIER_13_DRAGON</td>
//         </tr>
//         <tr>
//           <td><img width="40" height="40"  src={process.env.PUBLIC_URL + '/img/flags/27.png'} alt="flag" /> </td>
//           <td>TIER_14_DRAGON</td>
//         </tr>
//         <tr>
//           <td><img width="40" height="40"  src={process.env.PUBLIC_URL + '/img/flags/28.png'} alt="flag" /> </td>
//           <td>TIER_16_DRAGON</td>
//         </tr>
//         <tr>
//           <td><img width="40" height="40"  src={process.env.PUBLIC_URL + '/img/flags/29.png'} alt="flag" /> </td>
//           <td>TIER_18_DRAGON</td>
//         </tr>
//         <tr>
//           <td><img width="40" height="40"  src={process.env.PUBLIC_URL + '/img/flags/30.png'} alt="flag" /> </td>
//           <td>TIER_20_DRAGON</td>
//         </tr>
//         <tr>
//           <td><img width="40" height="40"  src={process.env.PUBLIC_URL + '/img/flags/31.png'} alt="flag" /> </td>
//           <td>TIER_21_DRAGON</td>
//         </tr>
//         <tr>
//           <td><img width="40" height="40"  src={process.env.PUBLIC_URL + '/img/flags/32.png'} alt="flag" /> </td>
//           <td>TIER_22_DRAGON</td>
//         </tr>
//         <tr>
//           <td><img width="40" height="40"  src={process.env.PUBLIC_URL + '/img/flags/33.png'} alt="flag" /> </td>
//           <td>TIER_23_DRAGON</td>
//         </tr>
//         <tr>
//           <td><img width="40" height="40"  src={process.env.PUBLIC_URL + '/img/flags/34.png'} alt="flag" /> </td>
//           <td>TIER_24_DRAGON</td>
//         </tr>
//         <tr>
//           <td><img width="40" height="40"  src={process.env.PUBLIC_URL + '/img/flags/35.png'} alt="flag" /> </td>
//           <td>TIER_25_DRAGON</td>
//         </tr>
//         <tr>
//           <td><img width="40" height="40"  src={process.env.PUBLIC_URL + '/img/flags/36.png'} alt="flag" /> </td>
//           <td>TIER_26_DRAGON</td>
//         </tr>
//         <tr>
//           <td><img width="40" height="40"  src={process.env.PUBLIC_URL + '/img/flags/37.png'} alt="flag" /> </td>
//           <td>TIER_27_DRAGON</td>
//         </tr>
//         <tr>
//           <td><img width="40" height="40"  src={process.env.PUBLIC_URL + '/img/flags/38.png'} alt="flag" /> </td>
//           <td>TIER_28_DRAGON</td>
//         </tr>
//         <tr>
//           <td><img width="40" height="40"  src={process.env.PUBLIC_URL + '/img/flags/39.png'} alt="flag" /> </td>
//           <td>TIER_29_DRAGON</td>
//         </tr>
//       </tbody>
//     </Table>
    
//       </Col>
//       <Col  lg={6} xl={6} md={6} >
//     <Table  >
//       <thead>
//         <tr>
//           <th width="8%">Image</th>
//           <th width="52%">Name</th>
//           <th width="40%">RewardID</th>
         
//         </tr>
//       </thead>
//       <tbody>
//         <tr>
//           <td><img width="40" height="40" src={process.env.PUBLIC_URL + '/img/flags/40.png'} alt="flag" /> </td>
//           <td>TIER_30_DRAGON</td>
//           <td>40</td>
//         </tr>
//         <tr>
//           <td><img width="40" height="40"  src={process.env.PUBLIC_URL + '/img/flags/41.png'} alt="flag" /> </td>
//           <td>TIER_31_DRAGON</td>
//           <td>41</td>
//         </tr>
//         <tr>
//           <td><img width="40" height="40"  src={process.env.PUBLIC_URL + '/img/flags/42.png'} alt="flag" /> </td>
//           <td>TIER_32_DRAGON</td>
//           <td>42</td>
//         </tr>
//         <tr>
//           <td><img width="40" height="40"  src={process.env.PUBLIC_URL + '/img/flags/43.png'} alt="flag" /> </td>
//           <td>TIER_33_DRAGON</td>
//           <td>43</td>
//         </tr>
//         <tr>
//           <td><img width="40" height="40"  src={process.env.PUBLIC_URL + '/img/flags/44.png'} alt="flag" /> </td>
//           <td>TIER_34_DRAGON</td>
//           <td>44</td>
//         </tr>
//         <tr>
//           <td><img width="40" height="40"  src={process.env.PUBLIC_URL + '/img/flags/45.png'} alt="flag" /> </td>
//           <td>AUTO_PLAY_30_MIN</td>
//           <td>45</td>
//         </tr>
//         <tr>
//           <td><img width="40" height="40"  src={process.env.PUBLIC_URL + '/img/flags/46.png'} alt="flag" /> </td>
//           <td>AUTO_PLAY_1</td>
//           <td>46</td>
//         </tr>
//         <tr>
//           <td><img width="40" height="40"  src={process.env.PUBLIC_URL + '/img/flags/47.png'} alt="flag" /> </td>
//           <td>AUTO_PLAY_30</td>
//           <td>47</td>
//         </tr>
//         <tr>
//           <td><img width="40" height="40"  src={process.env.PUBLIC_URL + '/img/flags/48.png'} alt="flag" /> </td>
//           <td>GEM_PER_DAY_30</td>
//           <td>48</td>
//         </tr>
//         <tr>
//           <td><img width="40" height="40"  src={process.env.PUBLIC_URL + '/img/flags/49.png'} alt="flag" /> </td>
//           <td>DRAGON_EPIC (Random)</td>
//           <td>49</td>
//         </tr>
//         <tr>
//           <td><img width="40" height="40"  src={process.env.PUBLIC_URL + '/img/flags/50.png'} alt="flag" /> </td>
//           <td>DRAGON_RARE (Random)</td>
//           <td>50</td>
//         </tr>
//         <tr>
//           <td><img width="40" height="40"  src={process.env.PUBLIC_URL + '/img/flags/51.png'} alt="flag" /> </td>
//           <td>DRAGON_LEGEND (Random)</td>
//           <td>51</td>
//         </tr>
//         <tr>
//           <td><img width="40" height="40"  src={process.env.PUBLIC_URL + '/img/flags/52.png'} alt="flag" /> </td>
//           <td>CON_DPS_N</td>
//           <td>52</td>
//         </tr>
//         <tr>
//           <td><img width="40" height="40"  src={process.env.PUBLIC_URL + '/img/flags/53.png'} alt="flag" /> </td>
//           <td>CON_CRIT_RATE_N</td>
//           <td>53</td>
//         </tr>
//         <tr>
//           <td><img width="40" height="40"  src={process.env.PUBLIC_URL + '/img/flags/54.png'} alt="flag" /> </td>
//           <td>CON_CRIT_DMG_N</td>
//           <td>54</td>
//         </tr>
//         <tr>
//           <td><img width="40" height="40"  src={process.env.PUBLIC_URL + '/img/flags/55.png'} alt="flag" /> </td>
//           <td>CON_HP_N</td>
//           <td>55</td>
//         </tr>
//         <tr>
//           <td><img width="40" height="40"  src={process.env.PUBLIC_URL + '/img/flags/56.png'} alt="flag" /> </td>
//           <td>CON_AS_N</td>
//           <td>56</td>
//         </tr>
//         <tr>
//           <td><img width="40" height="40"  src={process.env.PUBLIC_URL + '/img/flags/57.png'} alt="flag" /> </td>
//           <td>CON_DMG_REDUCE_N</td>
//           <td>57</td>
//         </tr>
//         <tr>
//           <td><img width="40" height="40"  src={process.env.PUBLIC_URL + '/img/flags/58.png'} alt="flag" /> </td>
//           <td>CON_GOLDSTAGE_N</td>
//           <td>58</td>
//         </tr>
//         <tr>
//           <td><img width="40" height="40"  src={process.env.PUBLIC_URL + '/img/flags/59.png'} alt="flag" /> </td>
//           <td>FIRE_CURRENCY</td>
//           <td>59</td>
//         </tr>
//         <tr>
//           <td><img width="40" height="40"  src={process.env.PUBLIC_URL + '/img/flags/60.png'} alt="flag" /> </td>
//           <td>WATER_CURRENCY</td>
//           <td>60</td>
//         </tr>
//         <tr>
//           <td><img width="40" height="40"  src={process.env.PUBLIC_URL + '/img/flags/61.png'} alt="flag" /> </td>
//           <td>NATURE_CURRENCY</td>
//           <td>61</td>
//         </tr>
//         <tr>
//           <td><img width="40" height="40"  src={process.env.PUBLIC_URL + '/img/flags/62.png'} alt="flag" /> </td>
//           <td>THUNDER_CURRENCY</td>
//           <td>62</td>
//         </tr>
//         <tr>
//           <td><img width="40" height="40"  src={process.env.PUBLIC_URL + '/img/flags/63.png'} alt="flag" /> </td>
//           <td>BATTLE_POINT</td>
//           <td>63</td>
//         </tr>
//         <tr>
//           <td><img width="40" height="40"  src={process.env.PUBLIC_URL + '/img/flags/64.png'} alt="flag" /> </td>
//           <td>TIER_35_DRAGON</td>
//           <td>64</td>
//         </tr>
//         <tr>
//           <td><img width="40" height="40"  src={process.env.PUBLIC_URL + '/img/flags/65.png'} alt="flag" /> </td>
//           <td>TIER_36_DRAGON</td>
//           <td>65</td>
//         </tr>
//         <tr>
//           <td><img width="40" height="40"  src={process.env.PUBLIC_URL + '/img/flags/66.png'} alt="flag" /> </td>
//           <td>RANDOM_CONSUME</td>
//           <td>66</td>
//         </tr>
//         <tr>
//           <td><img width="40" height="40"  src={process.env.PUBLIC_URL + '/img/flags/67.png'} alt="flag" /> </td>
//           <td>AUTO_PLAY_15_MIN</td>
//           <td>67</td>
//         </tr>
//         <tr>
//           <td><img width="40" height="40"  src={process.env.PUBLIC_URL + '/img/flags/68.png'} alt="flag" /> </td>
//           <td>GEM_PER_DAY_30_50GEM</td>
//           <td>68</td>
//         </tr>
//         <tr>
//           <td><img width="40" height="40"  src={process.env.PUBLIC_URL + '/img/flags/69.png'} alt="flag" /> </td>
//           <td>RANDOM_ELEMENT</td>
//           <td>69</td>
//         </tr>
//         <tr>
//           <td><img width="40" height="40"  src={process.env.PUBLIC_URL + '/img/flags/70.png'} alt="flag" /> </td>
//           <td>BOSS_MEDAL</td>
//           <td>70</td>
//         </tr>
       
//       </tbody>
//     </Table>
    
//       </Col>
//       </Row>
//     </div>
//     </CardBody>
//     </Card>
//   </Col>
// );