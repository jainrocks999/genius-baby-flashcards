import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View, Image} from 'react-native';
import styles from './styles';
import Helper from './helper';
type props = {
  title: string;
  onPress: (val: string) => void;
  value: string;
};
const Radio: React.FC<props> = ({title, onPress, value}) => {
  return (
    <View style={styles.container}>
      <View style={styles.txtContainer}>
        <Text style={styles.txt}>{title}</Text>
      </View>
      <View style={styles.cicleContainer}>
        <Helper
          value={value === 'easy'}
          onPress={() => onPress('easy')}
          name="Easy"
        />
        <Helper
          value={value === 'medium'}
          onPress={() => onPress('medium')}
          name="Medium"
        />
        <Helper
          value={value === 'hard'}
          onPress={() => onPress('hard')}
          name="Hard"
        />
      </View>
    </View>
  );
};

export default Radio;
