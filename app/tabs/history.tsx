import type { Calculation } from '@/lib/types/calculation';
import { FontAwesome } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { deleteHistory, getHistory } from '../../lib/api/endpoints';

export default function HistoryScreen() {
  // state declaration
  const [history, setHistory] = useState<Calculation[]>([]);
  const [selectedItems, setSelectedItems] = useState<number[]>([]); // Track selected items

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

  const handleDeleteSelected = async () => {
    try {
      await Promise.all(selectedItems.map((id) => deleteHistory(id)));
      setSelectedItems([]); // Clear selected items after deletion
      loadHistory(); // reload history after deletion
    } catch (error) {
      console.error('Failed to delete selected history:', error);
    }
  };

  const toggleSelection = (id: number) => {
    setSelectedItems((prev) =>
    prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('default', {month: 'long'}); // Formats the date and time based on the user's locale
  };

  return (
    <View style={styles.container}>
      {selectedItems.length > 0 && (
        <TouchableOpacity style={styles.deleteButton} onPress={handleDeleteSelected}>
          <Text style={styles.deleteButtonText}>Delete Selected ({selectedItems.length})</Text>
        </TouchableOpacity>
      )}
      <FlatList
        data={history}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.item,
              selectedItems.includes(item.id) && styles.selectedItem, // Highlight selected items
            ]}
            onPress={() => toggleSelection(item.id)} // Toggle selection on press
          >
            <View style={styles.textContainer}>
              <Text style={styles.date}>{formatDate(item.createdAt)}</Text>
              <Text style={styles.text}>
                {item.operand1} {item.operation} {item.operand2} = {item.result}
              </Text>
            </View>
            <TouchableOpacity onPress={() => handleDelete(item.id)}>
              <FontAwesome name="trash" size={24} color="#ff0000" />
            </TouchableOpacity>
          </TouchableOpacity>
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
  selectedItem: {
    backgroundColor: '#e0f7fa', // Highlight selected items
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
  deleteButton: {
    backgroundColor: '#ff0000',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
    alignItems: 'center',
  },
  deleteButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
