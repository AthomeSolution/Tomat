PKG_ID	= com.ecreate.example

all: web

web:
	grunt build

android: web
	ionic build android

ios: web
	ionic build ios

wp8: web
	ionic build wp8

init:
	npm install
	bower install
	cordova platform rm android
	cordova platform add android
	cordova platform rm ios
	cordova platform add ios
	cordova platform rm wp8
	cordova platform add wp8

initPlugins:
	cat plugins.lst | xargs -L1 cordova plugin add

update:
	npm update
	bower update

clean:
	grunt clean

cleanPlugins:
	cordova plugins | cut -d' ' -f1 | xargs -L1 cordova plugins rm

runAndroid: android
	ionic run android

runIos: ios
	ionic run ios

runWp8: wp8
	ionic run wp8
