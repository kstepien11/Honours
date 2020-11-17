var fs = require('fs');


class getPricesHist {
  
    constructor() {
    }
    
    fetch() {      
      const {
        default: Binance
      } = require("binance-api-node");

      const client = Binance({
      });
  
      (async () => {
        try {
          var data = await client.candles({
            symbol: 'BTCUSDT',
            interval: '1d',
            limit: '1000'
          });

          var attrib = "0";
          var close = data[attrib].close;


          var output = "";
            output += "[";
            for (var i = data.length - 1; i > 0; i--) {
            output += "{\"Time\": \"" + `${data[i].openTime}` + "\", " +
                "\"Open\": \"" + `${data[i].open}` + "\", " +
                "\"high\": \"" + `${data[i].high}` + "\", " +
                "\"low\": \"" + `${data[i].low}` + "\", " +
                "\"close\": \"" + `${data[i].close}` + "\", " +
                "\"volume\": \"" + `${data[i].volume}` + "\", " +
                "\"trades\": \"" + `${data[i].trades}` + "\"}, ";
            };
            output += "{\"Time\": \"" + `${data[0].openTime}` + "\", " +
            "\"Open\": \"" + `${data[i].open}` + "\", " +
                "\"high\": \"" + `${data[i].high}` + "\", " +
                "\"low\": \"" + `${data[i].low}` + "\", " +
                "\"close\": \"" + `${data[i].close}` + "\", " +
                "\"volume\": \"" + `${data[i].volume}` + "\", " +
            "\"trades\": \"" + `${data[0].trades}` + "\"}";
            output += "]";

           // console.log(output);

            var obj = [];
            obj.push(`${output}`);
            fs.appendFile('./BTCUSDT-1d.json', obj.toString(), function (err) {


                if (err) throw err;
                // console.log(this.name +' log entry added!');
            });
  
        } catch (err) {
          //console.error(err.message);
        }
      })();
    }
  
  }
  
  const test = new getPricesHist().fetch();

