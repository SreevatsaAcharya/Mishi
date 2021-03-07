import React, {useState} from 'react';
import {Dimensions, processColor, View} from 'react-native';
import {Text, Layout, Card} from '../../../../components/atoms';
import {BarChart, YAxis, Grid} from 'react-native-svg-charts';
import * as jsonData from '../../../../assets/datasets/file5.json';

export const SystemBarChart = () => {
  const fill = 'rgb(134, 65, 244)';
  const contentInset = {top: 28, bottom: 20};

  const data = jsonData[1].restaurants.map((restaurant) => {
    return parseFloat(restaurant?.restaurant.user_rating?.aggregate_rating);
  });

  return (
    <View style={{marginHorizontal: 16}}>
      <Text category="h4" style={{marginBottom: 16}}>
        Bar Chart
      </Text>
      <View style={{height: 250, flexDirection: 'row'}}>
        <YAxis
          data={data}
          contentInset={contentInset}
          svg={{
            fill: 'grey',
            fontSize: 10,
          }}
          numberOfTicks={10}
        />
        <BarChart
          style={{flex: 1, marginLeft: 8}}
          data={data}
          svg={{fill}}
          contentInset={{top: 30, bottom: 30}}>
          <Grid />
        </BarChart>
      </View>

      <Text category="s1" style={{alignSelf: 'center', paddingVertical: 8}}>
        Aggregate Rating
      </Text>
    </View>
  );
};
