// Телефонная книга
var phoneBook = {};

/**
 * @param {String} command
 * @returns {*} - результат зависит от команды
 */
module.exports = function (command) {

    // spliting the recieved string to array of strings: command , name and numbers
    var comArray = command.split(" ");

    // chosing a command
    switch(comArray[0]){
        case "ADD":
            ADD(comArray[1],comArray[2]);
            break;
        case "REMOVE_PHONE":
            return (REMOVE(comArray[1]));
        case "SHOW":
            return (SHOW());
    }

};
    // recive two strings, a name and phone numbers assosiated with it
    function ADD(name, numbers){

        //check if the phone book is empty
        if(isEmptyObj(phoneBook)){
            //if empty then add as is
            phoneBook[name] = numbers;

        } else {

            // to compare phoneBook names to the recieved name, run on the phone book names
            var pbName;
            for (pbName in phoneBook){

                // spliting the recieved string of numbers to an array of strings with phone numbers, one for new numbers
                var newNumbers = numbers.split(",");

                if (pbName == name){
                    // if the name is in the phone book need to check if the number/numbers already in the phone book

                    // spliting the recieved string of numbers to an array of strings with phone numbers, one for existing numbers
                    var oldNumbers = phoneBook[pbName].split(",");

                    //run on new numbers to be compaired to the old
                    for (i=0; i < newNumbers.length ; i++){

                        //check if the new number exists in the phone book and at what place (-1 if don't)
                        var j = oldNumbers.indexOf(newNumbers[i]);
                        if (j == -1){
                            //number don't exist yet and need to be added
                            phoneBook[pbName] += "," + newNumbers[i];
                        }
                        // if the number do exists - no need to add it - move to the next new number
                    }
                } else {

                    // if the name is NOT in the phone book, the name need to be added and the numbers without check
                    phoneBook[name] = newNumbers.join(",");
                }
            }

        }


    }

    // remove one phone number from the phone book and reture true if exist and false if don't
    function REMOVE(number){

        // run on all names in the book
        var name;
        var oldNumbers = [];
        for (name in phoneBook){
           // check if the number is in the book

            oldNumbers = phoneBook[name].split(",");

            var check = phoneBook[name].search(number);

            // if the value is not -1, then the number is found at this name
            if (check != -1){
                //the number is in the book and have to be deleted

                for(i=0 ; i < oldNumbers.length; i++){
                    if (oldNumbers[i] == number){
                        
                        if (phoneBook[name].search(",") != -1){
                            phoneBook[name] = phoneBook[name].replace(","+number,"");
                        } else phoneBook[name] = phoneBook[name].replace(number,"");
                        return true;

                    }else if (i == oldNumbers.length){
                        // if the number is not in the book
                        return false;
                    }
                }

            }
        }
        // if the number is not in the book
        return false;
    }

    //build an array of strings, each string is a name and the assossiated numbers, names should go in the ABC order
    function SHOW(){
        var showBook = [];
        var numbers =[];
        var name;
        var i = 0; // showbook index
        var j = 0; // phonenames index
        var phoneNames = Object.keys(phoneBook); // array of all the names

        for (name in phoneBook){

            //check if there are numbers to show with the name
            if(phoneBook[name].length >= 1){
                numbers = phoneBook[name].split(",");
                showBook[i] = phoneNames[j]+": "+ numbers.join(", ");
                i++;
            }
            j++;
        }
        return showBook.sort(naturalCompare);
    }

    function isEmptyObj(obj) {
        for (var key in obj) {
            if (obj.hasOwnProperty(key)) {
                return false;
            }         
        }
        return true;
    }

    function naturalCompare(a, b) {
        var ax = [], bx = [];
    
        a.replace(/(\d+)|(\D+)/g, function(_, $1, $2) { ax.push([$1 || Infinity, $2 || ""]) });
        b.replace(/(\d+)|(\D+)/g, function(_, $1, $2) { bx.push([$1 || Infinity, $2 || ""]) });
        
        while(ax.length && bx.length) {
            var an = ax.shift();
            var bn = bx.shift();
            var nn = (an[0] - bn[0]) || an[1].localeCompare(bn[1]);
            if(nn) return nn;
        }
    
        return ax.length - bx.length;
    }
