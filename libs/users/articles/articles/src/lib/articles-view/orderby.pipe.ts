import { Pipe, PipeTransform } from "@angular/core";
import { orderBy } from 'lodash';

@Pipe({
 name: "orderBy",
 standalone: true
})
export class OrderByPipe implements PipeTransform {
 transform(articles: any): any {
  return orderBy(articles, ['created_at'], ['desc']);
  }
}