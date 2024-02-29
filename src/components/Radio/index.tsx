import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View, Image} from 'react-native';
import styles from './styles';
import Helper from './helper';
type props = {
  title: string;
  onPress: (val: boolean) => void;
  value: boolean;
};
const Radio: React.FC<props> = ({title, onPress, value}) => {
  const [selected, setSelected] = useState({
    easy: true,
    medium: false,
    hard: false,
  });
  const handleOnPress = (name: string) => {
    setSelected(prev => ({
      ...prev,
      easy: name === 'easy',
      medium: name === 'medium',
      hard: name === 'hard',
    }));
  };
  return (
    <View style={styles.container}>
      <View style={styles.txtContainer}>
        <Text style={styles.txt}>{title}</Text>
      </View>
      <View style={styles.cicleContainer}>
        <Helper
          value={selected.easy}
          onPress={() => handleOnPress('easy')}
          name="Easy"
        />
        <Helper
          value={selected.medium}
          onPress={() => handleOnPress('medium')}
          name="Medium"
        />
        <Helper
          value={selected.hard}
          onPress={() => handleOnPress('hard')}
          name="Hard"
        />
      </View>
    </View>
  );
};

export default Radio;
