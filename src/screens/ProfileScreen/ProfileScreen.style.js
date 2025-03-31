import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#466379',
    padding: 20,
  },
  image: {
    width: 200,  
    height: 200,
    resizeMode: 'contain',
    marginBottom: 40,
    borderRadius:50,
  },
  welcomeText: {
    marginTop:30,
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
  },
  letsGo: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 10,
  },
});

export default styles
