import { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { calculate } from '../../lib/api/endpoints';

export default function CalculatorScreen() {
  const [num1, setNum1] = useState('');
  const [num2, setNum2] = useState('');
  const [operation, setOperation] = useState('+');
  const [result, setResult] = useState('');

  const handleCalculate = async () => {
    try {
      const { data } = await calculate({
        operation,
        operand1: num1,
        operand2: num2
      });
      setResult(data.result);
    } catch (error) {
      console.error('Calculation failed:', error);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="First number"
        value={num1}
        onChangeText={setNum1}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Second number"
        value={num2}
        onChangeText={setNum2}
        keyboardType="numeric"
      />

      <View style={styles.buttons}>
        {['+', '-', '*', '/'].map((op) => (
          <Button
            key={op}
            title={op}
            onPress={() => setOperation(op)}
          />
        ))}
      </View>

      <Button title="Calculate" onPress={handleCalculate} />

      {result && <Text style={styles.result}>Result: {result}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  input: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 15,
    padding: 10
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 20
  },
  result: {
    marginTop: 20,
    fontSize: 24,
    textAlign: 'center'
  }
});
