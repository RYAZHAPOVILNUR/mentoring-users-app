export function formatDate(time: number): string {
  const date = new Date(time);
  
  const formattedDateString = `${date.getDate()} 
    ${date.toLocaleString('default', { month: 'short' }).slice(0, -1)} 
    ${date.getFullYear()}`;

  return formattedDateString;
}