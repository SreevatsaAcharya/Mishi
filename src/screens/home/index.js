import React, {useState, useEffect} from 'react';
import {SafeAreaView, StyleSheet, TouchableOpacity, Modal} from 'react-native';
import {
  IconRegistry,
  ApplicationProvider,
  Text,
  Layout,
  Card,
  Icon,
  List,
  Button,
  Input,
} from '../../components/atoms';
import * as eva from '@eva-design/eva';
import {EvaIconsPack} from '@ui-kitten/eva-icons';
import * as homeActions from './home.actions';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
const uuid = require('react-native-uuid');

const HomeScreen = (props) => {
  const {theme, data} = props;
  const [visible, setVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState({});
  const [mode, setMode] = useState('');

  let keyExtractor = (item, index) => index.toString();

  const submitForm = (mode, payload) => {
    if (mode === 'new') {
      props.actions.addItem({...payload, id: uuid.v4()});
    } else {
      let dataCopy = [...data];
      let index = findValueIndex(selectedItem.id);
      dataCopy[index] = {...selectedItem, ...payload};
      props.actions.editItem(dataCopy);
    }
  };

  const findValueIndex = (val) => data.findIndex((a) => a.id === val);

  const deleteItem = (index) => {
    let payload = [...data];
    payload.splice(findValueIndex(index), 1);
    props.actions.deleteItem(payload);
  };

  const Header = () => {
    return (
      <>
        <Layout style={style.header}>
          <Text category={'h1'}>Restaurants</Text>
          <TouchableOpacity
            onPress={() => {
              setMode('new');
              setVisible(true);
            }}>
            <Icon
              name="plus-circle"
              fill="black"
              style={{height: 32, width: 32}}
            />
          </TouchableOpacity>
        </Layout>
      </>
    );
  };

  const ListView = () => {
    return (
      <>
        <List
          data={data}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
          style={style.list}
          ListEmptyComponent={() => (
            <Layout
              style={{
                flex: 1,
                padding: 20,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text category="h6">No Data</Text>
            </Layout>
          )}
        />
      </>
    );
  };

  const renderItem = ({item, index}) => {
    let {id, name, description} = item;
    return (
      <Card key={index}>
        <Layout style={style.card}>
          <Layout style={{flex: 4, marginHorizontal: 2}}>
            <Text category="h6">{name}</Text>
            <Text style={{marginTop: 8}} category="s1">
              {description}
            </Text>
          </Layout>
          <Layout
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignSelf: 'center',
            }}>
            <TouchableOpacity
              onPress={() => {
                setMode('edit');
                setSelectedItem(item);
                setVisible(true);
              }}>
              <Icon
                name="edit"
                fill="blue"
                style={{
                  height: 24,
                  width: 24,
                }}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => deleteItem(id)}>
              <Icon name="trash" fill="red" style={{height: 24, width: 24}} />
            </TouchableOpacity>
          </Layout>
        </Layout>
      </Card>
    );
  };

  const Form = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
      if (mode.toLowerCase() === 'edit') {
        let {name, description} = selectedItem;
        setName(name);
        setDescription(description);
      }
    }, []);

    return (
      <>
        <Modal visible={visible} style={style.modal}>
          <Card
            disabled={true}
            style={style.formRoot}
            header={() => (
              <Text category="h6" style={style.modalTitle}>
                Enter Restuarant Details :
              </Text>
            )}>
            <Input
              label="Name"
              placeholder="Enter Name"
              value={name}
              onChangeText={(nextValue) => setName(nextValue)}
              style={style.title}
            />
            <Input
              label="Description"
              placeholder="Enter Description"
              value={description}
              onChangeText={(nextValue) => setDescription(nextValue)}
              multiline={true}
              numberOfLines={50}
              style={style.subTitle}
              textStyle={{
                height: 150,
                textAlignVertical: 'top',
              }}
            />
            <Layout
              style={{
                flexDirection: 'row',
                alignSelf: 'flex-end',
              }}>
              <Button
                status="danger"
                style={style.submit}
                onPress={() => {
                  setName('');
                  setDescription('');
                  setVisible(false);
                  setSelectedItem({});
                }}>
                CANCEL
              </Button>
              <Button
                style={style.submit}
                onPress={() => {
                  if (name.length) {
                    submitForm(mode, {name, description});
                    setVisible(false);
                  }
                }}>
                SUBMIT
              </Button>
            </Layout>
          </Card>
        </Modal>
      </>
    );
  };

  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider mapping={eva.mapping} theme={eva.light}>
        <SafeAreaView style={style.safearea}>
          <Layout style={style.root}>
            <Header />
            <ListView />
            {visible && <Form />}
          </Layout>
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
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 16,
  },
  list: {paddingTop: 8, paddingHorizontal: 8},
  card: {
    marginBottom: 8,
    flexDirection: 'row',
  },
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modal: {
    padding: 8,
  },
  formRoot: {
    marginTop: 100,
    marginVertical: 8,
    justifyContent: 'space-between',
  },
  modalTitle: {
    padding: 16,
    marginTop: 16,
    marginHorizontal: 4,
  },
  title: {
    marginVertical: 8,
  },
  subTitle: {
    marginVertical: 8,
  },
  submit: {
    marginTop: 16,
    marginLeft: 8,
  },
});

const mapStateToProps = (state) => {
  return {
    theme: state.reducers.app.theme,
    data: state.reducers.app.data,
  };
};

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(homeActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
