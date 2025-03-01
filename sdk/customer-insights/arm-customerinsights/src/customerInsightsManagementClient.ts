/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import * as coreClient from "@azure/core-client";
import * as coreRestPipeline from "@azure/core-rest-pipeline";
import {
  PipelineRequest,
  PipelineResponse,
  SendRequest
} from "@azure/core-rest-pipeline";
import * as coreAuth from "@azure/core-auth";
import {
  OperationsImpl,
  HubsImpl,
  ProfilesImpl,
  InteractionsImpl,
  RelationshipsImpl,
  RelationshipLinksImpl,
  AuthorizationPoliciesImpl,
  ConnectorsImpl,
  ConnectorMappingsImpl,
  KpiImpl,
  WidgetTypesImpl,
  ViewsImpl,
  LinksImpl,
  RolesImpl,
  RoleAssignmentsImpl,
  ImagesImpl,
  PredictionsImpl
} from "./operations/index.js";
import {
  Operations,
  Hubs,
  Profiles,
  Interactions,
  Relationships,
  RelationshipLinks,
  AuthorizationPolicies,
  Connectors,
  ConnectorMappings,
  Kpi,
  WidgetTypes,
  Views,
  Links,
  Roles,
  RoleAssignments,
  Images,
  Predictions
} from "./operationsInterfaces/index.js";
import { CustomerInsightsManagementClientOptionalParams } from "./models/index.js";

export class CustomerInsightsManagementClient extends coreClient.ServiceClient {
  $host: string;
  apiVersion: string;
  subscriptionId: string;

  /**
   * Initializes a new instance of the CustomerInsightsManagementClient class.
   * @param credentials Subscription credentials which uniquely identify client subscription.
   * @param subscriptionId Gets subscription credentials which uniquely identify Microsoft Azure
   *                       subscription. The subscription ID forms part of the URI for every service call.
   * @param options The parameter options
   */
  constructor(
    credentials: coreAuth.TokenCredential,
    subscriptionId: string,
    options?: CustomerInsightsManagementClientOptionalParams
  ) {
    if (credentials === undefined) {
      throw new Error("'credentials' cannot be null");
    }
    if (subscriptionId === undefined) {
      throw new Error("'subscriptionId' cannot be null");
    }

    // Initializing default values for options
    if (!options) {
      options = {};
    }
    const defaults: CustomerInsightsManagementClientOptionalParams = {
      requestContentType: "application/json; charset=utf-8",
      credential: credentials
    };

    const packageDetails = `azsdk-js-arm-customerinsights/4.1.1`;
    const userAgentPrefix =
      options.userAgentOptions && options.userAgentOptions.userAgentPrefix
        ? `${options.userAgentOptions.userAgentPrefix} ${packageDetails}`
        : `${packageDetails}`;

    const optionsWithDefaults = {
      ...defaults,
      ...options,
      userAgentOptions: {
        userAgentPrefix
      },
      endpoint:
        options.endpoint ?? options.baseUri ?? "https://management.azure.com"
    };
    super(optionsWithDefaults);

    let bearerTokenAuthenticationPolicyFound: boolean = false;
    if (options?.pipeline && options.pipeline.getOrderedPolicies().length > 0) {
      const pipelinePolicies: coreRestPipeline.PipelinePolicy[] = options.pipeline.getOrderedPolicies();
      bearerTokenAuthenticationPolicyFound = pipelinePolicies.some(
        (pipelinePolicy) =>
          pipelinePolicy.name ===
          coreRestPipeline.bearerTokenAuthenticationPolicyName
      );
    }
    if (
      !options ||
      !options.pipeline ||
      options.pipeline.getOrderedPolicies().length == 0 ||
      !bearerTokenAuthenticationPolicyFound
    ) {
      this.pipeline.removePolicy({
        name: coreRestPipeline.bearerTokenAuthenticationPolicyName
      });
      this.pipeline.addPolicy(
        coreRestPipeline.bearerTokenAuthenticationPolicy({
          credential: credentials,
          scopes:
            optionsWithDefaults.credentialScopes ??
            `${optionsWithDefaults.endpoint}/.default`,
          challengeCallbacks: {
            authorizeRequestOnChallenge:
              coreClient.authorizeRequestOnClaimChallenge
          }
        })
      );
    }
    // Parameter assignments
    this.subscriptionId = subscriptionId;

    // Assigning values to Constant parameters
    this.$host = options.$host || "https://management.azure.com";
    this.apiVersion = options.apiVersion || "2017-04-26";
    this.operations = new OperationsImpl(this);
    this.hubs = new HubsImpl(this);
    this.profiles = new ProfilesImpl(this);
    this.interactions = new InteractionsImpl(this);
    this.relationships = new RelationshipsImpl(this);
    this.relationshipLinks = new RelationshipLinksImpl(this);
    this.authorizationPolicies = new AuthorizationPoliciesImpl(this);
    this.connectors = new ConnectorsImpl(this);
    this.connectorMappings = new ConnectorMappingsImpl(this);
    this.kpi = new KpiImpl(this);
    this.widgetTypes = new WidgetTypesImpl(this);
    this.views = new ViewsImpl(this);
    this.links = new LinksImpl(this);
    this.roles = new RolesImpl(this);
    this.roleAssignments = new RoleAssignmentsImpl(this);
    this.images = new ImagesImpl(this);
    this.predictions = new PredictionsImpl(this);
    this.addCustomApiVersionPolicy(options.apiVersion);
  }

  /** A function that adds a policy that sets the api-version (or equivalent) to reflect the library version. */
  private addCustomApiVersionPolicy(apiVersion?: string) {
    if (!apiVersion) {
      return;
    }
    const apiVersionPolicy = {
      name: "CustomApiVersionPolicy",
      async sendRequest(
        request: PipelineRequest,
        next: SendRequest
      ): Promise<PipelineResponse> {
        const param = request.url.split("?");
        if (param.length > 1) {
          const newParams = param[1].split("&").map((item) => {
            if (item.indexOf("api-version") > -1) {
              return "api-version=" + apiVersion;
            } else {
              return item;
            }
          });
          request.url = param[0] + "?" + newParams.join("&");
        }
        return next(request);
      }
    };
    this.pipeline.addPolicy(apiVersionPolicy);
  }

  operations: Operations;
  hubs: Hubs;
  profiles: Profiles;
  interactions: Interactions;
  relationships: Relationships;
  relationshipLinks: RelationshipLinks;
  authorizationPolicies: AuthorizationPolicies;
  connectors: Connectors;
  connectorMappings: ConnectorMappings;
  kpi: Kpi;
  widgetTypes: WidgetTypes;
  views: Views;
  links: Links;
  roles: Roles;
  roleAssignments: RoleAssignments;
  images: Images;
  predictions: Predictions;
}
