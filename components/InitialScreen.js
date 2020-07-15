import React from 'react';
import {View, Image} from 'react-native';

const BG_IMAGE = require('./images/start-screen.png');
import styles from './common/form.styles';

function InitialScreen() {
  return (
    <View style={styles.container}>
      <Image source={BG_IMAGE} style={styles.bgImage} />
    </View>
  );
}

export {InitialScreen};
