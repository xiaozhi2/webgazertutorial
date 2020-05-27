/** the collection of functions to deal with array in choice task and during eye-tracking */
/** Created by Taro: 20200515 */

const utilsHelper = ( function () {
  utils = {};
   
  utils.getRandom = (length) => Math.floor(Math.random()*(length));

  utils.getRandomSample = function(array, size){
        var length = array.length, start = utils.getRandom(length),
            swaps = [], i = size, temp;
      
        while(i--) {
            var index = (start + i)%length, rindex = utils.getRandom(length);
            temp = array[rindex];
            array[rindex] = array[index];
            array[index] = temp;
            swaps.push({ from: index, to: rindex });
        }
      
        var end = start + size, sample = array.slice(start, end);
        if(end > length)
            sample = sample.concat(array.slice(0, end - length));
      
        // Put everything back.
        i = size;
        while(i--) {
             var pop = swaps.pop();
             temp = array[pop.from];
             array[pop.from] = array[pop.to];
             array[pop.to] = temp;
        }
      
        return sample;
      };

      utils.shuffle = function(array) {
        var currentIndex = array.length,
          temporaryValue, randomIndex;
    
        // While there remain elements to shuffle...
        while (0 !== currentIndex) {
    
          // Pick a remaining element...
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex -= 1;
    
          // And swap it with the current element.
          temporaryValue = array[currentIndex];
          array[currentIndex] = array[randomIndex];
          array[randomIndex] = temporaryValue;
        }
    
        return array;
      };


      utils.downloadCSV = function(csv,filename) {
        var csvFile;
        var downloadLink;
        
        csvFile = new Blob( [csv], {type: "text/csv"});
        downloadLink = document.createElement("a");
        downloadLink.download = filename;
        downloadLink.href = window.URL.createObjectURL(csvFile);
        downloadLink.style.display = "none";
        document.body.appendChild(downloadLink);
        downloadLink.click();
        };




        utils.json2csv = function(objArray){
        var array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
        var line = '';
        var result = '';
        var columns = [];
    
        var i = 0;
        for (var j = 0; j < array.length; j++) {
            for (var key in array[j]) {
                var keyString = key + "";
                keyString = '"' + keyString.replace(/"/g, '""') + '",';
                if (!columns.includes(key)) {
                    columns[i] = key;
                    line += keyString;
                    i++;
                }
            }
        }
    
        line = line.slice(0, -1);
        result += line + '\r\n';
    
        for (var i = 0; i < array.length; i++) {
            var line = '';
            for (var j = 0; j < columns.length; j++) {
                var value = (typeof array[i][columns[j]] === 'undefined') ? '' : array[i][columns[j]];
                var valueString = value + "";
                line += '"' + valueString.replace(/"/g, '""') + '",';
            }
    
            line = line.slice(0, -1);
            result += line + '\r\n';
        }
    
        return result;
    
    };
    


})();


