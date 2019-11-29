//////////////////// JSONIFY PLUGIN SHOULD USE name="something" AND MAY BE value="somevalue" ////////////////////

// USE JSONIFY // https://jsfiddle.net/onigetoc/aapne9nv/  
// https://github.com/kushalpandya/JSONify
!function(i){i.fn.jsonify=function(t){var n=i.extend({stringify:!1},t),s={}
return i.each(this.serializeArray(),function(){this.name in s?(s[this.name].push||(s[this.name]=[s[this.name]]),s[this.name].push(this.value||"")):s[this.name]=this.value||""}),n.stringify?JSON.stringify(s):s},i.fn.dejsonify=function(t){"string"==typeof t&&(t=JSON.parse(t)),i.each(this.find("*[name]"),function(){var n=i(this).attr("type"),s=t[i(this).attr("name")]
"radio"===n||"checkbox"===n?i.isArray(s)?i(this).prop("checked",i.inArray(i(this).val(),s)>-1):i(this).prop("checked",i(this).val()===s):i(this).val(s)})}}(jQuery)
///////////////////////////////////////////////////////////////////////////////

///////////////// LOAD LOCAL STORAGE ON LOAD AFTER JSONIFY PLUGIN ////////////////////
if (localStorage.getItem("options") !== null) {

  var getOptions = JSON.parse(localStorage.getItem('options')) || [];
  console.log(getOptions)
  $("#optionform").dejsonify(getOptions);

}

//////////////////// SAVE OPTIONS TO chrome.storage or localStorage ////////////////////

//////////////////// JQUERY HANDLE FORM ////////////////////

$(document).ready(function () {

  /* MATERIALIZE JS */
  //$('select').material_select();
  $('select').formSelect(); // materialize v1.0

  ///////////////// AUTOSAVE ON CHANGE ////////////////////
  // https://stackoverflow.com/a/11795226/211324
  $('#optionform').on('change keyup paste', ':input', function (e) {
    jsonify();
  });


  ///////////////// SAVE ON SUBMIT IF NEEDED BUT NOT REQUIRED ////////////////////
  $("#optionform").submit(function (e) {
    jsonify();
    return false;
  });

  //////////////////// RESET FORM AND EMPTY LOCAL STORAGE BUT NOT REQUIRED ////////////////////
  $('#reset').click(function () {
    $("#optionform").dejsonify({});
    localStorage.removeItem('options'); // OPTIONAL
  });

});

//////////////////// SERIALIZE TO JSON ////////////////////
function jsonify() {

  var jsonify = $("#optionform").jsonify({
    stringify: true
  });

  console.log("SAVED");
  console.log(jsonify);
  localStorage.setItem('options', JSON.stringify(jsonify));

}
