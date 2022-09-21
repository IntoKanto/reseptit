import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, FlatList, Image, Alert, Button } from 'react-native';
import React, { useState } from 'react';


export default function App() {
  const [keyword, setKeyword] = useState('');
  const [repo, setRepo] = useState([]);

  


  const getRepos = ()=> {
      fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${keyword}`)
      .then(response => response.json())
      .then(data => setRepo(data.meals))
      .catch(err => 
          Alert.alert('Error', 'error')
      )
      setKeyword('');
  }

  return (
    <View style={styles.container}>
    <FlatList style={styles.lista} 
        data={repo}
        renderItem={({item}) => 
        <View>
        <Text>{item.strMeal}</Text>
        <Image style={styles.image}
        source={{uri:item.strMealThumb}}
        />
        </View>    
            }
    />

    <View>
        <TextInput style ={styles.input}
            value={keyword}
            onChangeText={text => setKeyword(text)}
        />
        <Button 
        title='Find' onPress={getRepos}
    />
    

    
    </View>
</View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30
  },
  lista: {
    marginBottom: 10,
    marginTop: 40
  },
  image: {
    width: 380,
    height: 150
  },
  input: {
        
    width: 150,
    borderWidth:1,
    borderColor: 'blue'
  },
});
