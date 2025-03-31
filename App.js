import React from 'react';
import TabNavigaton from './src/TabNavigation';
import {Provider} from 'react-redux';
import store from './src/redux/store';

const App = () => {
  return (
    <Provider store={store}>
      <TabNavigaton />
    </Provider>
  );
};

export default App;
