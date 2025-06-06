## API Report File for "@azure/arm-mongocluster"

> Do not edit this file. It is a report generated by [API Extractor](https://api-extractor.com/).

```ts

// @public
export type ActionType = string;

// @public
export interface AdministratorProperties {
    password?: string;
    userName?: string;
}

// @public
export interface AuthConfigProperties {
    allowedModes?: AuthenticationMode[];
}

// @public
export type AuthenticationMode = string;

// @public
export interface BackupProperties {
    readonly earliestRestoreTime?: string;
}

// @public
export type CheckNameAvailabilityReason = string;

// @public
export interface CheckNameAvailabilityRequest {
    name?: string;
    type?: string;
}

// @public
export interface CheckNameAvailabilityResponse {
    message?: string;
    nameAvailable?: boolean;
    reason?: CheckNameAvailabilityReason;
}

// @public
export interface ComputeProperties {
    tier?: string;
}

// @public
export interface ConnectionString {
    readonly connectionString?: string;
    readonly description?: string;
    readonly name?: string;
}

// @public
export type CreatedByType = string;

// @public
export type CreateMode = string;

// @public
export type DataApiMode = string;

// @public
export interface DataApiProperties {
    mode?: DataApiMode;
}

// @public
export interface DatabaseRole {
    db: string;
    role: UserRole;
}

// @public
export interface EntraIdentityProvider extends IdentityProvider {
    properties: EntraIdentityProviderProperties;
    type: "MicrosoftEntraID";
}

// @public
export interface EntraIdentityProviderProperties {
    principalType: EntraPrincipalType;
}

// @public
export type EntraPrincipalType = string;

// @public
export interface ErrorAdditionalInfo {
    readonly info?: Record<string, any>;
    readonly type?: string;
}

// @public
export interface ErrorDetail {
    readonly additionalInfo?: ErrorAdditionalInfo[];
    readonly code?: string;
    readonly details?: ErrorDetail[];
    readonly message?: string;
    readonly target?: string;
}

// @public
export interface ErrorResponse {
    error?: ErrorDetail;
}

// @public
export interface FirewallRule extends ProxyResource {
    properties?: FirewallRuleProperties;
}

// @public
export interface FirewallRuleProperties {
    endIpAddress: string;
    readonly provisioningState?: ProvisioningState;
    startIpAddress: string;
}

// @public
export type HighAvailabilityMode = string;

// @public
export interface HighAvailabilityProperties {
    targetMode?: HighAvailabilityMode;
}

// @public
export interface IdentityProvider {
    type: IdentityProviderType;
}

// @public
export type IdentityProviderType = string;

// @public
export type IdentityProviderUnion = EntraIdentityProvider | IdentityProvider;

// @public
export enum KnownActionType {
    Internal = "Internal"
}

// @public
export enum KnownAuthenticationMode {
    MicrosoftEntraID = "MicrosoftEntraID",
    NativeAuth = "NativeAuth"
}

// @public
export enum KnownCheckNameAvailabilityReason {
    AlreadyExists = "AlreadyExists",
    Invalid = "Invalid"
}

// @public
export enum KnownCreatedByType {
    Application = "Application",
    Key = "Key",
    ManagedIdentity = "ManagedIdentity",
    User = "User"
}

// @public
export enum KnownCreateMode {
    Default = "Default",
    GeoReplica = "GeoReplica",
    PointInTimeRestore = "PointInTimeRestore",
    Replica = "Replica"
}

// @public
export enum KnownDataApiMode {
    Disabled = "Disabled",
    Enabled = "Enabled"
}

// @public
export enum KnownEntraPrincipalType {
    ServicePrincipal = "servicePrincipal",
    User = "user"
}

// @public
export enum KnownHighAvailabilityMode {
    Disabled = "Disabled",
    SameZone = "SameZone",
    ZoneRedundantPreferred = "ZoneRedundantPreferred"
}

// @public
export enum KnownIdentityProviderType {
    MicrosoftEntraID = "MicrosoftEntraID"
}

// @public
export enum KnownMongoClusterStatus {
    Dropping = "Dropping",
    Provisioning = "Provisioning",
    Ready = "Ready",
    Starting = "Starting",
    Stopped = "Stopped",
    Stopping = "Stopping",
    Updating = "Updating"
}

// @public
export enum KnownOrigin {
    System = "system",
    User = "user",
    UserSystem = "user,system"
}

// @public
export enum KnownPreviewFeature {
    GeoReplicas = "GeoReplicas"
}

// @public
export enum KnownPrivateEndpointConnectionProvisioningState {
    Creating = "Creating",
    Deleting = "Deleting",
    Failed = "Failed",
    Succeeded = "Succeeded"
}

// @public
export enum KnownPrivateEndpointServiceConnectionStatus {
    Approved = "Approved",
    Pending = "Pending",
    Rejected = "Rejected"
}

// @public
export enum KnownPromoteMode {
    Switchover = "Switchover"
}

// @public
export enum KnownPromoteOption {
    Forced = "Forced"
}

// @public
export enum KnownProvisioningState {
    Canceled = "Canceled",
    Dropping = "Dropping",
    Failed = "Failed",
    InProgress = "InProgress",
    Succeeded = "Succeeded",
    Updating = "Updating"
}

// @public
export enum KnownPublicNetworkAccess {
    Disabled = "Disabled",
    Enabled = "Enabled"
}

// @public
export enum KnownReplicationRole {
    AsyncReplica = "AsyncReplica",
    GeoAsyncReplica = "GeoAsyncReplica",
    Primary = "Primary"
}

// @public
export enum KnownReplicationState {
    Active = "Active",
    Broken = "Broken",
    Catchup = "Catchup",
    Provisioning = "Provisioning",
    Reconfiguring = "Reconfiguring",
    Updating = "Updating"
}

// @public
export enum KnownStorageType {
    PremiumSSD = "PremiumSSD",
    PremiumSSDv2 = "PremiumSSDv2"
}

// @public
export enum KnownUserRole {
    DatabaseOwner = "dbOwner"
}

// @public
export enum KnownVersions {
    V20240301Preview = "2024-03-01-preview",
    V20240601Preview = "2024-06-01-preview",
    V20240701 = "2024-07-01",
    V20241001Preview = "2024-10-01-preview",
    V20250401Preview = "2025-04-01-preview"
}

// @public
export interface ListConnectionStringsResult {
    readonly connectionStrings?: ConnectionString[];
}

// @public
export interface MongoCluster extends TrackedResource {
    properties?: MongoClusterProperties;
}

// @public
export interface MongoClusterProperties {
    administrator?: AdministratorProperties;
    authConfig?: AuthConfigProperties;
    backup?: BackupProperties;
    readonly clusterStatus?: MongoClusterStatus;
    compute?: ComputeProperties;
    readonly connectionString?: string;
    createMode?: CreateMode;
    dataApi?: DataApiProperties;
    highAvailability?: HighAvailabilityProperties;
    readonly infrastructureVersion?: string;
    previewFeatures?: PreviewFeature[];
    readonly privateEndpointConnections?: PrivateEndpointConnection[];
    readonly provisioningState?: ProvisioningState;
    publicNetworkAccess?: PublicNetworkAccess;
    readonly replica?: ReplicationProperties;
    replicaParameters?: MongoClusterReplicaParameters;
    restoreParameters?: MongoClusterRestoreParameters;
    serverVersion?: string;
    sharding?: ShardingProperties;
    storage?: StorageProperties;
}

// @public
export interface MongoClusterReplicaParameters {
    sourceLocation: string;
    sourceResourceId: string;
}

// @public
export interface MongoClusterRestoreParameters {
    pointInTimeUTC?: Date;
    sourceResourceId?: string;
}

// @public
export type MongoClusterStatus = string;

// @public
export interface MongoClusterUpdate {
    properties?: MongoClusterUpdateProperties;
    tags?: Record<string, string>;
}

// @public
export interface MongoClusterUpdateProperties {
    administrator?: AdministratorProperties;
    authConfig?: AuthConfigProperties;
    backup?: BackupProperties;
    compute?: ComputeProperties;
    dataApi?: DataApiProperties;
    highAvailability?: HighAvailabilityProperties;
    previewFeatures?: PreviewFeature[];
    publicNetworkAccess?: PublicNetworkAccess;
    serverVersion?: string;
    sharding?: ShardingProperties;
    storage?: StorageProperties;
}

// @public
export interface Operation {
    readonly actionType?: ActionType;
    display?: OperationDisplay;
    readonly isDataAction?: boolean;
    readonly name?: string;
    readonly origin?: Origin;
}

// @public
export interface OperationDisplay {
    readonly description?: string;
    readonly operation?: string;
    readonly provider?: string;
    readonly resource?: string;
}

// @public
export type Origin = string;

// @public
export type PreviewFeature = string;

// @public
export interface PrivateEndpoint {
    readonly id?: string;
}

// @public
export interface PrivateEndpointConnection extends Resource {
    properties?: PrivateEndpointConnectionProperties;
}

// @public
export interface PrivateEndpointConnectionProperties {
    readonly groupIds?: string[];
    privateEndpoint?: PrivateEndpoint;
    privateLinkServiceConnectionState: PrivateLinkServiceConnectionState;
    readonly provisioningState?: PrivateEndpointConnectionProvisioningState;
}

// @public
export type PrivateEndpointConnectionProvisioningState = string;

// @public
export interface PrivateEndpointConnectionResource extends ProxyResource {
    properties?: PrivateEndpointConnectionProperties;
}

// @public
export type PrivateEndpointServiceConnectionStatus = string;

// @public
export interface PrivateLinkResource extends ProxyResource {
    properties?: PrivateLinkResourceProperties;
}

// @public
export interface PrivateLinkResourceProperties {
    readonly groupId?: string;
    readonly requiredMembers?: string[];
    requiredZoneNames?: string[];
}

// @public
export interface PrivateLinkServiceConnectionState {
    actionsRequired?: string;
    description?: string;
    status?: PrivateEndpointServiceConnectionStatus;
}

// @public
export type PromoteMode = string;

// @public
export type PromoteOption = string;

// @public
export interface PromoteReplicaRequest {
    mode?: PromoteMode;
    promoteOption: PromoteOption;
}

// @public
export type ProvisioningState = string;

// @public
export interface ProxyResource extends Resource {
}

// @public
export type PublicNetworkAccess = string;

// @public
export interface Replica extends ProxyResource {
    properties?: MongoClusterProperties;
}

// @public
export interface ReplicationProperties {
    readonly replicationState?: ReplicationState;
    readonly role?: ReplicationRole;
    readonly sourceResourceId?: string;
}

// @public
export type ReplicationRole = string;

// @public
export type ReplicationState = string;

// @public
export interface Resource {
    readonly id?: string;
    readonly name?: string;
    readonly systemData?: SystemData;
    readonly type?: string;
}

// @public
export interface ShardingProperties {
    shardCount?: number;
}

// @public
export interface StorageProperties {
    iops?: number;
    sizeGb?: number;
    throughput?: number;
    type?: StorageType;
}

// @public
export type StorageType = string;

// @public
export interface SystemData {
    createdAt?: Date;
    createdBy?: string;
    createdByType?: CreatedByType;
    lastModifiedAt?: Date;
    lastModifiedBy?: string;
    lastModifiedByType?: CreatedByType;
}

// @public
export interface TrackedResource extends Resource {
    location: string;
    tags?: Record<string, string>;
}

// @public
export interface User extends ProxyResource {
    properties?: UserProperties;
}

// @public
export interface UserProperties {
    identityProvider?: IdentityProviderUnion;
    readonly provisioningState?: ProvisioningState;
    roles?: DatabaseRole[];
}

// @public
export type UserRole = string;

// (No @packageDocumentation comment for this package)

```
