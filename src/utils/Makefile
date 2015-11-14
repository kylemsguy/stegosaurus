all: fbapi.min.js fbapi.js

fbapi.min.js: fbapi.src.js fbapi.js
	uglifyjs fbapi.js --compress --mangle > fbapi.min.js

fbapi.js: fbapi.src.js
	browserify fbapi.src.js --s module > fbapi.js

clean:
	rm fbapi.js fbapi.min.js
