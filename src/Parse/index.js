import {lineParser} from './lineParser';
import {nivelCaudalParser} from './nivelCaudalParser';
import {nivelCabralParser} from './nivelCabralParser';
import {termoandesParser} from './termoandesParser';

const LINE_PARSER = 'LINE_PARSER';
const NIVEL_CAUDAL = 'NIVEL_CAUDAL';
const NIVEL_CABRAL = 'NIVEL_CABRAL';
const TERMOANDES = 'TERMOANDES';

const mappings = {
  [LINE_PARSER]: lineParser,
  [NIVEL_CAUDAL]: nivelCaudalParser,
  [NIVEL_CABRAL]: nivelCabralParser,
  [TERMOANDES]: termoandesParser,
};

const FILE_PARSERS = [
  {
    namePrefix: 'NivelCabra',
    parser: NIVEL_CABRAL,
  },
  {
    namePrefix: 'Cerrillos_',
    parser: LINE_PARSER,
    stationId: 'Cerrillos',
  },
  {
    namePrefix: 'miraflores_',
    parser: LINE_PARSER,
    stationId: 'Miraflores',
  },
  {
    namePrefix: 'CampoQuijano_',
    parser: LINE_PARSER,
    stationId: 'CampoQuijano',
  },
  {
    namePrefix: 'punilla_',
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
  {
    namePrefix: 'TERMOANDES.txt',
    parser: TERMOANDES,
    stationId: 'Termoandes',
  },
];

export const configsForFile = (fileEntry) => {
  const fileConfig = FILE_PARSERS.filter((config) => {
    const result = fileEntry.fileName.startsWith(config.namePrefix);
    return result;
  });
  return fileConfig;
};

export const parseFile = (fileEntry) => {
  const fileConfig = configsForFile(fileEntry);
  if (fileConfig.length == 0) {
    console.warn(
      `Parse configuration for file ${fileEntry.fileName} not found`,
    );
    return {};
  }
  console.log(`parsing ${fileEntry.fileName}`);
  const parserName = fileConfig[0].parser;
  const stationId = fileConfig[0].stationId;
  const parser = mappings[parserName];
  const data = parser(fileEntry.rawData, stationId);
  return data;
};
