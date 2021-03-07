import React, {useState} from 'react';
import {Dimensions, processColor, View} from 'react-native';
import {Text, Layout, Card} from '../../../../components/atoms';
import {AreaChart, YAxis, Grid} from 'react-native-svg-charts';
import * as jsonData from '../../../../assets/datasets/file5.json';
import * as shape from 'd3-shape';
export const SystemAreaChart = () => {
  const contentInset = {top: 20, bottom: 20};

  const data = jsonData[4].restaurants.map((restaurant) => {
    return parseFloat(restaurant?.restaurant.user_rating?.votes);
  });

  return (
    <View style={{marginHorizontal: 16}}>
      <Text category="h4" style={{marginBottom: 16}}>
        Area Chart
      </Text>
      <View style={{height: 220, flexDirection: 'row'}}>
        <YAxis
          data={data}
          contentInset={contentInset}
          svg={{
            fill: 'grey',
            fontSize: 10,
          }}
          numberOfTicks={10}
        />
        <AreaChart
          style={{flex: 1, marginLeft: 8}}
          data={data}
          contentInset={{top: 30, bottom: 32}}
          curve={shape.curveNatural}
          svg={{fill: 'rgba(134, 65, 244, 0.8)'}}>
          <Grid />
        </AreaChart>
      </View>
      <Text category="s1" style={{alignSelf: 'center', paddingVertical: 8}}>
        Votes
      </Text>
    </View>
  );
};
