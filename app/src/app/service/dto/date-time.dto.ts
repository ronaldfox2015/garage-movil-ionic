export class DateTimeDto {
  static hourDifference(startDate:string, endDate:string){

    return 0
  }

  static hour(startDate:string){
    const fecha = new Date(startDate); // Crea un objeto de fecha actual

    const horas = fecha.getHours(); // Obtiene las horas de la fecha
    const minutos = fecha.getMinutes(); // Obtiene los minutos de la fecha
    const segundos = fecha.getSeconds(); // Obtiene los segundos de la fecha
    return `${horas}:${minutos}:${segundos}`
  }
}
