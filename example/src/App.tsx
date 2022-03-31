import * as React from 'react';

import { StyleSheet, Text, View } from 'react-native';
import FunnelChart from 'react-native-funnel-chart';

export default function App() {
  return (
    <View style={styles.container}>
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
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginVertical: 20,
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
});
