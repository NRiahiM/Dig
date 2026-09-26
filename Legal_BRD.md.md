# Batch Transfer — Business Requirements & Specification

## 1. Business Objective

Provide legal VIP customers with the ability to create and process a **batch transfer request** containing multiple money-transfer transactions from a selected source deposit.

A batch may contain up to **100,000 transfer records**.

Because the source deposit may have a signature rule requiring approval from specific persons, each batch transfer must pass through a customer-defined approval workflow before the transaction can be finalized.

The workflow is configured **before creating a batch transfer request** and is reusable for future batch transfer requests associated with the same deposit.

The workflow may take several days to complete.

The system must ensure that the workflow satisfies the **current signature rule of the selected source deposit** before finalization.

---

# 2. Core Concepts

## 2.1 Batch Transfer Request

A Batch Transfer Request represents a request to transfer money through multiple individual transactions from **one source deposit**.

Example:

```text
Source Deposit: Deposit B

Batch Request
├── Transaction 1 → IBAN A → 100M
├── Transaction 2 → IBAN B → 200M
├── Transaction 3 → IBAN C → 50M
└── ...
```

A request may contain up to **100,000 records**.

The request has a single batch-level lifecycle and is finalized using a transaction ID representing the entire batch.

---

## 2.2 Source Deposit

The user selects one deposit that they have access to.

A batch transfer request has **one source deposit**.

The user may only select deposits that they are authorized to use.

The system must evaluate the deposit's signature rule before a workflow can be configured/used for the deposit.

---

## 2.3 Workflow

A **workflow is a predefined approval flow configured by the legal customer before creating a batch transfer request**.

The workflow is reusable and can be selected for multiple future batch transfer requests associated with the same deposit, as long as it remains valid for that deposit.

The workflow defines the sequence and approval requirements that must be completed before the batch can be finalized.

Example:

```text
Legal Customer configures workflow for Deposit B

Workflow A
──────────────
Step 1: A

Step 2: B OR C

Step 3: D


Later:

Batch Request #101 → uses Workflow A
Batch Request #102 → uses Workflow A
Batch Request #103 → uses Workflow A
```

A workflow may contain multiple participants in a node and may support logical rules such as **AND / OR**.

Workflow participants do not necessarily need to have a relationship with the source deposit.

However, the workflow must satisfy the source deposit's signature rule.

---

## 2.4 Deposit Signature Rule

The deposit has a signature rule that defines the people/signers required to authorize withdrawal.

Example:

```text
X AND (Y OR Z)
```

This means:

* X must approve
* and either Y or Z must approve

The workflow may contain other participants in addition to those required by the deposit signature rule.

The workflow is considered suitable only when its approval structure can satisfy the deposit's signature rule.

---

## 2.5 Delegation

Delegation is **action-based**.

A deposit owner/signer may delegate another person to perform a specific action, such as starting a batch transfer.

Delegation for starting a transaction does not automatically grant approval authority.

Delegation may also be used for other supported actions independently.

---

# 3. Actors

| Actor                    | Responsibility                                                    |
| ------------------------ | ----------------------------------------------------------------- |
| Legal Customer           | Configures reusable workflows and creates batch-transfer requests |
| Request Creator          | Creates and manages a batch request                               |
| Workflow Participant     | Performs an assigned workflow step                                |
| Deposit Owner            | Has ownership/authorization relationship with the deposit         |
| Deposit Signer           | Participates in the deposit's signature rule                      |
| Delegated User           | Performs an explicitly delegated action                           |
| Banking Service Provider | Performs inquiry/final transaction processing                     |

The request creator and legal customer are both associated with the request.

---

# 4. Batch Transfer Data

## 4.1 User/File Data

Each transfer record contains:

| Field                    | Description                                                                               |
| ------------------------ | ----------------------------------------------------------------------------------------- |
| Destination IBAN         | Destination account IBAN                                                                  |
| Amount                   | Transfer amount                                                                           |
| User Item Reference Code | Reference code provided by the customer/user for identifying the individual transfer item |
| Destination Name         | Recipient name                                                                            |
| Destination Family       | Recipient family/name information                                                         |
| Cause Type               | Transfer cause/category                                                                   |

## 4.2 System-Generated Data

The system generates/manages:

| Field                     | Description                                                         |
| ------------------------- | ------------------------------------------------------------------- |
| Item Tracking Code        | Unique system-generated reference for an individual transfer record |
| System Tracking Code      | Reference for the batch/request                                     |
| Batch Transaction ID      | Transaction ID used for final batch execution                       |
| Validation Status         | Result of record validation                                         |
| IBAN Inquiry Result       | Result returned by inquiry service                                  |
| Warning/Error Information | Validation and inquiry messages                                     |

