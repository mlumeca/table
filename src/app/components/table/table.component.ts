import { Component, computed, signal, EventEmitter } from '@angular/core';
import {ThemePalette} from '@angular/material/core';
import {FormsModule} from '@angular/forms';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatFormFieldModule} from '@angular/material/form-field';

// CHECKPOINTS
export interface Task {
  name: string;
  completed: boolean;
  subtasks?: Task[];
}

export class CheckboxComponent { // CheckboxOverviewExample
  readonly task = signal<Task>({
    name: 'Mostrar todas las columnas',
    completed: true,
    subtasks: [
      {name: 'Nº de alumno', completed: true},
      {name: 'Nombre', completed: true},
      {name: 'Apellido', completed: true},
      {name: 'NIF', completed: true},
      {name: 'Edad', completed: true},
      {name: 'Curso', completed: true},
    ],
  });

  // Checkea el checkbox padre cuando los hijos se han completado
  readonly partiallyComplete = computed(() => {
    const task = this.task();
    if (!task.subtasks) {
      return false;
    }
    return task.subtasks.some(t => t.completed) && !task.subtasks.every(t => t.completed);
  });


  update(completed: boolean, index?: number) {
    this.task.update(task => {
      if (index === undefined) {
        task.completed = completed;
        task.subtasks?.forEach((t: { completed: boolean; }) => (t.completed = completed));
      } else {
        task.subtasks![index].completed = completed;
        task.completed = task.subtasks?.every((t: { completed: any; }) => t.completed) ?? true;
      }
      return {...task};
    });
  }
}


// TABLE
export interface Student {
  studentNumber: number;
  name: string;
  surname: string;
  nif: string;
  age: number;
  course: string;
}

const STUDENT_DATA: Student[] = [
  {studentNumber: 1, name: 'Ana', surname: 'Mateos', nif:'29616552S', age:22, course: 'Telecomunicaciones'},
  {studentNumber: 2, name: 'María', surname: 'Guillén', nif:'28616552S', age:19, course: 'Electricidad'},
  {studentNumber: 3, name: 'Verónica', surname: 'Ruiz', nif:'27616552S', age:20, course: 'Electricidad'},
  {studentNumber: 4, name: 'Javier', surname: 'Camacho', nif:'26616552F', age:22, course: 'Telecomunicaciones'},
  {studentNumber: 5, name: 'Francisco', surname: 'Campos', nif:'25616552S', age:22, course: 'Electricidad'},
  {studentNumber: 6, name: 'Carmen', surname: 'Bejarano', nif:'24616552S', age:24, course: 'Telecomunicaciones'},
  {studentNumber: 7, name: 'Luisa', surname: 'López', nif:'22616552S', age:18, course: 'DAM'},
  {studentNumber: 8, name: 'Pedro', surname: 'Jiménez', nif:'23616552G', age:21, course: 'Telecomunicaciones'},
  {studentNumber: 9, name: 'Rafael', surname: 'Fernández', nif:'21616552S', age:23, course: 'DAM'},
  {studentNumber: 10, name: 'Patricio José', surname: 'Campillos', nif:'20616552S', age:47, course: 'DAM'},
];

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrl: './table.component.css',
})
export class TableComponent {
  displayedColumns: string[] = ['studentNumber', 'name', 'surname', 'nif', 'age', 'course'];
  tableData = STUDENT_DATA;

  update: any;
task: any;
partiallyComplete: any;
}