const { AzureCliCredential } = require("@azure/identity");
const { getServiceConfig, ServiceOS, ServiceAuth } = require("@azure/playwright");
const { defineConfig } = require('@playwright/test');
const config = require("./playwright.config");

const azureCredential = new AzureCliCredential();

const serviceAuthType = ServiceAuth.ENTRA_ID;
const os = ServiceOS.LINUX;

const playwrightServiceAdditionalOptions = {
  serviceAuthType: serviceAuthType, // Authentication types supported by Azure Playwright
  os: os, // Operating system types supported by Azure Playwright
  runId: new Date().toISOString(), // Run id for the test run
  timeout: 30000, // Maximum time in milliseconds to wait for the connection to be established
  slowMo: 0, // Slows down Playwright operations by the specified amount of milliseconds
  exposeNetwork: "<loopback>", // Exposes network available on the connecting client to the browser being connected to
  useCloudHostedBrowsers: true, // Use cloud hosted browsers
  credential: azureCredential, // Custom token credential for Entra ID authentication
  runName: "JavaScript V1 - Sample Run", // Run name for the test run
};


export default defineConfig(config, getServiceConfig(config, playwrightServiceAdditionalOptions));
