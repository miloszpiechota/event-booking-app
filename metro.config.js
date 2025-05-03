const { getDefaultConfig } = require('expo/metro-config');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

// Wyłączenie obsługi pola "exports"
config.resolver.unstable_enablePackageExports = false;

module.exports = config;
