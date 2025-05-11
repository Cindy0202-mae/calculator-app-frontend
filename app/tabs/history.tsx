import type { Calculation } from '@/lib/types/calculation';
import { FontAwesome } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
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

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('default', {month: 'long'}); // Formats the date and time based on the user's locale
  };

  return (
    <View style={styles.container}>
    <FlatList
      data={history}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <View style={styles.item}>
          <View style={styles.textContainer}>
            <Text style={styles.date}>{formatDate(item.createdAt)}</Text>
            <Text style={styles.text}>
              {item.operand1} {item.operation} {item.operand2} = {item.result}
            </Text>
          </View>
          <TouchableOpacity onPress={() => handleDelete(item.id)}>
              <FontAwesome name="trash" size={24} color="#ff0000" />
          </TouchableOpacity>
        </View>
      )}
    />
  </View>
);
}

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
textContainer: {
  flex: 1,
  marginRight: 10,
},
text: {
  fontSize: 16,
},
date: {
  fontSize: 12,
  color: '#888',
  marginTop: 4,
},
});
