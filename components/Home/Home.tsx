import {useEffect} from 'react';
import Repostory from '../../api/Repostory';
import {MainContext, useContext} from '../../context/MainContext';
import {
  Text,
  FlatList,
  View,
  Image,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';

function Home(this: any): React.JSX.Element {
  const context = useContext(MainContext);
  useEffect(() => {
    getUserData();
  }, []);

  const renderFooter = () => {
    if (!context.loader) {
      return null;
    }
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" />
      </View>
    );
  };

  const renderItem = ({item, index}) => {
    return (
      <View
        style={[
          styles.listITem,
          {backgroundColor: index % 2 === 1 ? '#fafafa' : ''},
        ]}>
        <Image style={styles.avatar} source={{uri: item.picture.thumbnail}} />
        <View>
          <Text>{item.name.first + ' ' + item.name.last}</Text>
          <Text>{item.location.state}</Text>
        </View>
      </View>
    );
  };

  const loadMore = () => {
    if (!this.duringMomentum) {
      context.setLoader(true);
      context.setPage = +1;
      getUserData();
      this.duringMomentum = true;
    }
  };

  const onRefresh = () => {
    context.setRefreshing(true);
    console.log('onRefresh');
    console.log(context.refreshing);
    context.setPage(1);
    getUserData();
  };

  const getUserData = async () => {
    const response = await Repostory({size: 10, page: context.page});
    const user = [...context.updata, ...response];
    if (context.refreshing) {
      user.reverse();
    }
    context.setGetData(user);
    context.setUpdata(user);
    context.setRefreshing(false);
  };

  return (
    <View>
      <FlatList
        style={styles.flatList}
        data={context.updata}
        renderItem={renderItem}
        keyExtractor={item => item.login.uuid}
        ListFooterComponent={renderFooter}
        onEndReached={loadMore}
        onEndReachedThreshold={0}
        onMomentumScrollBegin={() => {
          this.duringMomentum = false;
        }}
        refreshing={context.refreshing}
        onRefresh={onRefresh}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  flatList: {
    marginBottom: 100,
  },
  listITem: {
    borderBottomWidth: 1,
    borderColor: '#eee',
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 100,
    marginRight: 10,
    backgroundColor: '#eee',
  },
  noDate: {
    fontSize: 17,
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'red',
    padding: 20,
    textAlign: 'center',
  },
  loader: {
    paddingVertical: 30,
  },
});

export default Home;
