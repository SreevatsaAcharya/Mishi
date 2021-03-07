import React, {useState} from 'react';
import {Dimensions, processColor, View} from 'react-native';
import {Text, Layout, Card} from '../../../../components/atoms';
import {LineChart, YAxis, Grid} from 'react-native-svg-charts';
import * as jsonData from '../../../../assets/datasets/file5.json';

export const SystemLineChart = () => {
  const contentInset = {top: 20, bottom: 20};
  const data = jsonData[4].restaurants.map((restaurant) => {
    return restaurant?.restaurant.average_cost_for_two;
  });

  return (
    <View style={{marginHorizontal: 16}}>
      <Text category="h4" style={{marginBottom: 16}}>
        Line Chart
      </Text>
      <View style={{height: 200, flexDirection: 'row'}}>
        <YAxis
          data={data}
          contentInset={contentInset}
          svg={{
            fill: 'grey',
            fontSize: 10,
          }}
          numberOfTicks={10}
          formatLabel={(value) => `${value}$`}
        />

        <LineChart
          style={{flex: 1, marginLeft: 8}}
          data={data}
          svg={{stroke: 'rgb(134, 65, 244)'}}
          contentInset={{top: 20, bottom: 20}}>
          <Grid />
        </LineChart>
      </View>

      <Text category="s1" style={{alignSelf: 'center', paddingVertical: 8}}>
        Average cost for 2
      </Text>
    </View>
  );
};
