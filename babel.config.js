module.exports = (api) => {
  api.cache(true)

  return {
    presets: [
      ['next/babel', {
        'class-properties': { loose: true },
      }],
    ],
    plugins: [
      ['@babel/plugin-proposal-decorators', { legacy: true }],
      ['@babel/plugin-proposal-optional-chaining'],
    ],
  }
}
