module.exports = {
  // Selecciona un preset adecuado para proyectos web de React
  preset: 'ts-jest/presets/js-with-babel',

  // Configura las extensiones de archivos que Jest debe procesar
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$',

  // Configura las transformaciones para archivos JavaScript/TypeScript
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
  },

  // Configura el mapeo de módulos, si es necesario
  moduleNameMapper: {
    // Ejemplo: Para manejar archivos CSS
    '\\.(css|less|scss)$': 'identity-obj-proxy',
  },

  // Configura las rutas de los archivos de pruebas
  modulePaths: ['<rootDir>'],

  // Configura las ubicaciones de los archivos de pruebas
  roots: ['<rootDir>/src'],

  // Configura los informes de cobertura, si es necesario
  collectCoverage: true,
  coverageReporters: ['lcov', 'text-summary'],

  // Configura los archivos que Jest debe ignorar
  testPathIgnorePatterns: ['/node_modules/', '/build/'],

  // ... otras configuraciones específicas de tu proyecto ...
};
