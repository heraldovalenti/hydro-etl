const {readFileSync} = require('fs');
const {propsFromFile} = require('../src/tiff');
/**
 * file coordinates:
 * - superior izquierda: -67, -23
 * - superior derecha -63.5, -23
 * - inferior izquierda: -67,-28
 * - 63.5,-28 (inferior derecha)
 */

const fileName = './20230116_SQPE-OBS.tif';

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
    console.log(JSON.stringify(result));
  } catch (e) {
    console.log(`Error: ${e} ${JSON.stringify(e)}`);
  }
};
action();
