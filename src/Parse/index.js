import {lineParser} from './lineParser';
import {nivelCaudalParser} from './nivelCaudalParser';
import {nivelCabralParser} from './nivelCabralParser';

const LINE_PARSER = 'LINE_PARSER';
const NIVEL_CAUDAL = 'NIVEL_CAUDAL';
const NIVEL_CABRAL = 'NIVEL_CABRAL';

const mappings = {
  [LINE_PARSER]: lineParser,
  [NIVEL_CAUDAL]: nivelCaudalParser,
  [NIVEL_CABRAL]: nivelCabralParser,
};

const FILE_PARSERS = [
  {
    namePrefix: 'NivelCabra',
    parser: NIVEL_CABRAL,
  },
  {
    namePrefix: 'Cerrillos',
    parser: LINE_PARSER,
    stationId: 'Cerrillos',
  },
  {
    namePrefix: 'miraflores',
    parser: LINE_PARSER,
    stationId: 'Miraflores',
  },
  {
    namePrefix: 'CampoQuijano',
    parser: LINE_PARSER,
    stationId: 'CampoQuijano',
  },
  {
    namePrefix: 'punilla',
    parser: LINE_PARSER,
    stationId: 'Punilla',
  },
  {
    namePrefix: 'NivelTunal',
    parser: NIVEL_CAUDAL,
    stationId: 'Tunal',
  },
  {
    namePrefix: 'medina_',
    parser: LINE_PARSER,
    stationId: 'Medina',
  },
  {
    namePrefix: 'cachi_',
    parser: LINE_PARSER,
    stationId: 'Cachi',
  },
];

export const parseFile = (fileEntry) => {
  const fileConfig = FILE_PARSERS.filter((config) => {
    const result = fileEntry.fileName.startsWith(config.namePrefix);
    return result;
  });
  if (fileConfig.length === 0) {
    console.warn(
      `Parse configuration for file ${fileEntry.fileName} not found`,
    );
    return {};
  }
  const parserName = fileConfig[0].parser;
  const stationId = fileConfig[0].stationId;
  const parser = mappings[parserName];
  const data = parser(fileEntry.rawData, stationId);
  return data;
};
