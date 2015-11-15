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
    var b = message.charCodeAt(i).toString(2);
    console.log(b);
    
    for (var j = 0; j < 8; j++)
    {
      bytes.push(0x1 & b)
      parseInt(b) >> 1;
    }
  }
  console.log(bytes);
  return bytes;
}

var getString = function(message) {
  var bytes =[];
  for (var i = 0; i < message.length; i++)
  {
    bytes.push(message.charCodeAt(i).toString(2));
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

/**
 * Called when decoding a JPEG
 * - coefficients: coefficients[0] is an array of luminosity blocks, coefficients[1] and
 *   coefficients[2] are arrays of chrominance blocks. Each block has 64 "modes"
 */
var decodeCoefficients = function(coefficients) {

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
