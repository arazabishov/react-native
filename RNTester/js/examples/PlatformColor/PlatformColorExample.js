/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 * @flow
 */

'use strict';

const React = require('react');
const ReactNative = require('react-native');
const {PlatformColor, StyleSheet, Text, View} = ReactNative;
import {IOSDynamicColor} from '../../../../Libraries/StyleSheet/NativeColorValueTypes';

type State = {};

class SemanticColorsExample extends React.Component<{}, State> {
  state: State;

  createTable() {
    let colors = [
      // https://developer.apple.com/documentation/uikit/uicolor/ui_element_colors
      // Label Colors
      'labelColor',
      'secondaryLabelColor',
      'tertiaryLabelColor',
      'quaternaryLabelColor',
      // Fill Colors
      'systemFillColor',
      'secondarySystemFillColor',
      'tertiarySystemFillColor',
      'quaternarySystemFillColor',
      // Text Colors
      'placeholderTextColor',
      // Standard Content Background Colors
      'systemBackgroundColor',
      'secondarySystemBackgroundColor',
      'tertiarySystemBackgroundColor',
      // Grouped Content Background Colors
      'systemGroupedBackgroundColor',
      'secondarySystemGroupedBackgroundColor',
      'tertiarySystemGroupedBackgroundColor',
      // Separator Colors
      'separatorColor',
      'opaqueSeparatorColor',
      // Link Color
      'linkColor',
      // Nonadaptable Colors
      'darkTextColor',
      'lightTextColor',
      // https://developer.apple.com/documentation/uikit/uicolor/standard_colors
      // Adaptable Colors
      'systemBlueColor',
      'systemBrownColor',
      'systemGreenColor',
      'systemIndigoColor',
      'systemOrangeColor',
      'systemPinkColor',
      'systemPurpleColor',
      'systemRedColor',
      'systemTealColor',
      'systemYellowColor',
      // Adaptable Gray Colors
      'systemGrayColor',
      'systemGray2Color',
      'systemGray3Color',
      'systemGray4Color',
      'systemGray5Color',
      'systemGray6Color',
    ];

    let table = [];
    for (let color of colors) {
      table.push(
        <View style={styles.row} key={color}>
          <Text style={styles.labelCell}>{color}</Text>
          <View
            style={{
              ...styles.colorCell,
              backgroundColor: PlatformColor(`${color}`),
            }}
          />
        </View>,
      );
    }
    return table;
  }

  render() {
    return <View style={styles.column}>{this.createTable()}</View>;
  }
}

class FallbackColorsExample extends React.Component<{}, State> {
  state: State;
  render() {
    return (
      <View style={styles.column}>
        <View style={styles.row}>
          <Text style={styles.labelCell}>
            First choice is 'bogus' so falls back to 'systemGreenColor'
          </Text>
          <View
            style={{
              ...styles.colorCell,
              backgroundColor: PlatformColor('bogus', 'systemGreenColor'),
            }}
          />
        </View>
      </View>
    );
  }
}

class DynamicColorsExample extends React.Component<{}, State> {
  state: State;
  render() {
    return (
      <View style={styles.column}>
        <View style={styles.row}>
          <Text style={styles.labelCell}>
            'red' or 'blue' depending on Light or Dark theme.
          </Text>
          <View
            style={{
              ...styles.colorCell,
              backgroundColor: IOSDynamicColor({light: 'red', dark: 'blue'}),
            }}
          />
        </View>
        <View style={styles.row}>
          <Text style={styles.labelCell}>
            'foo' with blue fallback or 'bar' with red fallback.
          </Text>
          <View
            style={{
              ...styles.colorCell,
              backgroundColor: IOSDynamicColor({
                light: PlatformColor('foo', 'systemBlueColor'),
                dark: PlatformColor('bar', 'systemRedColor'),
              }),
            }}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  column: {flex: 1, flexDirection: 'column'},
  row: {flex: 0.75, flexDirection: 'row'},
  labelCell: {
    flex: 1,
    alignItems: 'stretch',
    color: PlatformColor('labelColor'),
  },
  colorCell: {flex: 0.25, alignItems: 'stretch'},
});

exports.title = 'PlatformColor';
exports.description =
  'Examples that show how PlatformColors may be used in an app.';
exports.examples = [
  {
    title: 'Semantic Colors',
    render: function(): React.Element<any> {
      return <SemanticColorsExample />;
    },
  },
  {
    title: 'Fallback Colors',
    render: function(): React.Element<any> {
      return <FallbackColorsExample />;
    },
  },
  {
    title: 'Dynamic Colors',
    render: function(): React.Element<any> {
      return <DynamicColorsExample />;
    },
  },
];