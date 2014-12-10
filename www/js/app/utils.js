function session(data){
    $.ajax({
        type: "POST",
        url: '/admins/session.json',
        data: data,
        success: function(data){

        },
        dataType: "json"
    });
}
function daysBetween(start, end) {
    if (!start || !end) { return 0; }
    start = Date.parse(start); end = Date.parse(end);
    if (start.getYear() == 1901 || end.getYear() == 8099) { return 0; }
    var count = 0, date = start.clone();
    while (date.compareTo(end) == -1) { count = count + 1; date.addDays(1); }
    return count;
}
function validateEmail(elementValue){
    var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(elementValue);
}
function validateInt(value){
    var intRegex = /^\d+$/;
    return intRegex.test(value);
}
function positiveInt(value){
    var intRegex = /^\d+$/;
    if(intRegex.test(value))
        if(parseInt(value) > 0)
            return value;
        else
            return false;
    else
        return false;
}
function datepickerFormat(date){
    var out = '%d %M %y';// Default
    switch(date) {
        case 'd M y':
            out = '%d %M %y';
            break;
        case 'd-m-y':
            out = '%d-%m-%y';
            break;
        case 'm/d/Y':
            out ='%m/%d/%Y';
            break;
        case 'Y-m-d':
            out = '%Y-%m-%d';
            break;
    }
    return out;
}
function datejsFormat(date){
    var out = 'd MMM yy';// Default
    switch(date) {
        case 'd M y':
            out = 'dd MMM yy';
            break;
        case 'd-m-y':
            out = 'dd-MM-yy';
            break;
        case 'm/d/Y':
            out = 'MM/dd/yyyy';
            break;
        case 'Y-m-d':
            out = 'yyyy-MM-dd';
            break;
    }
    return out;
}

function toSlug(str) {
    str = str.replace(/^\s+|\s+$/g, ''); // trim
    str = str.toLowerCase();

    // remove accents, swap ñ for n, etc
    var from = "ãàáäâẽèéëêìíïîõòóöôùúüûñç·/_,:;";
    var to   = "aaaaaeeeeeiiiiooooouuuunc------";
    for (var i=0, l=from.length ; i<l ; i++) {
        str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
    }

    str = str.replace(/[^a-z0-9 -]/g, '') // remove invalid chars
        .replace(/\s+/g, '-') // collapse whitespace and replace by -
        .replace(/-+/g, '-'); // collapse dashes

    return str;
};

//----------------//
var dialog = null;

function modal(selector){
    dialog = $('#'+selector);
    dialog.modal({width:'780px'});
}
function modal_close(){
    dialog.modal('hide');
    $('.modal-input').empty();
    $('.modal-input').val('');
    dialog = null;
}