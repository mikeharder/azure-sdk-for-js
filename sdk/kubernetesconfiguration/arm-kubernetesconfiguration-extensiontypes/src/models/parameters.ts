/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import {
  OperationParameter,
  OperationURLParameter,
  OperationQueryParameter,
} from "@azure/core-client";

export const accept: OperationParameter = {
  parameterPath: "accept",
  mapper: {
    defaultValue: "application/json",
    isConstant: true,
    serializedName: "Accept",
    type: {
      name: "String",
    },
  },
};

export const $host: OperationURLParameter = {
  parameterPath: "$host",
  mapper: {
    serializedName: "$host",
    required: true,
    type: {
      name: "String",
    },
  },
  skipEncoding: true,
};

export const subscriptionId: OperationURLParameter = {
  parameterPath: "subscriptionId",
  mapper: {
    constraints: {
      MinLength: 1,
    },
    serializedName: "subscriptionId",
    required: true,
    type: {
      name: "String",
    },
  },
};

export const location: OperationURLParameter = {
  parameterPath: "location",
  mapper: {
    constraints: {
      MinLength: 1,
    },
    serializedName: "location",
    required: true,
    type: {
      name: "String",
    },
  },
};

export const publisherId: OperationQueryParameter = {
  parameterPath: ["options", "publisherId"],
  mapper: {
    serializedName: "publisherId",
    type: {
      name: "String",
    },
  },
};

export const offerId: OperationQueryParameter = {
  parameterPath: ["options", "offerId"],
  mapper: {
    serializedName: "offerId",
    type: {
      name: "String",
    },
  },
};

export const planId: OperationQueryParameter = {
  parameterPath: ["options", "planId"],
  mapper: {
    serializedName: "planId",
    type: {
      name: "String",
    },
  },
};

export const releaseTrain: OperationQueryParameter = {
  parameterPath: ["options", "releaseTrain"],
  mapper: {
    serializedName: "releaseTrain",
    type: {
      name: "String",
    },
  },
};

export const clusterType: OperationQueryParameter = {
  parameterPath: ["options", "clusterType"],
  mapper: {
    serializedName: "clusterType",
    type: {
      name: "String",
    },
  },
};

export const apiVersion: OperationQueryParameter = {
  parameterPath: "apiVersion",
  mapper: {
    defaultValue: "2024-11-01-preview",
    isConstant: true,
    serializedName: "api-version",
    type: {
      name: "String",
    },
  },
};

export const extensionTypeName: OperationURLParameter = {
  parameterPath: "extensionTypeName",
  mapper: {
    constraints: {
      Pattern: new RegExp("^[a-zA-Z][a-zA-Z0-9-_]*$"),
    },
    serializedName: "extensionTypeName",
    required: true,
    type: {
      name: "String",
    },
  },
};

export const majorVersion: OperationQueryParameter = {
  parameterPath: ["options", "majorVersion"],
  mapper: {
    serializedName: "majorVersion",
    type: {
      name: "String",
    },
  },
};

export const showLatest: OperationQueryParameter = {
  parameterPath: ["options", "showLatest"],
  mapper: {
    serializedName: "showLatest",
    type: {
      name: "Boolean",
    },
  },
};

export const versionNumber: OperationURLParameter = {
  parameterPath: "versionNumber",
  mapper: {
    serializedName: "versionNumber",
    required: true,
    type: {
      name: "String",
    },
  },
};

export const resourceGroupName: OperationURLParameter = {
  parameterPath: "resourceGroupName",
  mapper: {
    constraints: {
      MaxLength: 90,
      MinLength: 1,
    },
    serializedName: "resourceGroupName",
    required: true,
    type: {
      name: "String",
    },
  },
};

export const clusterRp: OperationURLParameter = {
  parameterPath: "clusterRp",
  mapper: {
    serializedName: "clusterRp",
    required: true,
    type: {
      name: "String",
    },
  },
};

export const clusterResourceName: OperationURLParameter = {
  parameterPath: "clusterResourceName",
  mapper: {
    constraints: {
      Pattern: new RegExp("^[a-zA-Z]*$"),
    },
    serializedName: "clusterResourceName",
    required: true,
    type: {
      name: "String",
    },
  },
};

export const clusterName: OperationURLParameter = {
  parameterPath: "clusterName",
  mapper: {
    constraints: {
      Pattern: new RegExp("^.*"),
    },
    serializedName: "clusterName",
    required: true,
    type: {
      name: "String",
    },
  },
};

export const nextLink: OperationURLParameter = {
  parameterPath: "nextLink",
  mapper: {
    serializedName: "nextLink",
    required: true,
    type: {
      name: "String",
    },
  },
  skipEncoding: true,
};