### User Item Reference Code vs Item Tracking Code

These fields have different purposes.

**User Item Reference Code**

* Supplied by the customer/user.
* Comes from the uploaded file or request data.
* Helps the customer identify/reconcile an individual transfer item.
* May be used for searching or displaying records.

**Item Tracking Code**

* Generated by the system.
* Uniquely identifies the transfer item inside the banking system.
* Used for system-level tracking and audit.

Example:

```text
User Item Reference Code: INV-2026-00125
Item Tracking Code:       ITM-987654321
```

---

# 5. Request Creation

## 5.1 Preconditions

The user must have permission to start a transfer from the selected deposit.

This permission may be obtained directly or through delegation.

The selected deposit must have a valid reusable workflow configured before the batch transfer can proceed to workflow processing.

## 5.2 Creation Flow

The expected business flow is:

```text
Select Source Deposit
        ↓
Upload Batch File
        ↓
Initial File Validation
        ↓
Store Valid/Invalid Records
        ↓
IBAN Inquiry
        ↓
Display Results
        ↓
User Correction / Warning Confirmation
        ↓
Final Validation
        ↓
Select Existing Reusable Workflow
        ↓
Workflow Execution
        ↓
Final Deposit Signature Rule Check
        ↓
Batch Finalization
```

---

# 6. Batch File

The maximum supported number of records is:

**100,000 records per batch request**

The system must prevent duplicate file submission.

The exact duplicate-file detection mechanism is TBD.

---

# 7. Validation

Validation should identify both errors and warnings.

## 7.1 Errors

Errors prevent the request from continuing until they are corrected.

Examples:

* Invalid IBAN
* Invalid mandatory data
* Invalid amount
* Invalid business data
* Unsupported transfer data

## 7.2 Warnings

Warnings do not necessarily prevent continuation.

Example:

* Duplicate destination

The user must explicitly confirm warnings before continuing.

## 7.3 Result Display

Validation results should be shown together.

Example:

```text
Total records: 100,000
Valid:          97,450
Warnings:        2,300
Errors:            250
```

The user must be able to identify and correct problematic records.

---

# 8. Record Management

Because a batch may contain 100,000 records, the system must not require all records to be rendered in the browser simultaneously.

Recommended UI behavior:

* Server-side pagination
* Search
* Filtering
* Record status
* Error/warning details
* Download capability
* Individual record editing

Recommended filters:

```text
All
Valid
Warning
Error
```

Recommended search fields:

* Destination IBAN
* User Item Reference Code
* Item Tracking Code

---

# 9. Revalidation

After the user corrects records or confirms warnings, the system should perform validation again.

The recommended approach is to perform a **full batch validation** before the request becomes workflow-ready.

This ensures that changes made during correction cannot leave previously valid records in an inconsistent state.

Final validation is also required before execution because the workflow may remain active for several days.

---

# 10. IBAN Inquiry

The system performs IBAN inquiry for the uploaded destination IBANs.

The inquiry result may be compared with information supplied in the file.

Example:

```text
File:
IBAN: IR123
Name: Company A

Inquiry:
IBAN: IR123
Name: Company B
```

This should produce a warning that the information differs.

The user can:

```text
Confirm
```

or

```text
Edit
```

The exact matching rules and warning thresholds are TBD.

---

# 11. Workflow Management

Workflows are configured by the legal customer **before a batch transfer request is created**.

A workflow is reusable.

Once configured for a deposit, the same workflow can be selected for multiple future batch transfer requests for that deposit.

Example:

```text
Deposit B

Legal Customer creates:

Workflow A
A → B → C


Later:

Batch Request #101 → Workflow A
Batch Request #102 → Workflow A
Batch Request #103 → Workflow A
```

Before a workflow is created or activated, the system must verify that it can satisfy the signature rule of the associated deposit.

When a batch transfer request is created, the user selects an existing valid workflow rather than designing a new workflow for each transaction.

A workflow may contain multiple participants in a node.

Logical relationships such as **AND / OR** may be supported.

---

# 12. Workflow and Deposit Signature Rule

Before a workflow is used for a batch request, the system must verify that the workflow can satisfy the selected deposit's signature rule.

Example deposit rule:

```text
X AND (Y OR Z)
```

The workflow must provide a path through which:

```text
X
AND
(Y OR Z)
```

can be satisfied.

Participants who are not related to the deposit may still participate in the workflow.

