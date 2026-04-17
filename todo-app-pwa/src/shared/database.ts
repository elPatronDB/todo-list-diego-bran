import { openDB } from 'idb';
import type { DBSchema, IDBPDatabase } from 'idb';
import type { Task } from '../domain/task/task.types';

interface TodoDB extends DBSchema {
  tasks: {
    key: string;
    value: Task;
  };
}

const DB_NAME = 'todo-list-db';
const DB_VERSION = 1;

export async function initDB(): Promise<IDBPDatabase<TodoDB>> {
  return openDB<TodoDB>(DB_NAME, DB_VERSION, {
    upgrade(db) {
      if (!db.objectStoreNames.contains('tasks')) {
        db.createObjectStore('tasks', { keyPath: 'id' });
      }
    },
  });
}

export async function getAllTasks(): Promise<Task[]> {
  const db = await initDB();
  return db.getAll('tasks');
}

export async function saveTask(task: Task): Promise<void> {
  const db = await initDB();
  await db.put('tasks', task);
}

export async function deleteTaskRecord(id: string): Promise<void> {
  const db = await initDB();
  await db.delete('tasks', id);
}
