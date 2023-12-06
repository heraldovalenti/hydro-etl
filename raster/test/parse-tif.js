const {readFileSync} = require('fs');
const {propsFromFile} = require('../src/tiff');
/**
 * file coordinates:
 * - superior izquierda: -67, -23
 * - superior derecha -63.5, -23
 * - inferior izquierda: -67,-28
 * - 63.5,-28 (inferior derecha)
 */

const files = {
  sqpe: './SQPE-OBS_de_20231026_1200h_a_20231027_1200h.tif', //'./20230116_SQPE-OBS.tif',
  wrf: 'prcpWRF_dia+03_de_2023-04-05_1800h_a_2023-04-08_1800h_ciclo-18.tif',
};
const fileName = files.sqpe;
const action = async () => {
  try {
    const readResult = readFileSync(fileName);
    console.log(readResult);
    const arrayBuffer = new ArrayBuffer(readResult.length);
    const view = new Uint8Array(arrayBuffer);
    for (let i = 0; i < readResult.length; ++i) {
      view[i] = readResult[i];
    }
    console.log(view);

    const result = await propsFromFile(arrayBuffer);
    // console.log(JSON.stringify(result));
    const {
      TileLength,
      TileWidth,
      Height,
      Width,
      ModelXTiepoint,
      ModelYTiepoint,
      Data,
      floatArray,
    } = result;
    console.log({
      TileLength,
      TileWidth,
      Height,
      Width,
      WxH: Height * Width,
      ModelXTiepoint,
      ModelYTiepoint,
      Data: Data.length,
      floatArray: floatArray.length,
      DataTotal: Data.reduce((total, data) => total + data, 0),
      floatArrayTotal: floatArray.reduce((total, data) => total + data, 0),
    });
  } catch (e) {
    console.log(`Error: ${e} ${JSON.stringify(e)}`);
  }
};
action();
