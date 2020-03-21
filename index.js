"use strict";
/**
 * @param {Array} collection
 * @params {Function[]} – Функции для запроса
 * @returns {Array}
 */
function query(collection) {

    var list = {select:[], filterIn:[], properties: [], count: [0 , 0]}, out=[];

    // if no orders been given, return as is
    if(arguments.length === 1){
        return collection;
    }

    // load the properties from the collection
    list.properties = Object.keys(collection[0]);

    //move the arguments to an array  
    var command = [].slice.call(arguments);

    //load the command values
    for(let i=0; i < command.length ; i++){
        if (command[i][0] === 'select'){
            list.select = list.select.concat(command[i].slice(1));
            list.count[0]++;
        }
        else if (command[i][0] === 'filterIn'){
            list.filterIn = command[i].slice(1);
            list.count[1]++;
        }
    }

    //in case of crosssaction
    if (list.count[0] > 1){
        list.select = duplicate(list.select, list.count[0]);
    }

    if (list.select.length === 0){
        return [];
    }

    if (list.count[1] > 1){
        list.filterIn = duplicate(list.filterIn, list.count[1]);
    }

    if (list.filterIn.length === 0){
        return [];
    }

    //filtering*********************************************
    let index = 0;
    for (let i=0; i < collection.length; i++){
        
        for(let j = 1; j < list.filterIn.length; j++){
            if(collection[i][list.filterIn[0]] === list.filterIn[j]){
                out[index] = collection[i];
                index++;
            }
        }
    }

    out = selecting(list.select,list.properties, out);

    return out;
}

/**
 * @params {String[]}
 */
// select which properties from the list to show
function select() {
    var choice = ['select'];

    for(let i=0; i < arguments.length; i++){
        choice[i+1] = arguments[i];
    }

    return choice;
}

/**
 * @param {String} property – Свойство для фильтрации
 * @param {Array} values – Массив разрешённых значений
 */
// filter the list by one property and values from that property
function filterIn(property, values) {
    var send = ['filterIn'];
    send[1] = property;

    for (let i = 0; i < values.length ; i++){
        send[i+2] = values[i];
    }
    return send;
}


function selecting(select,properties, out){

        let del =[], index = 0;

    for(let i=0; i < properties.length ; i++){ 
        
        if(select.indexOf(properties[i]) === -1){ //check if the selected properteis are in the collection
            del[index] = properties[i];
            index++;
        }
    }

    for(let i=0; i < out.length; i++){
        for(let j=0; j < del.length;j++){
            delete out[i][del[j]];
        }
    }
    return out;
}

//check for duplicate, returne the duplicate if there is one or the hole array if there is no
function duplicate(list,count){ 
    let dupl = [], copy = list.slice().sort();

    for (let i = 0; i < copy.length - 1 ;i++){
        if (copy[i+1]===copy[i]){
            dupl.push(copy[i]);
        }
    }

    if (dupl.length > 0 ){
        return dupl;
    }

    if (dupl.length === 0 && count > 1){
        return dupl;
    }

    return list;
}

module.exports = {
    query: query,
    select: select,
    filterIn: filterIn
};
