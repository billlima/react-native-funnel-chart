import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  chartContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  chartItemContainer: {
    alignItems: 'center',
  },
  svg: {
    marginTop: -1,
  },
  textContainer: {
    justifyContent: 'center',
  },
  labelsContainer: {
    textAlign: 'right',
    paddingRight: 10,
  },
  valuesContainer: {
    textAlign: 'left',
    paddingLeft: 10,
  },
  lineContainer: {
    width: '100%',
    height: 1,
    overflow: 'hidden',
  },
  lineStyle: {
    height: 2,
    borderRadius: 1,
    borderStyle: 'dashed',
    borderWidth: 1,
    borderColor: 'rgba(161,155,183,1)',
  },
  textRight: {
    textAlign: 'right',
  },
  textLeft: {
    textAlign: 'left',
  },
});

export default styles;
