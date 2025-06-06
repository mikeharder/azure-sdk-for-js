## API Report File for "@azure/keyvault-certificates"

> Do not edit this file. It is a report generated by [API Extractor](https://api-extractor.com/).

```ts

import type { AbortSignalLike } from '@azure/abort-controller';
import { AzureLogger } from '@azure/logger';
import type { CancelOnProgress } from '@azure/core-lro';
import type * as coreClient from '@azure-rest/core-client';
import type { ExtendedCommonClientOptions } from '@azure/core-http-compat';
import type { PagedAsyncIterableIterator } from '@azure/core-paging';
import { PollerLike } from '@azure/core-lro';
import type { PollOperationState } from '@azure/core-lro';
import type { TokenCredential } from '@azure/core-auth';

// @public @deprecated
export type ActionType = CertificatePolicyAction;

// @public
export interface AdministratorContact {
    email?: string;
    firstName?: string;
    lastName?: string;
    phone?: string;
}

// @public
export type ArrayOneOrMore<T> = {
    0: T;
} & Array<T>;

// @public
export type BackupCertificateOptions = coreClient.OperationOptions;

// @public
export interface BackupCertificateResult {
    readonly value?: Uint8Array;
}

// @public
export interface BeginCreateCertificateOptions extends CreateCertificateOptions, CertificatePollerOptions {
}

// @public
export type BeginDeleteCertificateOptions = CertificatePollerOptions;

// @public
export type BeginRecoverDeletedCertificateOptions = CertificatePollerOptions;

// @public
export type CancelCertificateOperationOptions = coreClient.OperationOptions;

// @public
export class CertificateClient {
    constructor(vaultUrl: string, credential: TokenCredential, clientOptions?: CertificateClientOptions);
    backupCertificate(certificateName: string, options?: BackupCertificateOptions): Promise<Uint8Array | undefined>;
    beginCreateCertificate(certificateName: string, policy: CertificatePolicy, options?: BeginCreateCertificateOptions): Promise<PollerLikeWithCancellation<CreateCertificateState, KeyVaultCertificateWithPolicy>>;
    beginDeleteCertificate(certificateName: string, options?: BeginDeleteCertificateOptions): Promise<PollerLike<DeleteCertificateState, DeletedCertificate>>;
    beginRecoverDeletedCertificate(certificateName: string, options?: BeginRecoverDeletedCertificateOptions): Promise<PollerLike<RecoverDeletedCertificateState, KeyVaultCertificateWithPolicy>>;
    createIssuer(issuerName: string, provider: string, options?: CreateIssuerOptions): Promise<CertificateIssuer>;
    deleteCertificateOperation(certificateName: string, options?: DeleteCertificateOperationOptions): Promise<CertificateOperation>;
    deleteContacts(options?: DeleteContactsOptions): Promise<CertificateContact[] | undefined>;
    deleteIssuer(issuerName: string, options?: DeleteIssuerOptions): Promise<CertificateIssuer>;
    getCertificate(certificateName: string, options?: GetCertificateOptions): Promise<KeyVaultCertificateWithPolicy>;
    getCertificateOperation(certificateName: string, options?: GetCertificateOperationOptions): Promise<PollerLikeWithCancellation<CertificateOperationState, KeyVaultCertificateWithPolicy>>;
    getCertificatePolicy(certificateName: string, options?: GetCertificatePolicyOptions): Promise<CertificatePolicy>;
    getCertificateVersion(certificateName: string, version: string, options?: GetCertificateVersionOptions): Promise<KeyVaultCertificate>;
    getContacts(options?: GetContactsOptions): Promise<CertificateContact[] | undefined>;
    getDeletedCertificate(certificateName: string, options?: GetDeletedCertificateOptions): Promise<DeletedCertificate>;
    getIssuer(issuerName: string, options?: GetIssuerOptions): Promise<CertificateIssuer>;
    importCertificate(certificateName: string, certificateBytes: Uint8Array, options?: ImportCertificateOptions): Promise<KeyVaultCertificateWithPolicy>;
    listDeletedCertificates(options?: ListDeletedCertificatesOptions): PagedAsyncIterableIterator<DeletedCertificate>;
    listPropertiesOfCertificates(options?: ListPropertiesOfCertificatesOptions): PagedAsyncIterableIterator<CertificateProperties>;
    listPropertiesOfCertificateVersions(certificateName: string, options?: ListPropertiesOfCertificateVersionsOptions): PagedAsyncIterableIterator<CertificateProperties>;
    listPropertiesOfIssuers(options?: ListPropertiesOfIssuersOptions): PagedAsyncIterableIterator<IssuerProperties>;
    mergeCertificate(certificateName: string, x509Certificates: Uint8Array[], options?: MergeCertificateOptions): Promise<KeyVaultCertificateWithPolicy>;
    purgeDeletedCertificate(certificateName: string, options?: PurgeDeletedCertificateOptions): Promise<null>;
    restoreCertificateBackup(backup: Uint8Array, options?: RestoreCertificateBackupOptions): Promise<KeyVaultCertificateWithPolicy>;
    setContacts(contacts: CertificateContact[], options?: SetContactsOptions): Promise<CertificateContact[] | undefined>;
    updateCertificatePolicy(certificateName: string, policy: CertificatePolicy, options?: UpdateCertificatePolicyOptions): Promise<CertificatePolicy>;
    updateCertificateProperties(certificateName: string, version: string, options?: UpdateCertificateOptions): Promise<KeyVaultCertificate>;
    updateIssuer(issuerName: string, options?: UpdateIssuerOptions): Promise<CertificateIssuer>;
    readonly vaultUrl: string;
}

// @public
export interface CertificateClientOptions extends ExtendedCommonClientOptions {
    disableChallengeResourceVerification?: boolean;
    serviceVersion?: "7.0" | "7.1" | "7.2" | "7.3" | "7.4" | "7.5" | "7.6";
}

// @public
export type CertificateContact = RequireAtLeastOne<CertificateContactAll> | undefined;

// @public
export interface CertificateContactAll {
    email: string;
    name: string;
    phone: string;
}

// @public
export type CertificateContentType = "application/x-pem-file" | "application/x-pkcs12" | undefined;

// @public
export interface CertificateIssuer extends IssuerProperties {
    accountId?: string;
    administratorContacts?: AdministratorContact[];
    readonly createdOn?: Date;
    enabled?: boolean;
    organizationId?: string;
    password?: string;
    readonly updatedOn?: Date;
}

// @public
export type CertificateKeyCurveName = string;

// @public
export type CertificateKeyType = string;

// @public
export interface CertificateOperation {
    cancellationRequested?: boolean;
    certificateTransparency?: boolean;
    certificateType?: string;
    csr?: Uint8Array;
    error?: CertificateOperationError;
    readonly id?: string;
    issuerName?: string;
    readonly name?: string;
    requestId?: string;
    status?: string;
    statusDetails?: string;
    target?: string;
    readonly vaultUrl?: string;
}

// @public
export interface CertificateOperationError {
    readonly code?: string;
    readonly innerError?: CertificateOperationError;
    readonly message?: string;
}

// @public
export interface CertificateOperationState extends KeyVaultCertificatePollOperationState<KeyVaultCertificateWithPolicy> {
    certificateOperation?: CertificateOperation;
}

// @public
export type CertificatePolicy = CertificatePolicyProperties & RequireAtLeastOne<PolicySubjectProperties>;

// @public
export type CertificatePolicyAction = "EmailContacts" | "AutoRenew";

// @public
export interface CertificatePolicyProperties {
    certificateTransparency?: boolean;
    certificateType?: string;
    contentType?: CertificateContentType;
    readonly createdOn?: Date;
    enabled?: boolean;
    enhancedKeyUsage?: string[];
    exportable?: boolean;
    issuerName?: WellKnownIssuer | string;
    keyCurveName?: CertificateKeyCurveName;
    keySize?: number;
    keyType?: CertificateKeyType;
    keyUsage?: KeyUsageType[];
    lifetimeActions?: LifetimeAction[];
    reuseKey?: boolean;
    readonly updatedOn?: Date;
    validityInMonths?: number;
}

// @public
export interface CertificatePollerOptions extends coreClient.OperationOptions {
    intervalInMs?: number;
    resumeFrom?: string;
}

// @public
export interface CertificateProperties {
    readonly createdOn?: Date;
    enabled?: boolean;
    readonly expiresOn?: Date;
    readonly id?: string;
    readonly name?: string;
    notBefore?: Date;
    preserveCertificateOrder?: boolean;
    recoverableDays?: number;
    readonly recoveryLevel?: DeletionRecoveryLevel;
    tags?: CertificateTags;
    readonly updatedOn?: Date;
    readonly vaultUrl?: string;
    readonly version?: string;
    readonly x509Thumbprint?: Uint8Array;
    readonly x509ThumbprintString?: string;
}

// @public
export type CertificateTags = {
    [propertyName: string]: string;
};

// @public
export interface CoreSubjectAlternativeNames {
    dnsNames?: string[];
    emails?: string[];
    upns?: string[];
}

// @public
export interface CreateCertificateOptions extends CertificateProperties, coreClient.OperationOptions {
}

// @public
export type CreateCertificateState = KeyVaultCertificatePollOperationState<KeyVaultCertificateWithPolicy>;

// @public
export interface CreateIssuerOptions extends coreClient.OperationOptions {
    accountId?: string;
    administratorContacts?: AdministratorContact[];
    enabled?: boolean;
    organizationId?: string;
    password?: string;
}

// @public
export const DefaultCertificatePolicy: {
    issuerName: string;
    subject: string;
};

// @public
export type DeleteCertificateOperationOptions = coreClient.OperationOptions;

// @public
export type DeleteCertificateState = KeyVaultCertificatePollOperationState<DeletedCertificate>;

// @public
export type DeleteContactsOptions = coreClient.OperationOptions;

// @public
export interface DeletedCertificate extends KeyVaultCertificateWithPolicy {
    readonly deletedOn?: Date;
    readonly recoveryId?: string;
    readonly scheduledPurgeDate?: Date;
}

// @public
export type DeleteIssuerOptions = coreClient.OperationOptions;

// @public
export type DeletionRecoveryLevel = string;

// @public @deprecated
export interface ErrorModel {
    readonly code?: string;
    readonly innerError?: ErrorModel;
    readonly message?: string;
}

// @public
export type GetCertificateOperationOptions = CertificatePollerOptions;

// @public
export type GetCertificateOptions = coreClient.OperationOptions;

// @public
export type GetCertificatePolicyOptions = coreClient.OperationOptions;

// @public
export type GetCertificateVersionOptions = coreClient.OperationOptions;

// @public
export type GetContactsOptions = coreClient.OperationOptions;

// @public
export type GetDeletedCertificateOptions = coreClient.OperationOptions;

// @public
export type GetIssuerOptions = coreClient.OperationOptions;

// @public
export type GetPlainCertificateOperationOptions = coreClient.OperationOptions;

// @public
export interface ImportCertificateOptions extends coreClient.OperationOptions {
    enabled?: boolean;
    password?: string;
    policy?: ImportCertificatePolicy;
    preserveCertificateOrder?: boolean;
    tags?: CertificateTags;
}

// @public
export type ImportCertificatePolicy = CertificatePolicyProperties & Partial<PolicySubjectProperties>;

// @public
export interface IssuerAttributes {
    readonly created?: Date;
    enabled?: boolean;
    readonly updated?: Date;
}

// @public
export interface IssuerCredentials {
    accountId?: string;
    password?: string;
}

// @public
export interface IssuerParameters {
    certificateTransparency?: boolean;
    certificateType?: string;
    name?: string;
}

// @public
export interface IssuerProperties {
    id?: string;
    readonly name?: string;
    provider?: string;
}

// @public
export type KeyUsageType = string;

// @public
export interface KeyVaultCertificate {
    cer?: Uint8Array;
    id?: string;
    readonly keyId?: string;
    readonly name: string;
    properties: CertificateProperties;
    readonly secretId?: string;
}

// @public
export interface KeyVaultCertificateIdentifier {
    name: string;
    sourceId: string;
    vaultUrl: string;
    version?: string;
}

// @public
export interface KeyVaultCertificatePollOperationState<TResult> extends PollOperationState<TResult> {
    certificateName: string;
}

// @public
export interface KeyVaultCertificateWithPolicy extends KeyVaultCertificate {
    readonly policy?: CertificatePolicy;
}

// @public
export enum KnownCertificateKeyCurveNames {
    P256 = "P-256",
    P256K = "P-256K",
    P384 = "P-384",
    P521 = "P-521"
}

// @public
export enum KnownCertificateKeyTypes {
    EC = "EC",
    ECHSM = "EC-HSM",
    Oct = "oct",
    OctHSM = "oct-HSM",
    RSA = "RSA",
    RSAHSM = "RSA-HSM"
}

// @public
export enum KnownDeletionRecoveryLevels {
    CustomizedRecoverable = "CustomizedRecoverable",
    CustomizedRecoverableProtectedSubscription = "CustomizedRecoverable+ProtectedSubscription",
    CustomizedRecoverablePurgeable = "CustomizedRecoverable+Purgeable",
    Purgeable = "Purgeable",
    Recoverable = "Recoverable",
    RecoverableProtectedSubscription = "Recoverable+ProtectedSubscription",
    RecoverablePurgeable = "Recoverable+Purgeable"
}

// @public
export enum KnownKeyUsageTypes {
    CRLSign = "cRLSign",
    DataEncipherment = "dataEncipherment",
    DecipherOnly = "decipherOnly",
    DigitalSignature = "digitalSignature",
    EncipherOnly = "encipherOnly",
    KeyAgreement = "keyAgreement",
    KeyCertSign = "keyCertSign",
    KeyEncipherment = "keyEncipherment",
    NonRepudiation = "nonRepudiation"
}

// @public
export type KVPollerLike<TState extends PollOperationState<TResult>, TResult> = PollerLike<TState, TResult>;

// @public
export interface LifetimeAction {
    action?: CertificatePolicyAction;
    daysBeforeExpiry?: number;
    lifetimePercentage?: number;
}

// @public
export interface ListDeletedCertificatesOptions extends coreClient.OperationOptions {
    includePending?: boolean;
}

// @public
export interface ListPropertiesOfCertificatesOptions extends coreClient.OperationOptions {
    includePending?: boolean;
}

// @public
export type ListPropertiesOfCertificateVersionsOptions = coreClient.OperationOptions;

// @public
export type ListPropertiesOfIssuersOptions = coreClient.OperationOptions;

// @public
export const logger: AzureLogger;

// @public
export type MergeCertificateOptions = coreClient.OperationOptions;

// @public
export function parseKeyVaultCertificateIdentifier(id: string): KeyVaultCertificateIdentifier;

// @public
export interface PolicySubjectProperties {
    subject: string;
    subjectAlternativeNames: SubjectAlternativeNames;
}

export { PollerLike }

// @public
export interface PollerLikeWithCancellation<TState extends PollOperationState<TResult>, TResult> {
    cancelOperation(options?: {
        abortSignal?: AbortSignalLike;
    }): Promise<void>;
    getOperationState(): TState;
    getResult(): TResult | undefined;
    isDone(): boolean;
    isStopped(): boolean;
    onProgress(callback: (state: TState) => void): CancelOnProgress;
    poll(options?: {
        abortSignal?: AbortSignalLike;
    }): Promise<void>;
    pollUntilDone(): Promise<TResult>;
    stopPolling(): void;
    toString(): string;
}

// @public
export type PurgeDeletedCertificateOptions = coreClient.OperationOptions;

// @public
export type RecoverDeletedCertificateState = KeyVaultCertificatePollOperationState<KeyVaultCertificateWithPolicy>;

// @public
export type RequireAtLeastOne<T> = {
    [K in keyof T]-?: Required<Pick<T, K>> & Partial<Pick<T, Exclude<keyof T, K>>>;
}[keyof T];

// @public
export type RestoreCertificateBackupOptions = coreClient.OperationOptions;

// @public
export type SetContactsOptions = coreClient.OperationOptions;

// @public
export type SubjectAlternativeNames = RequireAtLeastOne<SubjectAlternativeNamesAll>;

// @public
export interface SubjectAlternativeNamesAll {
    dnsNames: ArrayOneOrMore<string>;
    emails: ArrayOneOrMore<string>;
    userPrincipalNames: ArrayOneOrMore<string>;
}

// @public
export interface UpdateCertificateOptions extends CertificateProperties, coreClient.OperationOptions {
}

// @public
export type UpdateCertificatePolicyOptions = coreClient.OperationOptions;

// @public
export interface UpdateIssuerOptions extends CreateIssuerOptions {
    provider?: string;
}

// @public
export enum WellKnownIssuer {
    Self = "Self",
    Unknown = "Unknown"
}

// @public
export interface X509CertificateProperties {
    ekus?: string[];
    keyUsage?: KeyUsageType[];
    subject?: string;
    subjectAlternativeNames?: CoreSubjectAlternativeNames;
    validityInMonths?: number;
}

// (No @packageDocumentation comment for this package)

```
