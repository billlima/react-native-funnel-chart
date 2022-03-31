# react-native-funnel-chart

Customizable funnel chart component for React Native

## Installation

```sh
npm install react-native-funnel-chart --save
npm install react-native-svg --save
```

## Usage

```js
import FunnelChart from 'react-native-funnel-chart';

// ...
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
// ...
```

## Properties

| **Property**           | **Default** | **Type**                   | **Description**                                |
|--------------------|---------|------------------------|------------------------------------------------------------|
| data               |         | [DataObject[]](#dataobject)          | Data for the chart, see example. **required**              |
| colors?             |         | string[]               | RGB or Hex colors, e.g.: ['rgb(111,111,111)', '#abaddd']. |
| sort?               | true    | boolean                | If true, data are sorted in descending order.             |
| itemHeight?         | 30      | number                 | Height of chart items.                                    |
| width?              |         | number                 | Width of chart.                                           |
| labelStyle?         |         | any                    | Style of labels (like Stylesheet).                        |
| valueStyle?         |         | any                    | Style of values (like Stylesheet).                        |
| labelNumberOfLines? | 1       | number                 | Max number of lines on each labels.                       |
| formatValueLabel?   |         | function(item) => any  | This function change the format of the display values.    |
| onTextPress?        |         | function(item) => void | callback function when label is pressed.                  |


#### DataObject

Data props is the only required.

| Property | Default | Type   | Description                 |
|----------|---------|--------|-----------------------------|
| value    |         | number | Value of item.              |
| text     |         | string | Label of item.              |
| color?   |         | string | Color of item.              |


## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT
