
import React, { FC } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Root from './src/Root'
import { NavigationContainer } from '@react-navigation/native'

interface IProps {}

/**
* @author
* @function @app
**/


 const App :FC<IProps> = (props) => { 

const { container } = styles
 return(
<Root/>
  
  )
}


const styles = StyleSheet.create({
  container: {
   flex:1,
   justifyContent: 'center',
   alignItems: 'center',
 }
})

export default App;