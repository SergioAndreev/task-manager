import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useAuth } from '../context/AuthContext';
import TaskItem from '../components/TaskItem';
import { Task } from '../models/Task';
import { addTask, deleteTask, getTasks, toggleTask } from '../services/taskService';

const TaskListScreen: React.FC = () => {
  const { logout } = useAuth();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [newTitle, setNewTitle] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    (async () => {
      const initial = await getTasks();
      setTasks(initial);
      setLoading(false);
    })();
  }, []);

  const onAdd = async () => {
    const title = newTitle.trim();
    if (!title) return;
    setSubmitting(true);
    const updated = await addTask(title);
    setTasks(updated);
    setNewTitle('');
    setSubmitting(false);
  };

  const onToggle = async (id: string) => {
    const updated = await toggleTask(id);
    setTasks(updated);
  };

  const onDelete = async (id: string) => {
    Alert.alert('Удалить задачу?', 'Это действие нельзя отменить', [
      { text: 'Отмена', style: 'cancel' },
      {
        text: 'Удалить',
        style: 'destructive',
        onPress: async () => {
          const updated = await deleteTask(id);
          setTasks(updated);
        },
      },
    ]);
  };

  if (loading) {
    return (
      <View style={styles.center}> 
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <View style={styles.headerRow}>
        <Text style={styles.header}>Мои задачи</Text>
        <TouchableOpacity onPress={logout} style={styles.logoutBtn}>
          <Text style={styles.logoutText}>Выйти</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          placeholder="Новая задача"
          value={newTitle}
          onChangeText={setNewTitle}
          onSubmitEditing={onAdd}
          returnKeyType="done"
        />
        <TouchableOpacity onPress={onAdd} style={[styles.addBtn, submitting && { opacity: 0.7 }]} disabled={submitting}>
          <Text style={styles.addText}>Добавить</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        renderItem={({ item }) => (
          <TaskItem task={item} onToggle={onToggle} onDelete={onDelete} />
        )}
        contentContainerStyle={{ paddingBottom: 40 }}
      />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  headerRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 },
  header: { fontSize: 22, fontWeight: '700' },
  logoutBtn: { paddingVertical: 8, paddingHorizontal: 12, borderRadius: 8, backgroundColor: '#ef4444' },
  logoutText: { color: 'white', fontWeight: '700' },
  inputRow: { flexDirection: 'row', gap: 8, marginBottom: 8 },
  input: { flex: 1, borderWidth: 1, borderColor: '#ddd', borderRadius: 8, paddingHorizontal: 12, paddingVertical: 10 },
  addBtn: { paddingHorizontal: 14, paddingVertical: 10, backgroundColor: '#4f46e5', borderRadius: 8 },
  addText: { color: 'white', fontWeight: '700' },
  separator: { height: 1, backgroundColor: '#eee' },
});

export default TaskListScreen;
