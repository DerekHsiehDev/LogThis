/** @type {import('next').NextConfig} */
require("dotenv").config();
module.exports = {
  webpack5: true,
  webpack: (config) => {
    config.resolve.fallback = { fs: false };

    return config;
  },
};
