/* Magic Mirror
    * Module: MMM-GQuotes
    *
    * By Cowboysdude
    * 
    */
const NodeHelper = require('node_helper');
const request = require('request');
const fs = require('fs');
const parser = require('xml2js').parseString;
var stripNS = require('xml2js').processors.stripPrefix;
var iconv = require('iconv-lite');

module.exports = NodeHelper.create({

    start: function() {
        this.gquote = {
            timestamp: null,
            data: null
        };
        this.path = "modules/MMM-GQuotes/quote.json";
        if (fs.existsSync(this.path)) {
            var temp = JSON.parse(fs.readFileSync(this.path));
            if (temp.timestamp === this.getDate()) {
                this.gquote = temp;
            }
        }
    },

    getGQuote: function(url) {
    	request({ 
    	          url:"http://www.zitate-online.de/zitatdestages.xml",
    	          method: 'GET',
    	          encoding: null
    	        }, (error, response, body) => {
            if (!error && response.statusCode === 200) {
            var utf8String = iconv.decode(new Buffer(body), "ISO-8859-1");	
                parser(utf8String, { tagNameProcessors: [stripNS] },  (err, result)=> {
                        var result = JSON.parse(JSON.stringify(result.RDF.item));
                        this.sendSocketNotification('GQUOTE_RESULT', result);
                        this.gquote.timestamp = this.getDate();
                        this.gquote.data = result;
                           this.fileWrite();
                
                });
            }
       });
    },
    
    fileWrite: function() {
        fs.writeFile(this.path, JSON.stringify(this.gquote), function(err) {
            if (err) {
                return console.log(err);
            }
            console.log("The Quote was saved!");
        });
    },

    getDate: function() {
        return (new Date()).toLocaleDateString();
    },

    //Subclass socketNotificationReceived received.
    socketNotificationReceived: function(notification, payload) {
        if (notification === 'GET_GQUOTE') {
            if (this.gquote.timestamp === this.getDate() && this.gquote.data !== null) {
                this.sendSocketNotification('GQUOTE_RESULT', this.gquote.data);
            } else {
                this.getGQuote(payload);
            }
        }
    }

});
