"use strict"
/**
 * Called when decoding a JPEG
 * - coefficients: coefficients[0] is an array of luminosity blocks, coefficients[1] and
 *   coefficients[2] are arrays of chrominance blocks. Each block has 64 "modes"
 */
var readCoefficients = function(coefficients) {
  console.log(coefficients);
  alert("The coefficients have been outputted to the console.");


};


var getBytes = function(message) {
  var bytes =[];
  for (var i = 0; i < message.length; i++)
  {
    var revBits = []
    var asciiChar = message.charCodeAt(i);

    for(var j = 0; j < 8; j++){
      revBits.push(asciiChar % 2);
      asciiChar = Math.floor(asciiChar / 2);
    }

    revBits.reverse()

    for(var j = 0; j < 8; j++){
      bytes.push(revBits[j]);
    }

  }
  console.log(bytes);
  return bytes;
}

/**
 * Called when encoding a JPEG
 * - coefficients: coefficients[0] is an array of luminosity blocks, coefficients[1] and
 *   coefficients[2] are arrays of chrominance blocks. Each block has 64 "modes"
 */
var modifyCoefficients = function(coefficients) {
  
  var lumaBytes = [];
  var str = document.getElementById("enctext").value;
  var bytes = getBytes(str);
  // An example that inverts the luminosity. You could hide information in the bits here.
  var lumaCoefficients = coefficients[0];
  
  console.log("lumaCoefficients", lumaCoefficients);
  console.log("coefficients[0]", coefficients[0]);
  
  for (var i = 0; i < lumaCoefficients.length; i++) {
    for (var j = 0; j < 64; j++) {
      lumaBytes.push(lumaCoefficients[i][j]);
    }
  }

  console.log("lumaCoefficients", lumaCoefficients);


  var count = 0;
  var c = lumaBytes[count];
  console.log("First", c);

  for (var b = 0; b < bytes.length; b++)
  {
    while (c == 0 | c == 1)
    {
      count++;
      c = lumaBytes[count];
    }
    console.log("Before", c);
    c = c % 2 + bytes[b];
    console.log("After", c);
    lumaBytes[i] = c;

    count++;
    c = lumaBytes[count];
  }

  var k = 0;
  for (var i = 0; i < lumaCoefficients.length; i++) {
    for (var j = 0; j < 64; j++) {
      lumaCoefficients[i][j] = lumaBytes[k];
      k++;
    }
  }

  console.log(lumaBytes);
}

var decodeMessage = function(coefficients){
  console.log(coefficients);
  var lumaBytes = [];
  var lumaCoefficients = coefficients[1];
  console.log(coefficients[0]);
  for (var i = 0; i < lumaCoefficients.length; i++) {
    for (var j = 0; j < 64; j++) {
      lumaBytes.push(lumaCoefficients[i][j]);
    }
  }

  var extractedBits = [];
  for(var i = 0; i < lumaBytes.length; i++){
    if(lumaBytes[i] == 0 || lumaBytes[i] == 1){
      continue;
    }
    else{
      extractedBits.push(lumaBytes[i] & 1);
    }
  }


  var extractedString = ""
  for(var i = 0; i < extractedBits.length / 8; i += 8){
    var aByte = 128 * extractedBits[i] + 64 * extractedBits[i+1] + 32 * extractedBits[i+2] + 16 * extractedBits[i+3] + 8 * extractedBits[i+4] + 4 * extractedBits[i+5] + 2 * extractedBits[i+6] + extractedBits[i+7];
    var aString = String.fromCharCode(aByte);
    extractedString = extractedString.concat(aString);

  
  }

  document.getElementById("decodedText").innerHTML = extractedString;
  return extractedString;
}

/**
 * Called when decoding a JPEG
 * - coefficients: coefficients[0] is an array of luminosity blocks, coefficients[1] and
 *   coefficients[2] are arrays of chrominance blocks. Each block has 64 "modes"
 */
var decodeCoefficients = function(coefficients) {
  console.log(coefficients);
  var lumaBytes = [];
  var str = document.getElementById("enctext").value;
  var bytes = getBytes(str);
  // An example that inverts the luminosity. You could hide information in the bits here.
  var lumaCoefficients = coefficients[0];
  for (var i = 0; i < lumaCoefficients.length; i++) {
    for (var j = 0; j < 64; j++) {
      lumaBytes.push(lumaCoefficients[i][j]);
    }
  }


  var count = 0;
  var c = lumaBytes[count];

  for (var b = 0; b < bytes.length; b++)
  {
    while (c == 0 | c == 1)
    {
      count++;
      c = lumaBytes[count];
    }
    c = c % 2 + bytes[b];
    lumaBytes[i] = c;
  }


  console.log(lumaBytes);
}

// A global variable which holds onto the blob url of the selected image while we wait for the
// user to choose to encode or decode.
var objectURL;

// Bind the decode button to reading out the coefficients from the image. Note the image must be a
// JPEG for this to do something sensible.
document.getElementById("decodeButton").addEventListener("click", function() {
  jsSteg.getCoefficients(objectURL, readCoefficients);
});

// Bind the decode message button
document.getElementById("decodeMsgButton").addEventListener("click", function(){
  jsSteg.getCoefficients(objectURL, decodeMessage);
});

// Bind the encode button to reading out the coefficients from the image
document.getElementById("encodeButton").addEventListener("click", function () {
  jsSteg.reEncodeWithModifications(objectURL, modifyCoefficients, function (resultUri) {
    // Do whatever you want with the resulting uri, in this example we display it on the page.
    document.getElementById("encodedImage").src = resultUri;
  });
});

// When the user completes selecting an image we generate a blob url for it to communicate with
// the encoder/decoder
document.getElementById("image-select").addEventListener("change", function handleFileSelect(e){
  // Ensure the user chose a single file
  if (e.target.files.length !== 1) {
    throw new Error("User didn't select a file correctly");
  }
  var f = e.target.files[0];
  // Create a 'blob' url file for the image so we can the file to be decoded or encoded
  window.URL = window.URL || window.webkitURL;
  objectURL = window.URL.createObjectURL(f);
  // Clear the file selection
  e.target.files = [];
  // Reset the 'encoded image' being displayed
  document.getElementById("encodedImage").src = "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==";
}, false);
