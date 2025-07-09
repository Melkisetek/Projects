const path = require('path');

module.exports = {
    entry: path.join(__dirname, 'js/app.ts'), //tu archivo de entrada
    mode: 'development', //modo de desarrollo
    devtool: 'inline-source-map', //mapa de fuentes para depuración
    output: {                       // archivo de salida
        filename: 'js/app.js',
        path: __dirname
    },
    devServer: {
        static: {
            directory: path.join(__dirname, '/')
        },
        compress: true, // comprimir archivos
        port: 3000, // servidor en http://localhost:3000
    },

    module: {
        rules: [
            {
                test: /\.tsx?$/, // para archivos .ts y .tsx
                loader: 'ts-loader', // usa ts-loader
                exclude: /node_modules/, // ignora esta carpeta
            },
        ]
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js"] // permite importar sin extensión
    },
};