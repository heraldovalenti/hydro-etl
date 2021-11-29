const {fromArrayBuffer} = require('geotiff');

const streamToArrayBuffer = (stream) => {
  return new Promise((res, rej) => {
    const chunks = [];
    stream.on('data', (chunk) => {
      chunks.push(chunk);
    });
    stream.on('error', (e) => rej(e));
    stream.on('end', () => {
      const buffer = Buffer.concat(chunks);
      const arrayBuffer = new ArrayBuffer(buffer.length);
      const view = new Uint8Array(arrayBuffer);
      for (let i = 0; i < buffer.length; ++i) {
        view[i] = buffer[i];
      }
      res(arrayBuffer);
    });
  });
};

const propsFromFile = async (arrayBuffer) => {
  const tiff = await fromArrayBuffer(arrayBuffer);
  const rasters = await tiff.readRasters();
  const [floatArrayMap] = rasters;
  const floatArray = Object.keys(floatArrayMap).map((k) => floatArrayMap[k]);
  const image = await tiff.getImage();
  const BitsPerSample = image.getBitsPerSample();
  const ModelTiepoint = image.getTiePoints();
  const TileWidth = image.getTileWidth();
  const TileLength = image.getTileHeight();
  const Height = image.getHeight();
  const Width = image.getWidth();

  const result = {
    BitsPerSample,
    ModelXTiepoint: ModelTiepoint[0].x,
    ModelYTiepoint: ModelTiepoint[0].y,
    TileWidth,
    TileLength,
    Height,
    Width,
    floatArray,
  };
  return result;
};

module.exports = {propsFromFile, streamToArrayBuffer};
