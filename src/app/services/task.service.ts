// src/app/services/task.service.ts
import { Injectable } from '@angular/core';
import { Task } from '../models/task.model';
import { Observable, of } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';

const STORAGE_KEY = 'tasks';

@Injectable({ providedIn: 'root' })
export class TaskService {
  private getTasksFromStorage(): Task[] {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  }

  private saveTasksToStorage(tasks: Task[]): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }

  getAll(): Observable<Task[]> {
    return of(this.getTasksFromStorage());
  }

  create(title: string, category: string): Observable<Task> {
    const tasks = this.getTasksFromStorage();
    const newTask: Task = {
      id: uuidv4(),
      title,
      category,
      completed: false
    };
    tasks.push(newTask);
    this.saveTasksToStorage(tasks);
    return of(newTask);
  }

  complete(id: string): Observable<Task> {
    const tasks = this.getTasksFromStorage();
    const task = tasks.find(t => t.id === id);
    if (task) {
      task.completed = true;
      this.saveTasksToStorage(tasks);
    }
    return of(task!);
  }

  delete(id: string): Observable<void> {
    let tasks = this.getTasksFromStorage();
    tasks = tasks.filter(t => t.id !== id);
    this.saveTasksToStorage(tasks);
    return of(undefined);
  }

  filterByCategory(category: string): Observable<Task[]> {
    const tasks = this.getTasksFromStorage();
    return of(tasks.filter(t => t.category === category));
  }
}
