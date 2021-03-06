/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is
 * regenerated.
 */

import * as msRest from "@azure/ms-rest-js";

export const acceptLanguage: msRest.OperationParameter = {
  parameterPath: "acceptLanguage",
  mapper: {
    serializedName: "accept-language",
    defaultValue: "en-US",
    type: {
      name: "String"
    }
  }
};
export const apiVersion: msRest.OperationQueryParameter = {
  parameterPath: "apiVersion",
  mapper: {
    required: true,
    serializedName: "api-version",
    type: {
      name: "String"
    }
  }
};
export const deploymentName: msRest.OperationURLParameter = {
  parameterPath: "deploymentName",
  mapper: {
    required: true,
    serializedName: "deploymentName",
    constraints: {
      MaxLength: 64,
      MinLength: 1,
      Pattern: /^[-\w\._\(\)]+$/
    },
    type: {
      name: "String"
    }
  }
};
export const expand: msRest.OperationQueryParameter = {
  parameterPath: ["options", "expand"],
  mapper: {
    serializedName: "$expand",
    type: {
      name: "String"
    }
  }
};
export const filter: msRest.OperationQueryParameter = {
  parameterPath: ["options", "filter"],
  mapper: {
    serializedName: "$filter",
    type: {
      name: "String"
    }
  }
};
export const groupId: msRest.OperationURLParameter = {
  parameterPath: "groupId",
  mapper: {
    required: true,
    serializedName: "groupId",
    constraints: {
      MaxLength: 90,
      MinLength: 1
    },
    type: {
      name: "String"
    }
  }
};
export const nextPageLink: msRest.OperationURLParameter = {
  parameterPath: "nextPageLink",
  mapper: {
    required: true,
    serializedName: "nextLink",
    type: {
      name: "String"
    }
  },
  skipEncoding: true
};
export const operationId: msRest.OperationURLParameter = {
  parameterPath: "operationId",
  mapper: {
    required: true,
    serializedName: "operationId",
    type: {
      name: "String"
    }
  }
};
export const parentResourcePath: msRest.OperationURLParameter = {
  parameterPath: "parentResourcePath",
  mapper: {
    required: true,
    serializedName: "parentResourcePath",
    type: {
      name: "String"
    }
  },
  skipEncoding: true
};
export const resourceGroupName: msRest.OperationURLParameter = {
  parameterPath: "resourceGroupName",
  mapper: {
    required: true,
    serializedName: "resourceGroupName",
    constraints: {
      MaxLength: 90,
      MinLength: 1,
      Pattern: /^[-\w\._\(\)]+$/
    },
    type: {
      name: "String"
    }
  }
};
export const resourceId: msRest.OperationURLParameter = {
  parameterPath: "resourceId",
  mapper: {
    required: true,
    serializedName: "resourceId",
    type: {
      name: "String"
    }
  },
  skipEncoding: true
};
export const resourceName: msRest.OperationURLParameter = {
  parameterPath: "resourceName",
  mapper: {
    required: true,
    serializedName: "resourceName",
    type: {
      name: "String"
    }
  }
};
export const resourceProviderNamespace: msRest.OperationURLParameter = {
  parameterPath: "resourceProviderNamespace",
  mapper: {
    required: true,
    serializedName: "resourceProviderNamespace",
    type: {
      name: "String"
    }
  }
};
export const resourceType: msRest.OperationURLParameter = {
  parameterPath: "resourceType",
  mapper: {
    required: true,
    serializedName: "resourceType",
    type: {
      name: "String"
    }
  },
  skipEncoding: true
};
export const scope: msRest.OperationURLParameter = {
  parameterPath: "scope",
  mapper: {
    required: true,
    serializedName: "scope",
    type: {
      name: "String"
    }
  },
  skipEncoding: true
};
export const sourceResourceGroupName: msRest.OperationURLParameter = {
  parameterPath: "sourceResourceGroupName",
  mapper: {
    required: true,
    serializedName: "sourceResourceGroupName",
    constraints: {
      MaxLength: 90,
      MinLength: 1,
      Pattern: /^[-\w\._\(\)]+$/
    },
    type: {
      name: "String"
    }
  }
};
export const subscriptionId: msRest.OperationURLParameter = {
  parameterPath: "subscriptionId",
  mapper: {
    required: true,
    serializedName: "subscriptionId",
    type: {
      name: "String"
    }
  }
};
export const tagName: msRest.OperationURLParameter = {
  parameterPath: "tagName",
  mapper: {
    required: true,
    serializedName: "tagName",
    type: {
      name: "String"
    }
  }
};
export const tagValue: msRest.OperationURLParameter = {
  parameterPath: "tagValue",
  mapper: {
    required: true,
    serializedName: "tagValue",
    type: {
      name: "String"
    }
  }
};
export const top: msRest.OperationQueryParameter = {
  parameterPath: ["options", "top"],
  mapper: {
    serializedName: "$top",
    type: {
      name: "Number"
    }
  }
};