The system must distinguish between:

**Workflow participation**

and

**Deposit signature authorization**

They are related but are not the same concept.

---

# 13. Workflow Deactivation and Replacement

A workflow that is already associated with active requests should not be modified in-place.

If the legal customer wants to change a workflow:

```text
Existing Workflow
        ↓
Deactivate
        ↓
Create New Workflow
```

The customer creates a new workflow instead of modifying the existing workflow.

The deactivated workflow cannot be selected for new batch requests.

The behavior of already-active requests when their workflow is deactivated requires final confirmation.

---

# 14. Workflow Execution

The workflow is sequential.

Example:

```text
A
 ↓
B
 ↓
C
```

A must complete before B becomes active.

A node may contain multiple participants and logical conditions.

Example:

```text
A
 ↓
B OR C
 ↓
D AND E
```

Once an OR condition is satisfied, another participant in that OR node cannot subsequently approve as an additional required approval.

---

# 15. Workflow Approval

An approver approves the **workflow step**, not the individual transactions separately.

The approval represents completion of that participant's required workflow action.

The batch itself is finalized only after the complete workflow has been successfully completed and the current deposit conditions have been verified.

---

# 16. Workflow Rejection

If any required workflow participant rejects the request, the entire Batch Transfer Request is rejected.

The rejected request cannot simply be resumed.

The customer must create a **new batch transfer request**.

A rejection reason is optional.

If provided, it should be stored as part of the request history/audit trail.

---

# 17. Request Editing

Batch data can be edited **before the workflow starts**.

Once the workflow has started:

> The batch data becomes immutable.

If a request has been rejected and the customer wants to change the data, a new request must be created.

---

# 18. Request Cancellation

The request can be cancelled at any stage before finalization.

Cancellation is permitted at any point before finalization.

After finalization begins, cancellation behavior is controlled by the finalization/service-provider process.

---

# 19. Workflow Expiration

A workflow has an expiration time.

If the required approvals are not completed before expiration:

```text
Workflow
    ↓
Expiration
    ↓
Request Expired
```

The customer must create a new request.

---

# 20. Deposit Signature Rule Changes

The deposit signature rule can change while a request is in progress.

Therefore, the system must **not rely only on the signature rule evaluated when the workflow was created**.

Before finalization, the system must evaluate the **current signature rule**.

If the current rule is no longer satisfied, the request cannot be finalized and a new request must be created.

---

# 21. Request Visibility

The request is visible to:

* the request creator
* workflow participants involved in the request

For example:

```text
Creator: M

Workflow:
A → B → C

Visible:
M
A
B
C
```

---

# 22. Approver View

An approver should see sufficient information to understand what they are approving without requiring the browser to render 100,000 rows simultaneously.

Recommended information:

```text
Batch Transfer #123

Source Deposit
Total Amount
Total Records
Creator
Current Workflow Step
Workflow Status

Validation Summary
- Valid
- Warning
- Error

IBAN Inquiry Status

Attachments

Request History

[View Records]

[Approve]
[Reject]
```

The approver should be able to search/filter records and inspect the batch when required.

---

# 23. Attachments

Attachments are supported on the request.

Examples:

* PDF
* Excel
* Contract
* Authorization document

Attachments are visible to relevant workflow participants.

Participants may also add attachments where permitted.

Exact file types, size limits, and permissions are TBD.

---

# 24. Notifications

The system should notify a workflow participant when the request becomes their turn.

Example:

```text
A approves
     ↓
B becomes active
     ↓
Notification to B
```

The notification mechanism is TBD.

Potential channels:

* In-app notification
* SMS
* Email

---

# 25. Finalization

After the workflow has completed, the system performs final processing.

Conceptually:

```text
Workflow Completed
        ↓
Check Current Deposit Signature Rule
        ↓
Final Validation
        ↓
Service Provider Call 1
        ↓
Service Provider Call 2
        ↓
Service Provider Call 3
        ↓
Batch Finalized
```

The actual three service calls are external service-provider operations.

---

# 26. Batch Transaction ID

Finalization uses a transaction ID representing the **entire batch request**.

The application does not independently manage the success/failure status of every individual transaction record after the final transaction is handed to the service provider.

The service provider owns the underlying transaction-level execution behavior.

---

# 27. Retry / Idempotency

If a finalization call fails or times out, the system must be able to safely retry using the same batch transaction ID where supported by the service provider.

The service provider must provide idempotency guarantees to prevent duplicate execution.

---

# 28. Balance Checking

The application does not reserve or validate the source deposit balance throughout the workflow.

