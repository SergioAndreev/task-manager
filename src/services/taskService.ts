import AsyncStorage from '@react-native-async-storage/async-storage';
import { Task } from '../models/Task';

const TASKS_KEY = 'tasks_v1';

async function loadLocalTasks(): Promise<Task[]> {
  try {
    const raw = await AsyncStorage.getItem(TASKS_KEY);
    return raw ? (JSON.parse(raw) as Task[]) : [];
  } catch {
    return [];
  }
}

async function saveLocalTasks(tasks: Task[]) {
  try {
    await AsyncStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
  } catch {}
}

export async function fetchInitialTasks(): Promise<Task[]> {
  // Try network first for API integration; fallback to local
  try {
    const res = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=10');
    const data = (await res.json()) as Array<{ id: number; title: string; completed: boolean }>;
    const mapped: Task[] = data.map((t) => ({ id: String(t.id), title: t.title, completed: t.completed }));
    await saveLocalTasks(mapped);
    return mapped;
  } catch {
    return await loadLocalTasks();
  }
}

export async function getTasks(): Promise<Task[]> {
  const local = await loadLocalTasks();
  if (local.length > 0) return local;
  return await fetchInitialTasks();
}

export async function addTask(title: string): Promise<Task[]> {
  const current = await getTasks();
  const newTask: Task = { id: Date.now().toString(), title: title.trim(), completed: false };
  const updated = [newTask, ...current];
  await saveLocalTasks(updated);
  return updated;
}

export async function toggleTask(id: string): Promise<Task[]> {
  const current = await getTasks();
  const updated = current.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t));
  await saveLocalTasks(updated);
  return updated;
}

export async function deleteTask(id: string): Promise<Task[]> {
  const current = await getTasks();
  const updated = current.filter((t) => t.id !== id);
  await saveLocalTasks(updated);
  return updated;
}
