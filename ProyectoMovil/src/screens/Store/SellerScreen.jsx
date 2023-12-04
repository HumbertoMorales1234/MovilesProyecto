import React, { useEffect, useState, useContext } from 'react';
import { Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useAppContext } from '../../hooks/useAppContext';
import { CategoryButton } from '../../components/Buttons/CategoryButton';
import { FlatList } from 'react-native-gesture-handler';
import { DishCard } from '../../components/Cards/DishCard';
import { LocationModal } from '../../components/Modals/LocationModal';

import { IconButton } from '../../components/Buttons/IconButton';
import { useNavigation } from '@react-navigation/native';

export const SellerScreen = ({ navigation, route }) => {

  const { themeMode, getCategories } = useAppContext();

  const [isModalVisible, setModalVisible] = useState(false);
  const { restaurant } = route.params;

  const [filteredDishes, setFilteredDishes] = useState([]);
  const [dishes, setDishes] = useState([]);
  const [filters, setFilters] = useState([]);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const categoriesData = await getCategories();
        const dishesData = restaurant && restaurant.Products ? restaurant.Products : [];
        
        setDishes(dishesData);
        setFilteredDishes(dishesData);
        setFilters(categoriesData.map((element) => ({ text: element.text, isActive: false })));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
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
    const activeFilterTexts = activeFilters
      .filter((filter) => filter.isActive)
      .map((filter) => filter.text);

    if (activeFilterTexts.length !== 0) {
      const filtering = dishes.filter((dish) =>
        activeFilterTexts.every((filterText) =>
          dish.Categories.includes(filterText)
        )
      );
      setFilteredDishes(filtering);
    } else {
      setFilteredDishes(dishes);
    }
  };

  return (
    <View style={styles(themeMode).container}>
      <Image source={{uri:restaurant.image}} style={styles(themeMode).image} />

      <View style ={{flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', paddingHorizontal: 10, gap: 30, width: '100%', paddingVertical: 10}}>
            <IconButton iconName={'arrow-left'} onPress={()=> navigation.goBack()} />
            <Text style={styles(themeMode).title}>{restaurant.restaurantName}</Text>
        </View>

      <View style={{ height: 80, gap: 10, paddingHorizontal: 20 }}>
        <Text style={styles(themeMode).subTitle}>Categories</Text>
        <FlatList
          horizontal
          data={filters}
          renderItem={({ item }) => (
            <CategoryButton
              categoryName={item.text}
              isSelected={item.isActive}
              onPress={() => handlePressFilter({ text: item.text }) }
            />
          )}
        />
      </View>


      <View style={{ gap: 10, flex: 1, paddingHorizontal: 20 }}>
        <Text style={styles(themeMode).subTitle}>Available Products</Text>
        <FlatList
          data={filteredDishes}
          renderItem={({ item }) => <DishCard dish={item} seller={restaurant.id}/>}
        />
      </View>


      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <Text style={styles(themeMode).subTitle}>Location</Text>
      </TouchableOpacity>

      {isModalVisible && (
        <LocationModal
          hideModal={() => setModalVisible(false)}
          coordinates={null}
          address={restaurant.location}
        />
      )}
    </View>
  );
};

const styles = (theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      backgroundColor: theme.BACKGROUND,
      gap: 10,
    },
    image: {
      width: 500,
      height: 200,
    },
    title: {
      marginTop: 10,
      color: theme.GENERALTEXT,
      fontSize: 30,
      fontWeight: '600',
    },
    subTitle: {
      color: theme.GENERALTEXT,
      fontSize: 20,
    },
  });

export default SellerScreen;
