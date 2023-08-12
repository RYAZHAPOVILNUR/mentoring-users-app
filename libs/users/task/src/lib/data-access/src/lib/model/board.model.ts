import { Column } from "./column.model";

export class Board{
    constructor (public id: number, public name: string, public columns: Column[]){}
}