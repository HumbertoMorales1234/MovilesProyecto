import React, { useEffect, useState } from 'react'
import { Button, FlatList, StyleSheet, Text, View } from 'react-native'
import { useAppContext } from '../../hooks/useAppContext'
import { SearchBar } from '../../components/Inputs/SearchBar'
import { CategoryButton } from '../../components/Buttons/CategoryButton'
import { RestauranCard } from '../../components/Cards/RestauranCard'
import { useNavigation } from '@react-navigation/native'

export const HomeScreen = () => {
  const { getRestaurants, getCategories } = useAppContext()
  const { themeMode } = useAppContext()
  const [filters, setFilters] = useState([])
  const [searching, setSearching] = useState('')
  const [filteredRestaurants, setFilteredRestaurants] = useState([])
  const [Restaurants, setRestaurants] = useState([])
  const [Categories, setCategories] = useState([])
  const navigation = useNavigation()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const categoriesData = await getCategories()
        setCategories(categoriesData)

        const restaurantsData = await getRestaurants()
        setFilteredRestaurants(restaurantsData)
        setRestaurants(restaurantsData)

        handleFilterSetting(categoriesData)
      } catch (error) {
        console.log('Error fetching data:', error)
      }
    }

    fetchData()
  }, [])

  const handleFilterSetting = (categoriesData) => {
    setFilters(
      categoriesData.map(category => ({ text: category.text, isActive: false }))
    )
  }

  const handlePressFilter = (filterName) => {
    const mappedFilter = filters.map(filter => {
      if (filter.text === filterName.text) {
        return {
          text: filter.text,
          isActive: !filter.isActive,
        }
      }
      return filter
    })

    setFilters(mappedFilter)
    Filtering(mappedFilter)
  }

  const handleSearch = (text) => {
    handleClearFilters()
    setSearching(text)

    const filtered = Restaurants.filter(
      (restaurant) =>
        restaurant.restaurantName.toLowerCase().includes(text.toLowerCase())
    )

    setFilteredRestaurants(filtered)

  }

  const handleClearFilters = () => {
    const clearedFilters = filters.map((filter) => ({
      ...filter,
      isActive: false,
    }))

    setFilters(clearedFilters)

    setFilteredRestaurants(Restaurants)

  }

  const Filtering = (activeFilters) => {
    setSearching('')
    const activeFilterTexts = activeFilters
      .filter((filter) => filter.isActive)
      .map((filter) => filter.text)

    if (activeFilterTexts.length !== 0) {
      const filtering = Restaurants.filter((restaurant) =>
        activeFilterTexts.every((filterText) =>
          restaurant.Categories.includes(filterText)
        )
      )
      setFilteredRestaurants(filtering)
    } else {
      setFilteredRestaurants(Restaurants)
    }
  }

  const handleRestaurantPressed = (restaurant) => {
    navigation.navigate('Restaurant', { restaurant })
  }

  return (
    <View style={styles(themeMode).container}>
        <View>
          <SearchBar placeholder={'Search for something tasty...'} value={searching} onChangeText={(value) => handleSearch(value)}/>
        </View>
        
        <View style={{height: 80, gap: 10, paddingHorizontal: 20}}>
          <View style={{flexDirection: 'row', alignItems: 'center', gap: 20}}>
            <Text style={styles(themeMode).title}>Categories</Text>
            <CategoryButton categoryName={'Clear Filters'} onPress={() => handleClearFilters()} />
          </View>
            <FlatList horizontal data={filters} showsHorizontalScrollIndicator={false}
            renderItem={({item}) => {return(<CategoryButton categoryName={item.text} isSelected={item.isActive} onPress={() => {handlePressFilter({text:item.text})}} />)}}/>
        </View>

      <View style={{ gap: 10, flex: 1 }}>
        <Text style={styles(themeMode).title}>Restaurants and Sellers</Text>
        <FlatList
          numColumns={2}
          columnWrapperStyle={{
            justifyContent: 'space-around',
            gap: 20,
            marginBottom: 5,
          }}
          data={filteredRestaurants}
          renderItem={({ item }) => (
            <RestauranCard
              item={item}
              onPress={() => handleRestaurantPressed(item)}
            />
          )}
        />
      </View>
    </View>
  )
}

const styles = (theme) =>
  StyleSheet.create({
    container: {
      backgroundColor: theme.BACKGROUND,
      flex: 1,
      paddingTop: 20,
      alignItems: 'center',
      gap: 20,
    },
    title: {
      color: theme.GENERALTEXT,

      fontSize: 25,
      fontWeight: '500',
    },
  })
