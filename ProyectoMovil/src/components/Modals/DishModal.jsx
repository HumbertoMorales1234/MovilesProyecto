import React, { useState, useEffect } from 'react'
import { FlatList, Image, StyleSheet, Text, View } from 'react-native'
import { FlatList, Image, ImageBackground, StyleSheet, Text, View } from 'react-native'
import { useAppContext } from '../../hooks/useAppContext'
import { IconTextButton } from '../Buttons/IconTextButton'
import { Feather } from '@expo/vector-icons';
import { IconButton } from '../Buttons/IconButton';
import { ReviewCard } from '../Cards/ReviewCard';
import { TouchableOpacity } from 'react-native';

// const review = [
//   {id: 1, text: 'Good product', stars: 5},
//   {id: 2, text: 'Tasty af', stars: 5},
//   {id: 3, text: 'It could be better', stars: 3},
//   {id: 4, text: 'Not bad', stars: 4},
// ]

export const DishModal = ({dish, hideModal}) => {

  const {themeMode, getReviews, handleAddToKart,} = useAppContext()
  const [counter, setCounter] = useState(1)
  const [review, setReview] = useState([])
  
  useEffect( () => {
    const fetchReviews = async () => {
      try {
        const apiData = await getReviews(dish.id)
        setReview(apiData)
      } catch (error) {
        console.log('Error fetching restaurants:', error)
      }
    }
    fetchReviews()
  }, [])

  const averageReview = () =>{
    let mean = 0
    let totalReviews = 0
    review.forEach(element => {
      mean += element.stars
      totalReviews ++
    });
    mean = mean / totalReviews
    return(mean)
  }

  const reduceCounter = () =>{
    if(counter>1){
      setCounter(counter-1)
    }
  }
  
  const increaseCounter = () =>{
    setCounter(counter+1)
  }

  const handleAdd = (hideModal) =>{
    handleAddToKart(dish, counter)
    console.log('added')
    hideModal()
  }

  return (
    <View style={styles(themeMode).container}>
        <ImageBackground source={dish.image} style={styles(themeMode).image} imageStyle={{borderTopLeftRadius: 20, borderTopRightRadius: 20}}>
          <TouchableOpacity onPress={hideModal}>
           <Feather name="x" size={28} color={themeMode.SHADOWCONTRAST} />
          </TouchableOpacity>
        </ImageBackground>

        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <Text style={styles(themeMode).title} >{dish.dishName}</Text>
          <Text style={styles(themeMode).simpleText} >{dish.description}</Text>
          <View style={{flexDirection: 'row', justifyContent:'center', alignItems: 'center', gap: 10}}>
            <Feather name="star" size={24} color={themeMode.GENERALTEXT} />
            <Text style={[styles(themeMode).simpleText, {fontWeight: '600', fontSize: 20}]} >{averageReview()}</Text>
            <Feather name="dollar-sign" size={24} color={themeMode.GENERALTEXT} />
            <Text style={[styles(themeMode).simpleText, {fontWeight: '600', fontSize: 20}]}>{dish.price}</Text>
          </View>
        </View>
        
        <View style={{gap: 5, alignItems: 'center', marginTop: 5}}>
          <View style={{flexDirection: 'row', gap: 10, alignItems: 'center'}}>
            <IconButton iconName={'minus'} onPress={() => reduceCounter()}/>
            <Text style={styles(themeMode).title}>{counter}</Text>
            <IconButton iconName={'plus'} onPress={() => increaseCounter()}/>
          </View>
          <View>
            <Text style={styles(themeMode).subTitle}>Total: {(counter*dish.price).toFixed(2)} $</Text>
          </View>
          <IconTextButton text={'Add to the cart'} iconName={'shopping-cart'} onPress={() => handleAdd(hideModal)}/>
        </View>

        <View>
          <Text style={styles(themeMode).subTitle}>Location: {dish.location}</Text>
          <View>

          </View>
        </View>

        <View>
          <Text style={styles(themeMode).subTitle}>Reviews</Text>
          <View style={{flex: 1}}>
            <FlatList
              data={review}
              renderItem={({item}) => {
                return(
                    <ReviewCard review={item}/>
                )
              }}
            />
          </View>
        </View>
    </View>
  )
}

const styles = (theme) => StyleSheet.create({
  container: {
    width: 400,
    backgroundColor: theme.SHADOW,
    alignItems: 'center',    
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    gap: 10
  },
  image:{
    width: 400,
    height: 150,
    borderRadius: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  title:{
    color: theme.GENERALTEXT,
    fontSize: 25,
    fontWeight: '600',
  },
  subTitle:{
    color: theme.GENERALTEXT,
    marginHorizontal: 10,
    fontSize: 18,
    fontWeight: '500',
  },
  simpleText: {
    color: theme.GENERALTEXT,
    fontSize: 15,
  },
})