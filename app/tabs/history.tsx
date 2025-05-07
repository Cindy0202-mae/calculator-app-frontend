import type { Calculation } from '@/lib/types/calculation';
import { useEffect, useState } from 'react';
import { Button, FlatList, StyleSheet, Text, View } from 'react-native';
import { deleteHistory, getHistory } from '../../lib/api/endpoints';

export default function HistoryScreen() {
  // state declaration
  const [history, setHistory] = useState<Calculation[]>([]);

  // fetch history from the server
  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    try {
      const { data } = await getHistory();
      setHistory(data); // update state with fetched data
    } catch (error) {
      console.error('Failed to fetch history:', error);
    }
  };


  const handleDelete = async (id: number) => {
    try {
      await deleteHistory(id); //API call to delete the history
      loadHistory(); // reload history after deletion
    } catch (error) {
      console.error('Failed to delete history:', error);
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={history}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.text}>{item.operand1} {item.operation} {item.operand2}  = {item.result}</Text>
            <Button title="Delete" onPress={() => handleDelete(item.id)} />
          </View>
        )}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  text: {
    fontSize: 16,
  },
});
