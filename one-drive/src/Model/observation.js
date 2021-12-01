const DIMENSION_NIVEL = 'Nivel';
const DIMENSION_CAUDAL = 'Caudal';
const DIMENSION_LLUVIA = 'Lluvia';
const DIMENSION_BATERIA = 'Bateria';
const DIMENSION_ALARMA = 'Alarma';

function Observation({id, dimension, value, date, other, unit}) {
  this.id = id;
  this.dimension = dimension;
  this.value = value;
  this.date = date;
  this.unit = unit;
  this.other = other;
}

module.exports = {
  DIMENSION_NIVEL,
  DIMENSION_CAUDAL,
  DIMENSION_LLUVIA,
  DIMENSION_BATERIA,
  DIMENSION_ALARMA,
  Observation,
};
