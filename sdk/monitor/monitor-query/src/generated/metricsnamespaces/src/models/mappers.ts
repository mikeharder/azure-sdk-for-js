/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import * as coreHttp from "@azure/core-http";

export const MetricNamespaceCollection: coreHttp.CompositeMapper = {
  type: {
    name: "Composite",
    className: "MetricNamespaceCollection",
    modelProperties: {
      value: {
        serializedName: "value",
        required: true,
        type: {
          name: "Sequence",
          element: {
            type: {
              name: "Composite",
              className: "MetricNamespace"
            }
          }
        }
      }
    }
  }
};

export const MetricNamespace: coreHttp.CompositeMapper = {
  type: {
    name: "Composite",
    className: "MetricNamespace",
    modelProperties: {
      id: {
        serializedName: "id",
        type: {
          name: "String"
        }
      },
      type: {
        serializedName: "type",
        type: {
          name: "String"
        }
      },
      name: {
        serializedName: "name",
        type: {
          name: "String"
        }
      },
      classification: {
        serializedName: "classification",
        type: {
          name: "String"
        }
      },
      properties: {
        serializedName: "properties",
        type: {
          name: "Composite",
          className: "MetricNamespaceName"
        }
      }
    }
  }
};

export const MetricNamespaceName: coreHttp.CompositeMapper = {
  type: {
    name: "Composite",
    className: "MetricNamespaceName",
    modelProperties: {
      metricNamespaceName: {
        serializedName: "metricNamespaceName",
        type: {
          name: "String"
        }
      }
    }
  }
};

export const ErrorResponse: coreHttp.CompositeMapper = {
  type: {
    name: "Composite",
    className: "ErrorResponse",
    modelProperties: {
      code: {
        serializedName: "code",
        type: {
          name: "String"
        }
      },
      message: {
        serializedName: "message",
        type: {
          name: "String"
        }
      }
    }
  }
};
