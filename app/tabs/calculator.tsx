import { useState } from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { calculate } from '../../lib/api/endpoints';

export default function CalculatorScreen() {
  const [num1, setNum1] = useState('');
  const [num2, setNum2] = useState('');
  const [operation, setOperation] = useState('+');
  const [result, setResult] = useState('');

  const handleCalculate = async () => {
    try {
      // Convert string inputs to numbers
      const operand1 = parseFloat(num1);
      const operand2 = parseFloat(num2);

      // Validate inputs
      if (isNaN(operand1)){
        setResult('Invalid first number');
        return;
      }
      if (isNaN(operand2)){
        setResult('Invalid second number');
        return;
      }
      const { data } = await calculate({
        operation,
        operand1: (num1),
        operand2: (num2)
      });

      // Handle response
      if (data.error === 'Division by zero') {
        setResult('Cannot divide by zero');
      } else if (data.result === undefined) {
        setResult('Invalid operation');
      } else if (data.result) {
        setResult(data.result);
      } else {
        setResult('Calculation failed');
      }
// error handling and response validation// error handling
    } catch (error: any) {
      console.error('API Error:', error.response?.data || error.message);
      setResult(
        error.response?.data?.error === 'Division by zero'
          ? 'Cannot divide by zero'
          : 'Calculation failed'
      );
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <View
        style={{ flex: 1 }}
        onStartShouldSetResponder={() => {
          Keyboard.dismiss(); // Dismiss the keyboard when tapping outside
          return false; // Ensure the tap is not intercepted
        }}>

        {/* <Pressable onPress={Keyboard.dismiss} style={{ flex: 1 }}> */}
        {/* <TouchableWithoutFeedback onPress={Keyboard.dismiss}> */}
        <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">

          <View style={styles.innerContainer}>
            <TextInput
              style={[styles.input, Platform.OS === 'android' && styles.inputAndroid]}
              placeholder="First number"
              value={num1}
              onChangeText={setNum1}
              keyboardType="numeric"
              clearButtonMode='while-editing' //iOS only
              />
            <TextInput
              style={styles.input}
              placeholder="Second number"
              value={num2}
              onChangeText={setNum2}
              keyboardType="numeric"
              />

            <View style={styles.operations}>
              {['+', '-', '*', '/'].map((op) => (
                <TouchableOpacity
                key={op}
                style={[
                  styles.operationButton,
                  operation === op && styles.selectedOperation,
                ]}
                onPress={() => setOperation(op)}
                >
                  <Text style={styles.operationText}>{op}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <TouchableOpacity style={styles.calculateButton} onPress={handleCalculate}>
              <Text style={styles.calculateText}>Calculate</Text>
            </TouchableOpacity>

            {result !== '' && (
              <Text style={[
                styles.result,
                result === 'Invalid' || result === 'Error' ? styles.errorText : null
              ]}>
                {result === 'Invalid' ? 'Division by zero is invalid' : `Result: ${result}`}
              </Text>
            )}
          </View>
        </ScrollView>
      </View>
        {/* </Pressable> */}
        {/* </TouchableWithoutFeedback> */}
  </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
  },

  innerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
    width: '100%',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#333',
  },
  label: {
    fontSize: 16,
    alignSelf: 'flex-start',
    marginBottom: 5,
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  inputAndroid: {
    paddingVertical: 10,
    textAlign: 'center'
  },
  operations: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginVertical: 20,
  },
  operationButton: {
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    backgroundColor: '#e0e0e0',
  },
  selectedOperation: {
    backgroundColor: '#4caf50',
  },
  operationText: {
    fontSize: 24,
    color: '#fff',
  },
  calculateButton: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2196f3',
    borderRadius: 8,
    marginTop: 20,
  },
  calculateText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
  result: {
    marginTop: 30,
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  errorText: {
    color: 'red',
    fontSize: 18,
  },
});
