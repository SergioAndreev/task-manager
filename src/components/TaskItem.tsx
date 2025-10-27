import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Task } from '../models/Task';

type Props = {
  task: Task;
  onToggle: (id: string) => void;
  onDelete?: (id: string) => void;
};

const TaskItem: React.FC<Props> = ({ task, onToggle, onDelete }) => {
  return (
    <Pressable onPress={() => onToggle(task.id)} onLongPress={() => onDelete?.(task.id)}>
      <View style={styles.row}>
        <View style={[styles.checkbox, task.completed && styles.checkboxChecked]} />
        <Text style={[styles.title, task.completed && styles.completed]} numberOfLines={2}>
          {task.title}
        </Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', paddingVertical: 10, paddingHorizontal: 12, gap: 12 },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#4f46e5',
    backgroundColor: 'transparent',
  },
  checkboxChecked: { backgroundColor: '#4f46e5' },
  title: { flex: 1, fontSize: 16 },
  completed: { textDecorationLine: 'line-through', color: '#888' },
});

export default TaskItem;
