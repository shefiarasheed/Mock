import * as React from 'react';
import { BottomNavigation, Text } from 'react-native-paper';
import MockTest from './src/screen/MockTest';
import { FAB } from 'react-native-paper';
import { SafeAreaView } from 'react-native';
import { StyleSheet } from 'react-native';
const MusicRoute = () =>  <MockTest />;

const AlbumsRoute = () => <Text></Text>;

const RecentsRoute = () => <Text></Text>;

const groupRoute = () => <Text></Text>;

const APP = () => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'music', title: '', icon: 'mail' },
    { key: 'albums', title: '', icon: 'calendar' },
    { key: 'recents', title: '', icon: 'filter' },
    { key: 'group', title: '', icon: 'publish' },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    music: MusicRoute,
    albums: AlbumsRoute,
    recents: RecentsRoute,
    group: groupRoute,
  });

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
    <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
      barStyle= {{ backgroundColor: '#FFFFFF' }}
    />
    <FAB
    style={styles.fab}
    small
    icon="plus"
    onPress={() => console.log('Pressed')}
  />
  </SafeAreaView>
   
    
  );
};
const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    marginBottom: 100,
    marginRight:20,
    right: 0,
    bottom: 0,
  },
})
export default APP;
