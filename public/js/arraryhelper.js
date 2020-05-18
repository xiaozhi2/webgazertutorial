/** the collection of functions to deal with array in choice task and during eye-tracking */
/** Created by Taro: 20200515 */

const arrayhelper = ( function () {
    arrayHelper = {};
   
    arrayHelper.getRandom = (length) => Math.floor(Math.random()*(length));

    arrayHelper.getRandomSample = function(array, size){
        var length = array.length, start = arrayHelper.getRandom(length),
            swaps = [], i = size, temp;
      
        while(i--) {
            var index = (start + i)%length, rindex = arrayHelper.getRandom(length);
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

      arrayHelper.shuffle = function(array) {
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





})();