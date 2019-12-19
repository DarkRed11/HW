/**
 * @param {String} date
 * @returns {Object}
 */

var data = new Date();
const err = new TypeError('TypeError');


module.exports = function (date) {

    // change the recieved date into workable format
    data = new Date(date);

    return {
        add: function(number,units){
            if(mistake(number, units)) {
                throw err;
            }
            adding(number, units);
            return this;
        },
        subtract: function(number,units){
            if(mistake(number, units)) {
                throw err;
            }
            subing(number, units);
            return this;
        },
        get value(){
            return rightDate();
        }      
    }

};

//check for error
function mistake(number, units){
    const validUnits = ',years,months,days,hours,minutes,seconds,milliseconds,';

    // negative number or wrong units will call an error
    if(number < 0 || validUnits.indexOf(','+units+",") === -1){
        return true;
    }
    
    return false;
}

//
function adding(number, units){
    switch(units){
        case 'years':
            var format = data.getFullYear();
            data.setFullYear(format+number);
            break;
        case 'months':
            var format = data.getMonth();
            data.setMonth(format+number);
            break;
        case 'days':
            var format = data.getDate();
            data.setDate(format+number);
            break;
        case 'hours':
            var format = data.getHours();
            data.setHours(format+number);
            break;
        case 'minutes':
            var format = data.getMinutes();
            data.setMinutes(format+number);
            break;
        case 'seconds':
            var format = data.getSeconds();
            data.setSeconds(format+number);
            break;
        case 'milliseconds':
            var format = data.getMilliseconds();
            data.setMilliseconds(format+number);
            break;
    }
}

//
function subing(number, units){
    switch(units){
        case 'years':
            var format = data.getFullYear();
            data.setFullYear(format-number);
            break;
        case 'months':
            var format = data.getMonth();
            data.setMonth(format-number);
            break;
        case 'days':
            var format = data.getDate();
            data.setDate(format-number);
            break;
        case 'hours':
            var format = data.getHours();
            data.setHours(format-number);
            break;
        case 'minutes':
            var format = data.getMinutes();
            data.setMinutes(format-number);
            break;
        case 'seconds':
            var format = data.getSeconds();
            data.setSeconds(format-number);
            break;
        case 'milliseconds':
            var format = data.getMilliseconds();
            data.setMilliseconds(format-number);
            break;
    }
}

//convert the date to the right date format
function rightDate(){
    var format = data.getFullYear()+"-", month = data.getMonth()+1;

    // fix month if needed
    if (month < 10){
        format += "0"+month+"-" ;
    }else{
        format += month+"-" ;
    }

    //fix day if needed
    if (data.getDate() < 10){
        format += "0"+data.getDate()+" " ;
    }else{
        format += data.getDate()+" " ;
    }

    //fix hour if needed
    if (data.getHours() < 10){
        format += "0"+data.getHours()+":" ;
    }else{
        format += data.getHours()+":" ;
    }

    //fix minute if needed
    if (data.getMinutes() < 10){
        return format+"0"+data.getMinutes();
    }
    return format+data.getMinutes();
}
