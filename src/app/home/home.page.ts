import { Component, OnInit } from '@angular/core';
import { TaskService } from '../services/task.service';
import { Task } from '../models/task.model';
import { FeatureFlagService } from '../services/feature-flag.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage implements OnInit {

  tasks: Task[] = [];
  filteredTasks: Task[] = [];

  title = '';
  category = '';
  filter = '';
  categories: string[] = [];
  filterEnabled = false;

  constructor(private taskService: TaskService,
    private featureFlagService: FeatureFlagService
  ) {}

  ngOnInit() {
    this.featureFlagService.isFilterEnabled().then(enabled => {
      this.filterEnabled = enabled;
      if (this.filterEnabled) {
        const savedFilter = localStorage.getItem('task_filter');
        if (savedFilter) {
          this.filter = savedFilter;
        }
      }

      this.loadTasks();
    });
  }


  loadTasks(): void {
    this.taskService.getAll().subscribe(tasks => {
      this.tasks = tasks;
      this.categories = [...new Set(tasks.map(task => task.category))];
      this.applyFilter();
    });
  }

  applyFilter(): void {
    const term = this.filter.trim().toLowerCase();
    this.filteredTasks = term
      ? this.tasks.filter(task => task.category.toLowerCase().includes(term))
      : [...this.tasks];
  }

  add(): void {
    if (this.title && this.category) {
      this.taskService.create(this.title, this.category).subscribe(() => {
        this.title = '';
        this.category = '';
        this.loadTasks();
      });
    }
  }

  complete(id: string): void {
    this.taskService.complete(id).subscribe(() => {
      this.loadTasks();
    });
  }

  delete(id: string): void {
    this.taskService.delete(id).subscribe(() => {
      this.loadTasks();
    });
  }

  onFilterChange() {
  if (this.filterEnabled) {
    localStorage.setItem('task_filter', this.filter);
  }
  this.loadTasks();
}

}
