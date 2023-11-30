import React, { useEffect, useState } from 'react'
import { Button, FlatList, StyleSheet, Text, View } from 'react-native'
import { useAppContext } from '../../hooks/useAppContext'
import { SearchBar } from '../../components/Inputs/SearchBar'
import { CategoryButton } from '../../components/Buttons/CategoryButton'
import { Bread, Cocktail, Fig, Xmas } from '../../../assets'
import { RestauranCard } from '../../components/Cards/RestauranCard'
import { useNavigation } from '@react-navigation/native'

const Categories = [
  {id: 1, text: 'Vegan', isActive: false},
  {id: 2, text: 'Categoria2', isActive: false},
  {id: 3, text: '🌶️ Spicy', isActive: false},
]

export const HomeScreen = () => {

  const {getRestaurants} = useAppContext()

  const {themeMode} = useAppContext()
  const [filters, setFilters] = useState([])
  const [searching, setSearching] = useState('')
  const [filteredRestaurants, setFilteredRestaurants] = useState([])
  const [Restaurants, setRestaurants] = useState([])
  const navigation = useNavigation()

  useEffect( () => {
    setFilters([])
    const handleFilterSetting = () => {
      Categories.forEach(element => {
        setFilters(prevFilters => [...prevFilters, { text: element.text, isActive: false }]);
      });
    }
    handleFilterSetting()

    const fetchRestaurants = async () => {
      try {
        const apiData = await getRestaurants()
        setFilteredRestaurants(apiData)
        setRestaurants(apiData)
        console.log(apiData)
      } catch (error) {
        console.log('Error fetching restaurants:', error)
      }
    }
    fetchRestaurants()
  }, [])
    

  const handlePressFilter = (filterName) =>{
    const mappedFilter = filters.map(filter =>{
      if (filter.text === filterName.text){
        return { 
          text: filter.text, 
          isActive: !(filter.isActive), 
        }
      }
      return filter
    })
    setFilters(mappedFilter)
    Filtering(mappedFilter)
  }
  
  const handleSearch = (text) =>{
    handleClearFilters()
    setSearching(text)
    const searching = Restaurants.filter(restaurant => restaurant.restaurantName.toLowerCase().includes(text.toLowerCase()))
    setRestaurants(searching)
  }

  const handleClearFilters = ()=>{
    const clearedFilters = filters.map((filter) => {
      return{
        ...filter,
        isActive: filter.isActive=false,
      }
    })
    setFilters(clearedFilters)
    setRestaurants(Restaurants)
  }

  const Filtering = (activeFilters) => {
    setSearching('')
    const activeFilterTexts = activeFilters.filter((filter) => filter.isActive).map(filter => filter.text);
    if (activeFilterTexts.length !== 0) {
      console.log(activeFilterTexts);
      const filtering = Restaurants.filter(restaurant =>
        activeFilterTexts.every(filterText =>
          restaurant.Categories.includes(filterText)
        )
      );
      setFilteredRestaurants(filtering);
    } else {
      setFilteredRestaurants(Restaurants);
    }
  }; 

  const handleRestaurantPressed = (restaurant) =>{
    navigation.navigate('Restaurant', {restaurant: restaurant})
  }

  return (
    <View style={styles(themeMode).container}>
        <View>
          <SearchBar placeholder={'Search for something tasty...'} value={searching} onChangeText={(value) => handleSearch(value)}/>
        </View>
        
        <View style={{height: 80, gap: 10, paddingHorizontal: 20}}>
          <View style={{flexDirection: 'row', alignItems: 'center', gap: 20}}>
            <Text style={styles(themeMode).tittle}>Categories</Text>
            <CategoryButton categoryName={'Clear Filters'} onPress={() => handleClearFilters()} />
          </View>
            <FlatList horizontal data={filters}
            renderItem={({item}) => {return(<CategoryButton categoryName={item.text} isSelected={item.isActive} onPress={() => {handlePressFilter({text:item.text})}} />)}}/>
        </View>

        <View style={{gap: 10, flex: 1}}>
            <Text style={styles(themeMode).tittle}>Restaurants and Sellers</Text>
            
            <FlatList
              numColumns={2}
              columnWrapperStyle={{ justifyContent:'space-around', gap: 20, marginBottom: 5}}
              data ={filteredRestaurants}
              renderItem={({item}) => {
                return(
                    <RestauranCard item={item} onPress={() => handleRestaurantPressed(item)}/>
                )
              }}
            />
        </View>
    </View>
  )
}

const styles = (theme) => StyleSheet.create({
  container:{
    backgroundColor: theme.BACKGROUND,
    flex: 1,
    paddingTop: 20,
    alignItems: 'center',
    gap: 20,
  },
  tittle:{
    color: theme.GENERALTEXT,
    fontSize: 20,
    fontWeight: '600',
  }
})