call cordova build android --release
call "c:\Program Files\Java\jdk1.8.0\bin\jarsigner.exe" -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore c:\workspace\Kotlin\Keys\keystore.jks platforms\android\ant-build\CordovaApp-release-unsigned.apk skyProjects
call c:\android-sdk\build-tools\21.1.2\zipalign.exe -f -v 4 platforms\android\ant-build\CordovaApp-release-unsigned.apk jchat.apk