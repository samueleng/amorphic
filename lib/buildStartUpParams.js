'use strict';

let AmorphicContext = require('./AmorphicContext');

// TODO: Audit where these get used.
/**
 * Purpose unknown
 *
 * @param {unknown} configStore unknown
 */
function buildStartUpParams(configStore) {
    let amorphicOptions = AmorphicContext.amorphicOptions || {};
    let rootCfg = configStore['root'];

    amorphicOptions.compressXHR = rootCfg.get('compressXHR') || amorphicOptions.compressXHR;
    amorphicOptions.sourceMode = rootCfg.get('sourceMode') || amorphicOptions.sourceMode;
    amorphicOptions.compressSession = rootCfg.get('compressSession') || amorphicOptions.compressSession;
    amorphicOptions.conflictMode = rootCfg.get('conflictMode') || amorphicOptions.conflictMode;
    amorphicOptions.sessionExpiration = rootCfg.get('sessionSeconds') * 1000;
    amorphicOptions.objectCacheExpiration = rootCfg.get('objectCacheSeconds') * 1000;
    amorphicOptions.appList = rootCfg.get('applications');
    amorphicOptions.appStartList = rootCfg.get('application').split(';');
    amorphicOptions.port = rootCfg.get('port');

    if (!(amorphicOptions.appStartList[0])){
        console.warn('You are starting amorphic with no application name.');
    }

    amorphicOptions.mainApp = amorphicOptions.appStartList[0];

    if (rootCfg.get('sessionSecret')) {
        amorphicOptions.sessionSecret = rootCfg.get('sessionSecret');
    }
    else {
        amorphicOptions.sessionSecret = 'swat_team';
        console.warn('WARNING you are starting amorphic with no sessionSecret. The default sessionSecret "swat_team" will be used.');
    }
}

module.exports = {
    buildStartUpParams: buildStartUpParams
};
