import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  Image,
  TouchableOpacity,
  StatusBar,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import styles from './HomeScreen.style';
import {useNavigation} from '@react-navigation/native';
import Icons from '../../assets';
import {useSelector} from 'react-redux';

const ProductListScreen = () => {
  const navigation = useNavigation();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [loading, setLoading] = useState(true); 
  const userName = useSelector(state => state.user.userName);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true); 
      const response = await fetch('https://fakestoreapi.com/products');
      const data = await response.json();
      setProducts(data);
      setFilteredProducts(data);
      const uniqueCategories = [...new Set(data.map(item => item.category))];
      setCategories(uniqueCategories);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = text => {
    setSearch(text);
    filterProducts(text, selectedCategory);
  };

  const handleCategorySelect = category => {
    setSelectedCategory(category);
    filterProducts(search, category);
  };

  const filterProducts = (searchText, category) => {
    let filtered = products;
    if (category) {
      filtered = filtered.filter(item => item.category === category);
    }
    if (searchText) {
      filtered = filtered.filter(item =>
        item.title.toLowerCase().includes(searchText.toLowerCase()),
      );
    }
    setFilteredProducts(filtered);
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
    if (isSearchOpen) {
      setSearch('');
      setSelectedCategory('');
      setFilteredProducts(products);
    }
  };

  const renderItem = item => {
    const renderStars = rate => {
      const totalStars = 5;
      const fullStars = Math.floor(rate);
      const stars = [];

      for (let i = 0; i < totalStars; i++) {
        stars.push(i < fullStars ? '★' : '☆');
      }

      return stars.join(' ');
    };

    return (
      <View style={styles.productCard}>
        <TouchableOpacity
          onPress={() => navigation.navigate('ProductDetail', {item})}>
          <Image source={{uri: item.image}} style={styles.productImage} />
          <Text numberOfLines={1} style={styles.productTitle}>
            {item.title}
          </Text>
          <Text style={styles.productPrice}>
            <Text style={styles.dollar}>$</Text> {item.price}
          </Text>
          <Text style={styles.rating}>
            {renderStars(item?.rating?.rate)}
            <Text style={styles.reviewText}>({item?.rating?.count})</Text>
          </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('ProductDetail', {item})}
            style={styles.seeOptions}>
            <Text style={styles.seeOptionsText}>More options</Text>
          </TouchableOpacity>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <StatusBar backgroundColor="#466379" barStyle="light-content" />

      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Image
            source={require('../../assets/logo.png')}
            style={styles.logo}
          />
        </View>
        <View>
          <Text
            style={{
              fontSize: 18,
              fontWeight: 'bold',
              fontFamily: 'lucida grande',
              paddingRight: 5,
            }}>
            Welcome
            <Text style={styles.welcomeTextName}>{` ${userName}!!!`}</Text>
          </Text>
        </View>
        <View style={styles.headerRight}>
          <TouchableOpacity onPress={toggleSearch}>
            <Icons
              name={isSearchOpen ? 'Close' : 'Search'}
              fill={'#E0E0E0'}
              width={'25'}
              height={'25'}
              stroke={'#E0E0E0'}
            />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.container}>
        {isSearchOpen && (
          <View>
            <TextInput
              style={styles.searchInput}
              placeholder="Search products..."
              value={search}
              onChangeText={handleSearch}
            />

            <FlatList
              horizontal
              data={categories}
              keyExtractor={item => item}
              renderItem={({item}) => (
                <TouchableOpacity
                  style={[
                    styles.categoryButton,
                    selectedCategory === item && styles.selectedCategory,
                  ]}
                  onPress={() => handleCategorySelect(item)}>
                  <Text style={styles.categoryText}>{item}</Text>
                </TouchableOpacity>
              )}
              showsHorizontalScrollIndicator={false}
            />
          </View>
        )}

        {loading ? (
          <View style={styles.loaderContainer}>
            <ActivityIndicator size="large" color="#466379" />
          </View>
        ) : (
          <View style={{marginVertical: 10}}>
            <FlatList
              data={filteredProducts}
              keyExtractor={item => item.id.toString()}
              numColumns={2}
              columnWrapperStyle={{gap: 10, paddingHorizontal: 10}}
              renderItem={({item}) => renderItem(item)}
              showsVerticalScrollIndicator={false}
            />
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default ProductListScreen;
