import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpack from 'webpack';
import routes from './routes';
import config from '../webpack.common';

const compiler = webpack(config);

// calling an instance of express
const app = express();


// logging all request to console using morgan
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true,
}));

app.use('/', routes);

if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test') {
  app.use(webpackDevMiddleware(compiler, config.output.publicPath));
}


export default app;
