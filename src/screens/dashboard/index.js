import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {
  IconRegistry,
  ApplicationProvider,
  Text,
  Layout,
} from '../../components/atoms';
import * as eva from '@eva-design/eva';
import {EvaIconsPack} from '@ui-kitten/eva-icons';
import {SystemBarChart, SystemLineChart, SystemAreaChart} from './components';

const DashboardScreen = () => {
  const Header = () => {
    return (
      <>
        <Layout style={style.header}>
          <Text category={'h1'}>Dashboard</Text>
        </Layout>
      </>
    );
  };

  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider mapping={eva.mapping} theme={eva.light}>
        <SafeAreaView style={style.safearea}>
          <Header />
          <ScrollView>
            <Layout style={style.root}>
              <Text
                category="s1"
                style={{marginHorizontal: 16, paddingBottom: 16}}>
                The following graphs represent a few key data points for a set
                of 20 resturants.
              </Text>
              <SystemBarChart />
              <SystemLineChart />
              <SystemAreaChart />
            </Layout>
          </ScrollView>
        </SafeAreaView>
      </ApplicationProvider>
    </>
  );
};

const style = StyleSheet.create({
  safearea: {
    flex: 1,
  },
  root: {
    flex: 1,
    paddingBottom: 60,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 16,
  },
});

export default DashboardScreen;
