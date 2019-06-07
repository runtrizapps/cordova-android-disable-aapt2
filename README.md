cordova-android-disable-aapt2
=============================

### Archived: AAPT2 can no longer be disabled using `android.enableAapt2`, and has been widely adopted. This plugin is no longer needed.


This Cordova/Phonegap plugin for Android disables the [AAPT2 resource processing introduced with Gradle 3.0.0](https://developer.android.com/studio/build/gradle-plugin-3-0-0.html)

# Purpose

**TL;DR**: To prevent config.xml parsing failures caused by the AAPT2 resource processing system.

AAPT2 changes the behavior of parsing number-like strings from XML. Previously, they were returned as strings from [`XMLPullParser`'s `getAttributeValue()`](https://developer.android.com/reference/org/xmlpull/v1/XmlPullParser.html#getAttributeValue), but now they are parsed as numbers. This can cause problems like stripping leading zeros, or parsing large numbers into scientific notation.

Example issues:
- [Error parsing config.xml &lt;preference value="1234567890"&gt;](https://github.com/urbanairship/phonegap-ua-push/issues/206)
- [XMLPullParser removing leading zeros](https://stackoverflow.com/questions/47764685/androids-xmlpullparser-getattributevalue-is-removing-leading-zeros-from-string)

# Installation

    $ cordova plugin add cordova-android-disable-aapt2
