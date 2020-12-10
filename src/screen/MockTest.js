import React, { Component } from 'react';
import { View, Text, FlatList, ActivityIndicator,Image } from 'react-native';
import { ListItem, SearchBar,Icon} from 'react-native-elements';
import { SafeAreaView } from 'react-native';
import { StyleSheet } from 'react-native';
import { Checkbox } from 'react-native-paper';
import { IMAGENAME } from '../assets';

class MockTest extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      data: [],
      error: null,
    };

    this.arrayholder = [];
  }

  componentDidMount() {
    this.makeRemoteRequest();
  }

  makeRemoteRequest = () => {
    const url = `https://randomuser.me/api/?&results=20`;
    this.setState({ loading: true });

    fetch(url)
      .then(res => res.json())
      .then(res => {
        this.setState({
          data: res.results,
          error: res.error || null,
          loading: false,
        });
        this.arrayholder = res.results;
      })
      .catch(error => {
        this.setState({ error, loading: false });
      });
  };

  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: '86%',
          backgroundColor: '#CED0CE',
          marginLeft: '14%',
        }}
      />
    );
  };

  searchFilterFunction = text => {
    this.setState({
      value: text,
    });

    const newData = this.arrayholder.filter(item => {
      const itemData = `${item.name.title.toUpperCase()} ${item.name.first.toUpperCase()} ${item.name.last.toUpperCase()}`;
      const textData = text.toUpperCase();

      return itemData.indexOf(textData) > -1;
    });
    this.setState({
      data: newData,
    });
  };

  renderHeader = () => {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: '#fff'}}>
         <View  style={{flex: 1,
           flexDirection: "column",
           
          }}>
        <View style={{flexDirection:'row',justifyContent:'space-between'}} >
        <View style={{height:40,width:40}}>
        <Image source = {IMAGENAME}
          style = {{width: 40, height: 40,margin:10 }}
      />
        </View>
        <View >
          <Text style={{alignSelf:'center',fontSize:30,color:'blue',marginTop:10 }}>INBOX</Text>
        </View>
        <View style={{height:40,width:40,margin:10}}>
        <Image  source = {{uri:'https://randomuser.me/api/portraits/med/women/22.jpg'}}
          style = {{width: 40, height: 40, borderRadius: 40 / 2,
            overflow: "hidden",
            borderWidth: 3, }}
      />
        </View>
      </View>
        <View  style={styles.container}>
        <Checkbox 
           style = {{ width: 20, height: 20 }}/>
         <SearchBar

       containerStyle = {{flex: 1,  paddingLeft:10,paddingRight:10,width:'100%',marginTop:5 }}
        placeholder="Search"
        lightTheme={true}
        round={false}
        onChangeText={text => this.searchFilterFunction(text)}
        autoCorrect={false}
        value={this.state.value}
      />
       <Image source = {IMAGENAME}
          style = {{width: 40, height: 40 ,margin:10}}
      />
      </View>
      
      </View>  
      </SafeAreaView>
    );
  };

  render() {
    if (this.state.loading) {
      return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <ActivityIndicator />
        </View>
      );
    }
    return (
      <View style={{ flex: 1 }}>
        <FlatList
          data={this.state.data}
          renderItem={({ item }) => (
            <ListItem
              leftAvatar={{ source: { uri: item.picture.thumbnail } }}
              title={item.name.first}
              subtitle={item.name.last}
              rightSubtitle='Fri sep 25'
              rightTitle = '8.30 AM'
              checkBox ={true}
              chevron={true}
            />
          )}
          keyExtractor={item => item.email}
          ItemSeparatorComponent={this.renderSeparator}
          ListHeaderComponent={this.renderHeader}
        />
      </View>
    );
  }
}
const  styles  =  StyleSheet.create({ container:  {

  flex: 1,
  flexDirection: "row",
  justifyContent:'center',
  alignItems:'center'
  },container1:  {


    flexDirection: "row",
    justifyContent:'space-between',

    }
});
export default MockTest;
