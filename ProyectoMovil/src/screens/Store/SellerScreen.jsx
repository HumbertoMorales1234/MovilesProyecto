import React, { useEffect, useState } from 'react'
import { Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { useAppContext } from '../../hooks/useAppContext'
import { Ramen } from '../../../assets'
import { CategoryButton } from '../../components/Buttons/CategoryButton'
import { FlatList } from 'react-native-gesture-handler'
import { DishCard } from '../../components/Cards/DishCard'
import { LocationModal } from '../../components/Modals/LocationModal'

// const Categories = [
//   {id: 1, text: '🌿 Vegan', isActive: false},
//   {id: 2, text: '🌶️ Spicy', isActive: false},
//   {id: 3, text: '🇲🇽 Mexican', isActive: false},
//   {id: 4, text: '🍨 Dessert', isActive: false},
//   {id: 5, text: '🍝 Pasta', isActive: false},
//   {id: 6, text: '🍕 Pizza', isActive: false},
// ]

const Categories = [
  {id: 1, text: 'Vegan', isActive: false},
  {id: 2, text: 'Categoria2', isActive: false},
  {id: 3, text: '🌶️ Spicy', isActive: false},
]

// const dishes = [
//   {id: 1, description: 'Here should be a description of the product', price: '140.00', dishName:'Ramen de Verduras', image: Ramen, Categories: ['🌿 Vegan', '🌶️ Spicy']},
//   {id: 2, description: 'Here should be a description of the product', price: '170.00', dishName:'Ramen de Pollo', image: Ramen, Categories: ['🌶️ Spicy']},
//   {id: 3, description: 'Here should be a description of the product', price: '180.00', dishName:'Ramen de Res', image: Ramen, Categories: ['🌶️ Spicy']},
//   {id: 4, description: 'Here should be a description of the product', price: '160.00', dishName:'Ramen de Champiñones', image: Ramen, Categories: ['🌿 Vegan']},
// ]

  
export const SellerScreen = ({navigation, route}) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const {restaurant} = route.params
  const {themeMode} = useAppContext()
  const [filteredDishes, setFilteredDishes] = useState([])
  const [dishes, setDishes] = useState([])
  const [filters, setFilters] = useState([])

  useEffect( () => {
    setFilters([])
    const getDishes = () => {
      if (restaurant && restaurant.Products) {
        setDishes(restaurant.Products)
        setFilteredDishes(restaurant.Products)
        // console.log(restaurant.Products)
      }
    }
    getDishes()
    const handleFilterSetting = () => {
      Categories.forEach((element) => {
        setFilters((prevFilters) => [...prevFilters, { text: element.text, isActive: false }]);
      });
    };
    handleFilterSetting();
  }, []);

  const handlePressFilter = (filterName) => {
    const mappedFilter = filters.map((filter) => {
      if (filter.text === filterName.text) {
        return {
          text: filter.text,
          isActive: !filter.isActive,
        };
      }
      return filter;
    });
    setFilters(mappedFilter);
    Filtering(mappedFilter);
  };

  const Filtering = (activeFilters) => {
    const activeFilterTexts = activeFilters.filter((filter) => filter.isActive).map((filter) => filter.text);
    if (activeFilterTexts.length !== 0) {
      const filtering = dishes.filter((dish) =>
        activeFilterTexts.every((filterText) => dish.Categories.includes(filterText))
      );
      setFilteredDishes(filtering);
    } else {
      setFilteredDishes(dishes);
    }
  };

  return (
    <View style={styles(themeMode).container}>
      <Image source={restaurant.image} style={styles(themeMode).image} />
      <Text style={styles(themeMode).title}>{restaurant.restaurantName}</Text>

      <View style={{ height: 80, gap: 10, paddingHorizontal: 20 }}>
        <Text style={styles(themeMode).subTitle}>Categories</Text>
        <FlatList
          horizontal
          data={filters}
          renderItem={({ item }) => (
            <CategoryButton categoryName={item.text} isSelected={item.isActive} onPress={() => handlePressFilter({ text: item.text })} />
          )}
        />
      </View>

      <View style={{ gap: 10, flex: 1, paddingHorizontal: 20 }}>
        <Text style={styles(themeMode).subTitle}>Available Products</Text>
        <FlatList data={filteredDishes} renderItem={({ item }) => <DishCard dish={item} />} />
      </View>

      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <Text style={styles(themeMode).subTitle}>Location</Text>
      </TouchableOpacity>

      {isModalVisible && (
        <LocationModal
          hideModal={() => setModalVisible(false)}
          coordinates={null} 
          address={'Durango 568 Isaac Arriaga'}
        />
      )}
    </View>
  );
};

const styles = (theme) => StyleSheet.create({
  container:{
    flex: 1, 
    alignItems: 'center',
    backgroundColor: theme.BACKGROUND, 
    gap: 10,
  },
  image:{
    width: 500, 
    height: 200,
  },
  title:{
    marginTop: 10,
    color: theme.GENERALTEXT,
    fontSize: 30, 
    fontWeight: '600'
  },
  subTitle:{
    color: theme.GENERALTEXT,
    fontSize: 20,
  },
})

