import HtmlWebpackPlugin from 'html-webpack-plugin';
import Dotenv from 'dotenv-webpack';
// import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';

function plugins() {
    return [
        new Dotenv(),
        new HtmlWebpackPlugin({
            template: './public/index.html',
            filename: 'index.html',
        }),
        // new ForkTsCheckerWebpackPlugin({
        //     typescript: {
        //         diagnosticOptions: {
        //             semantic: true,
        //             syntactic: true,
        //         },
        //         mode: 'write-references',
        //     },
        //     logger: 'webpack-infrastructure',
        // }),
    ];
}

export default plugins;