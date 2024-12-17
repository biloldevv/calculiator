import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import Button from './components/Button';
import Display from './components/Display';

const App = () => {
  const [currentValue, setCurrentValue] = useState('0');
  const [operator, setOperator] = useState(null);
  const [previousValue, setPreviousValue] = useState(null);
  const [isNewEntry, setIsNewEntry] = useState(false);

  const handleTap = (type, value) => {
    switch (type) {
      case 'number':
        if (currentValue === '0' || isNewEntry) {
          setCurrentValue(value);
        } else {
          setCurrentValue(currentValue + value);
        }
        setIsNewEntry(false);
        break;

      case 'operator':
        setOperator(value);
        setPreviousValue(currentValue);
        setIsNewEntry(true);
        break;

      case 'equal':
        if (operator && previousValue) {
          const current = parseFloat(currentValue);
          const previous = parseFloat(previousValue);
          let result = 0;

          switch (operator) {
            case '+':
              result = previous + current;
              break;
            case '-':
              result = previous - current;
              break;
            case '*':
              result = previous * current;
              break;
            case '/':
              result = previous / current;
              break;
          }

          setCurrentValue(String(result));
          setPreviousValue(null);
          setOperator(null);
          setIsNewEntry(true);
        }
        break;

      case 'clear':
        setCurrentValue('0');
        setOperator(null);
        setPreviousValue(null);
        setIsNewEntry(false);
        break;

      case 'posneg':
        setCurrentValue((prev) => String(parseFloat(prev) * -1));
        break;

      case 'percent':
        setCurrentValue((prev) => String(parseFloat(prev) / 100));
        break;

      case 'dot':
        if (!currentValue.includes('.')) {
          setCurrentValue(currentValue + '.');
        }
        break;

      default:
        break;
    }
  };

  return (
    <View style={styles.container}>
      <Display value={currentValue} />
      <View style={styles.buttonContainer}>
        {[
          { label: 'AC', type: 'clear' },
          { label: '+/-', type: 'posneg' },
          { label: '%', type: 'percent' },
          { label: '÷', type: 'operator', value: '/' },
          { label: '7', type: 'number' },
          { label: '8', type: 'number' },
          { label: '9', type: 'number' },
          { label: '×', type: 'operator', value: '*' },
          { label: '4', type: 'number' },
          { label: '5', type: 'number' },
          { label: '6', type: 'number' },
          { label: '-', type: 'operator', value: '-' },
          { label: '1', type: 'number' },
          { label: '2', type: 'number' },
          { label: '3', type: 'number' },
          { label: '+', type: 'operator', value: '+' },
          { label: '0', type: 'number', style: { width: '47%' } },
          { label: '.', type: 'dot' },
          { label: '=', type: 'equal' },
        ].map((button) => (
          <Button
            key={button.label}
            label={button.label}
            type={button.type}
            value={button.value}
            onPress={() => handleTap(button.type, button.value || button.label)}
            style={button.style}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  buttonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 10,
    backgroundColor: '#333',
    justifyContent: 'space-between',
  },
});

export default App;
