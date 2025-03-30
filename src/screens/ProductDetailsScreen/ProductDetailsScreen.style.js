import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  content: {
    padding: 16,
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: 300,
    resizeMode: 'contain',
    borderRadius: 10,
    marginBottom: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    alignSelf: 'flex-start',
    textAlign: 'left',
    color: '#1e1e1e',
    marginBottom: 10,
  },
  price: {
    alignSelf:'flex-start',
    fontSize: 20,
    fontWeight: 'bold',
    color: '#007BFF',
    marginBottom: 5,
  },
  rating: {
    alignSelf:'flex-start',
    fontSize: 18,
    fontWeight:'300',
    color: '#FFA500',
    marginBottom: 10,
  },
  ratingRate:{
    alignSelf:'flex-start',
    fontSize: 13,
    color: '#FFA500',
  },
  productDescription: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    alignSelf: 'flex-start',
    textAlign: 'center',
  },
  description: {
    fontSize: 15,
    fontWeight: '500',
    color: '#1e1e1e',
    alignSelf: 'flex-start',
    textAlign: 'justify',
    lineHeight: 20,
  },
  dollar: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#1e1e1e',
  },
  addToCart: {
    elevation: 2,
    marginTop: 15,
    borderRadius: 5,
    padding: 10,
    backgroundColor: '#466379',
  },
  addToCartText: {
    fontSize: 20,
    color: '#fff',
    textAlign: 'center',
    lineHeight: 20,
    paddingHorizontal: 10,
  },
});
export default styles;