Balance and final withdrawal conditions are evaluated during the finalization process by the banking/service-provider system.

---

# 29. Audit History

The system must maintain a complete audit trail.

Example:

```text
22 Sep 10:20 — Request created by M
22 Sep 10:25 — File validation completed
22 Sep 10:27 — IBAN inquiry completed
22 Sep 10:30 — Warning confirmed by M
22 Sep 11:00 — A approved
23 Sep 09:15 — B approved
23 Sep 14:40 — C approved
23 Sep 14:42 — Finalization started
23 Sep 14:45 — Finalization completed
```

The audit history should record at minimum:

* Actor
* Action
* Date/time
* Request state
* Workflow step
* Relevant reason/comment where applicable
* Attachment actions
* Validation actions
* Finalization actions

---

# 30. High-Level Request Lifecycle

```text
Created
   ↓
Processing
   ↓
Correction / User Confirmation
   ↓
Workflow Ready
   ↓
Workflow Running
   ↓
Workflow Completed
   ↓
Current Deposit Rule Check
   ↓
Finalization
   ↓
Finalized
```

Alternative terminal states include:

```text
Rejected
Expired
Cancelled
Invalidated
```

---

# 31. Important Business Rules

| #     | Rule                                                                                                            |
| ----- | --------------------------------------------------------------------------------------------------------------- |
| BR-01 | A batch request has one source deposit.                                                                         |
| BR-02 | Maximum batch size is 100,000 records.                                                                          |
| BR-03 | User must have direct or delegated permission to start the transfer.                                            |
| BR-04 | Workflow is configured by the legal customer **before creating a batch transfer request**.                      |
| BR-05 | A configured workflow is reusable for multiple future batch transfer requests associated with the same deposit. |
| BR-06 | Workflow must satisfy the selected deposit's signature rule.                                                    |
| BR-07 | Workflow participants do not necessarily need a relationship with the deposit.                                  |
| BR-08 | Workflow is sequential.                                                                                         |
| BR-09 | A workflow node may contain multiple participants with logical AND/OR rules.                                    |
| BR-10 | Batch records can be edited only before workflow starts.                                                        |
| BR-11 | Validation errors must be corrected before continuing.                                                          |
| BR-12 | Warnings require explicit user confirmation.                                                                    |
| BR-13 | Validation results are displayed together.                                                                      |
| BR-14 | Rejection rejects the complete request.                                                                         |
| BR-15 | Rejected requests require creation of a new request.                                                            |
| BR-16 | Request can be cancelled before finalization.                                                                   |
| BR-17 | Workflow has an expiration time.                                                                                |
| BR-18 | Expired requests require a new request.                                                                         |
| BR-19 | Current deposit signature rules must be checked before finalization.                                            |
| BR-20 | A changed signature rule can invalidate an active request.                                                      |
| BR-21 | A batch transaction ID represents the entire batch request.                                                     |
| BR-22 | Transaction-level execution is handled by the service provider.                                                 |
| BR-23 | Finalization calls must be idempotent/retry-safe.                                                               |
| BR-24 | Request history must be audited.                                                                                |
| BR-25 | Workflow participants are notified when their step becomes active.                                              |
| BR-26 | Attachments are supported.                                                                                      |
| BR-27 | Each transfer item may contain a user-provided Item Reference Code.                                             |
| BR-28 | User Item Reference Code is different from the system-generated Item Tracking Code.                             |

---

# 32. Open Questions / TBD

1. Exact batch-file format and versioning.
2. Exact validation rules for every field.
3. Duplicate-file detection mechanism.
4. Duplicate destination definition and warning behavior.
5. Maximum/minimum amount per record.
6. Currency handling.
7. Whether all records must have the same currency.
8. Exact IBAN inquiry behavior.
9. Exact workflow AND/OR expression capabilities.
10. Whether arbitrary nested expressions are supported.
11. Workflow deactivation behavior for already-active requests.
12. Visibility rules for non-participants.
13. Attachment file types and size limits.
14. Attachment permissions.
15. Notification channels.
16. Request status/state names.
17. Exact three service-provider APIs and their contracts.
18. Finalization retry behavior for each service.
19. Idempotency contract with the service provider.
20. Behavior when the current deposit signature rule is no longer satisfied.
21. Behavior when the source deposit becomes unavailable/restricted before finalization.
22. Balance/withdrawal failure handling during finalization.
23. Whether a request can be manually expired/cancelled by authorized users.
24. Exact permissions for creator, owner, signer, delegate and workflow participant.
25. Whether workflow configuration itself requires approval.
