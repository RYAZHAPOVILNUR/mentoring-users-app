import { Task } from './task.model';

export class Column {
    constructor (public id: number, public name: string, public tasks: Task[]) {}
}