export const DIMENSION_NIVEL = 'Nivel';
export const DIMENSION_CAUDAL = 'Caudal';
export const DIMENSION_LLUVIA = 'Lluvia';
export const DIMENSION_BATERIA = 'Bateria';
export const DIMENSION_ALARMA = 'Alarma';

export default class Observation {
  constructor({id, dimension, value, date, other, unit}) {
    this.id = id;
    this.dimension = dimension;
    this.value = value;
    this.date = date;
    this.unit = unit;
    this.other = other;
  }
}
