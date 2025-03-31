import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  header: {
    flexDirection: 'row',  
    backgroundColor: '#466379',
    paddingHorizontal: 15, 
    paddingVertical: 10, 
    alignItems: 'center', 
    justifyContent: 'space-between',  
  },
  headerLeft: {
    flexDirection: 'row', 
    alignItems: 'center', 
  },
  welcomeTextName:{
   color:'#fff'
  },
  headerRight: {
    alignItems: 'center',  
  },
  logo: {
    width: 40,  
    height: 40, 
    borderRadius:50,
    resizeMode: 'contain', 
  },
  searchInput: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  categoryButton: {
    padding: 10,
    backgroundColor: '#636263',
    marginRight: 10,
    borderRadius: 5,
  },
  selectedCategory: {
    padding: 10,
    backgroundColor: '#466379',
    marginRight: 10,
    borderRadius: 5,
  },
  categoryText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#fff',
  },
  productCard: {
    flex: 1,
    alignItems: 'center',
    alignItems: 'center',
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    backgroundColor: '#fff',
    width: '48%',
  },
  productImage: {
    width: 100,
    height: 100,
    alignSelf: 'center',
    resizeMode: 'contain',
  },
  productTitle: {
    marginVertical: 5,
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  dollar: {
    marginVertical: 5,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  productPrice: {
    alignSelf: 'center',
    marginVertical: 5,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#007bff',
  },
  rating: {
    alignSelf: 'center',
    fontSize: 15,
    color: '#FFA500',
    marginBottom: 10,
  },
  reviewText: {
    fontSize: 15,
    color: '#000',
    marginBottom: 10,
  },
  seeOptions: {
    alignSelf: 'center',
    elevation: 2,
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 5,
    backgroundColor: '#466379',
  },
  seeOptionsText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#fff',
  },
  loaderContainer:{
    backgroundColor:'#FFF',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default styles;
