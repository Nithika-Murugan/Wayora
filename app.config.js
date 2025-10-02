export default {
  expo: {
    name: "Wayora",
    slug: "wayora-mobile",
    version: "1.0.0",
    orientation: "portrait",
    userInterfaceStyle: "light",
    splash: {
      resizeMode: "contain",
      backgroundColor: "#2C6E49"
    },
    assetBundlePatterns: [
      "**/*"
    ],
    ios: {
      supportsTablet: true,
      bundleIdentifier: "com.wayora.mobile"
    },
    android: {
      adaptiveIcon: {
        backgroundColor: "#2C6E49"
      },
      package: "com.wayora.mobile"
    },
    web: {
      bundler: "webpack"
    },
    plugins: [
      [
        "expo-location",
        {
          locationAlwaysAndWhenInUsePermission: "Allow Wayora to use your location for travel planning and navigation."
        }
      ],
      [
        "expo-camera",
        {
          cameraPermission: "Allow Wayora to access your camera for travel journal photos."
        }
      ]
    ]
  }
};