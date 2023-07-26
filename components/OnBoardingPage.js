import * as React from 'react';
import{ View, StyleSheet, TextInput, ScrollView, Text, Image, Button,Alert} from 'react-native';
import logo from '../assets/logo.JPG'

export default function OnBoardingPage(){
  
const [firstName, onChangeFirstName] = React.useState(''); 
const [lastName, onChangeLastName] = React.useState(''); 


  return(
      <ScrollView style={styles.container}>
            <Image style={styles.logo} source={require('../assets/logo.JPG')}/>
        <Text style={styles.paragraph}>
         Let us get to know you.
        </Text>
       <Text>First Name:</Text> 
 <TextInput
  value={firstName}
  onChangeText={onChangeFirstName}
   style={styles.input}/>
  <Text>Last Name:</Text> 
    <TextInput
  value={lastName}
  onChangeText={onChangeLastName}
   style={styles.input}/>
<Button
          title="Next"
          borderColor="#393646"
          backgroundColor="#9BABB8"
          onPress={() => Alert.alert('Right button pressed')}
        />
      </ScrollView>
  )
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'#F5F5F5'
  },
  paragraph: {
    margin: 24,
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
  },
input: {
height:10,
margin:15,
borderWidth:1,
padding:10,
fontSize:16,
borderColor:'#393646',
backgroundColor:'#9BABB8',
  },
  logo: {
    height: 300,
    width: 300,
    align: 'center',
  }



})