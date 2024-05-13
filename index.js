const app = require('./app');
const { info } = require('./utils/logger');
const config = require('./utils/config');

app.listen(config.PORT, () => {
    info(`Servidor ejecutándose en el puerto ${config.PORT}`);
});
