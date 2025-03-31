import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#D7F8E3',
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
    fontSize: 22,
    fontWeight: 'bold',
    color: '#466379',
    marginBottom: 20,
  },
  input: {
    marginVertical:10,
    width: '80%',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#466379',
    borderRadius: 5,
    marginBottom: 20,
    textAlign: 'center',
    fontSize: 16,
  },
  button: {
    marginTop:5,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#466379',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  letsGo: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 10,
  },
});
