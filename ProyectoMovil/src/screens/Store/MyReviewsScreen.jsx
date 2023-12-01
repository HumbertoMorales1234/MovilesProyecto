import React, { useEffect, useState } from 'react'
import { useAppContext } from '../../hooks/useAppContext'
import { StyleSheet, Text, View } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import { MyReviewCard } from '../../components/Cards/MyReviewCard'
import { IconButton } from '../../components/Buttons/IconButton'
import { useNavigation } from '@react-navigation/native'

// const my_Reviews = [
//     {id:1, texto: 'Esta bueno',                         calificacion: 4, producto: 'Ramen de Pollo'},
//     {id:2, texto: 'Estan exquisitos',                   calificacion: 5, producto: 'Tacos Dorados'},
//     {id:3, texto: 'El pollo loco siempre tan bueno',    calificacion: 5, producto: 'Pollo Loco'},
//     {id:4, texto: 'Estaba frío pero decente',           calificacion: 3, producto: 'Sope de pollo'},
//     {id:5, texto: 'Le faltaba azúcar',                  calificacion: 3, producto: 'Agua de jamaica'},
//     {id:6, texto: 'Estaba fría y sabia raro',           calificacion: 2, producto: 'Hamburguesa Tradicional'},
// ]

export const MyReviewsScreen = () => {
    const {themeMode, getMyReviews} = useAppContext()
    const [reviews, setReviews] = useState([])
    const [myReviews, setmyReviews] = useState([])

    const navigation = useNavigation()


    useEffect(() => {
      const fetchData = async () => {
        try {
          const apiData = await getMyReviews();
          setmyReviews(apiData);
    
          const processedReviews = apiData.map(review => ({
            texto: review.texto,
            calificacion: review.calificacion,
            producto: review.producto,
          }));
    
          setReviews(processedReviews);
        } catch (error) {
          console.log('Error fetching reviews:', error);
        }
      };
    
      fetchData();
    }, []);

  return (
    <View style={styles(themeMode).container}>
      <View style ={{flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', paddingHorizontal: 10, gap: 30, width: '100%', paddingVertical: 10}}>
            <IconButton iconName={'arrow-left'} onPress={()=> navigation.goBack()} />
            <Text style={styles(themeMode).title}>My Reviews</Text>
      </View>

        <View style={{gap: 10, flex: 1}}>            
            <FlatList
              data ={reviews}
              renderItem={({item}) => {
                return(
                    <MyReviewCard review={item}/>
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
        justifyContent: 'center'
    },
    title:{
        color: theme.GENERALTEXT,
        fontSize: 30,
        fontWeight: '500',
    },
})
