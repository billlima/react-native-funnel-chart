import * as React from 'react';

import { StyleSheet, Text, View } from 'react-native';
import FunnelChart from 'react-native-funnel-chart';

export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Funnel Chart</Text>
        <FunnelChart
          data={[
            { text: 'Sueli Carneiro', value: 450 },
            { text: 'Elisa Lucinda', value: 320 },
            { text: 'Cruz e Sousa', value: 1540 },
            { text: 'Conceição Evaristo', value: 897 },
            { text: 'Elisa Lucinda', value: 1044 },
            { text: 'Luiz Gama', value: 902 },
            { text: 'Carolina de Jesus', value: 1222 },
            { text: 'Machado de Assis', value: 1345 },
            { text: 'Maria dos Reis', value: 1111 },
          ]}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  container: {
    paddingTop: 20,
    paddingHorizontal: 20,
    height: '100%',
  },
  card: {
    alignItems: 'center',
    width: '100%',
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.26,
    elevation: 5,
    backgroundColor: 'white',
    paddingVertical: 20,
    borderRadius: 10,
  },
});
