import React from 'react';
import {View, StyleSheet, TextInput} from 'react-native';
import {MainContext, useContext} from '../../context/MainContext';

function Search(): React.JSX.Element {
  const context = useContext(MainContext);

  const searchFilter = text => {
    const newData = context.getData.filter(item => {
      const listItem = `${item.name.first.toLowerCase()} ${item.name.last.toLowerCase()} ${item.location.state.toLowerCase()}`;
      return listItem.indexOf(text.toLowerCase()) > -1;
    });
    context.setUpdata(newData);
  };
  return (
    <View style={style.seacrh}>
      <TextInput
        placeholder="Search.."
        onChangeText={text => {
          searchFilter(text);
        }}
        style={style.seacrhInner}
      />
    </View>
  );
}

const style = StyleSheet.create({
  seacrh: {
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  seacrhInner: {
    paddingVertical: 10,
    padding: 10,
    backgroundColor: '#fafafa',
  },
});

export default Search;