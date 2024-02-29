import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import styles from './styles';
type props = {
  name: string;
  onPress: () => void;
  value: boolean;
};
const Helper: React.FC<props> = ({value, name, onPress}) => {
  return (
    <View style={styles.circle2}>
      <TouchableOpacity onPress={onPress} style={styles.circle}>
        {value ? <View style={styles.innerCercle}></View> : null}
      </TouchableOpacity>
      <Text style={styles.txt2}>{name}</Text>
    </View>
  );
};

export default Helper;
