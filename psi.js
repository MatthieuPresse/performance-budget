var request  = require("requestretry");
var fs       = require('fs');
var configs  = [];
var results  = [];
var url      = require('url');
// var syncRequest = require('sync-request');

configs['ofConfigSite']= require('./config/data-of.js');
configs['pjConfigSite']= require('./config/data-pj.js');


if(process.env['INCOMING_HOOK_BODY'] != 'PSI-DAILY') return;


JSON.parse(process.env['siteList']).forEach(site => {
    console.log(site + 'ConfigBuild');

    console.log('ApiKey: ', process.env['googleApiKey']);
    console.log('######');
    console.log('');

    var psi = configs[site+'ConfigSite'].psi || [];

    var promise = [];
    psi.forEach(function(psi_conf){
        promise.push(new Promise(function(resolve, reject) {
            var url = 'https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url='+ psi_conf.url +'&category=performance&locale=fr-FR&strategy=mobile&key=' + process.env['googleApiKey'];
            console.log('url psi', url);
            request({
                url: url,
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            }, function (error, response, body) {
                if (!error && response.statusCode === 200) {

                    var entries = JSON.parse(body);
                    console.log('#### parsed psi', site, psi_conf.url, entries.loadingExperience.metrics.FIRST_CONTENTFUL_PAINT_MS.percentile);
                    console.log('#### parsed psi', site, psi_conf.url, entries.loadingExperience.metrics.FIRST_INPUT_DELAY_MS.percentile);
                    // console.log('#### parsed psi', site, entries.originLoadingExperience.metrics);
                    // console.log('#### parsed psi', site, psi_conf.url, entries.lighthouseResult.audits.metrics.details.items[0]['speedIndex']);
                    // console.log('#### parsed psi', entries.lighthouseResult.audits.metrics.details.items[0]['observedSpeedIndex']);
                    // console.log('#### parsed psi', site, psi_conf.url, entries.lighthouseResult.audits['time-to-first-byte'].displayValue);

                    results[psi_conf.url] = (results[psi_conf.url] || {});
                    results[psi_conf.url].url = psi_conf.url;
                    results[psi_conf.url].fcp = entries.loadingExperience.metrics.FIRST_CONTENTFUL_PAINT_MS.percentile;
                    results[psi_conf.url].fid = entries.loadingExperience.metrics.FIRST_INPUT_DELAY_MS.percentile;
                        // "speedindex": entries.lighthouseResult.audits.metrics.details.items[0]['speedIndex'],
                        // "ttfb": entries.lighthouseResult.audits['time-to-first-byte'].displayValue,
                        // "scorecard": 11,
                    resolve();

                } else {
                    console.log(body)
                    console.log("Err getting PSI report: ", site, psi_conf.url, response.statusCode, body.status, error);
                    reject();
                    process.exit(1);
                }
            });
        }));

        promise.push(new Promise(function(resolve, reject) {
            var scorecard = 'https://gweb-mobile-web-hub.appspot.com/feature/mobile/api/site?domain='+new url.parse(psi_conf.url).hostname.replace('www.', '')+'&network=3G&country=France';
            console.log('url scorecard', scorecard);

            request({
                url: scorecard,
                method: 'GET'
            }, function (error, response, body) {
                if (!error && response.statusCode === 200) {
                    var body = JSON.parse(body.replace(")]}',", "").trim());
                    console.log('#### parsed scorecard', site, psi_conf.url, body.speed);

                    results[psi_conf.url] = (results[psi_conf.url] || {});
                    results[psi_conf.url].scorecard = body.speed;
                    resolve();

                } else {
                    console.log(body)
                    console.log("Err getting scorecard: ", site, scorecard, response.statusCode, body.status, error);
                    reject();
                    process.exit(1);

                }
            });
        }));
    });

    // promise.push(new Promise(function(resolve, reject) {

    //     psi.forEach(function(psi_conf){
    //         var dareboost = 'https://www.dareboost.com/api/0.5/analysis/launch'
    //         console.log('url dareboost', dareboost);

    //         try {
    //             var opts = {
    //                 json: {
    //                     "token": process.env['artwaiDareboostApiKey'],
    //                     "url": psi_conf.url,
    //                     "browser": {
    //                         "name": "Galaxy S6"
    //                     }
    //                 }
    //             };
    //             console.log(opts);
    //             response = syncRequest('POST', dareboost, opts);

    //             console.log('#### parsed dareboost', site, psi_conf.url, response.body.toString('utf8'));

    //             results[psi_conf.url] = (results[psi_conf.url] || {});
    //             results[psi_conf.url].dareboost = body;

    //         } catch (error) {
    //             console.log("Err getting dareboost: ", site, dareboost, error, error.statusCode, error.body);
    //             reject();
    //             process.exit(1);
    //         }
    //     });
    //     resolve();

    // }));


    Promise.all(promise).then(function(values) {


        var aws_results = [];
        for (var _o in results) { if (results.hasOwnProperty(_o)) {
            aws_results.push(results[_o]);
        } }
        console.log(aws_results)

        if(!aws_results.length) return;

        request({
                url: 'https://zv1hfnc4bg.execute-api.eu-west-3.amazonaws.com/prod/psi_historique',
                method: 'POST',
                json: {
                    "client": configs[site+'ConfigSite'].site,
                    "timestamp": new Date().getTime(),
                    "data": aws_results
                }
            },
            function(error, httpResponse, body){
                if(!error) {
                    console.log('Saved');
                } else {
                    console.log("Err saving info to AWS:", site, ConfigBuild.id, error);
                    process.exit(1);
                }
            }
        );
    });


})