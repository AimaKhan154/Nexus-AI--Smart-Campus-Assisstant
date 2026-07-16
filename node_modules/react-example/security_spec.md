# Security Spec - Nexus AI

## Data Invariants
1. Users must be authenticated to access personalized data.
2. Students can only update their own feedback.
3. Only users with the 'admin' role (verified in `/users/{uid}`) can create announcements or modify campus data.
4. Users cannot change their own roles.
5. All timestamps must be server-generated.

## The Dirty Dozen Payloads (Attempted Violations)

1. **Identity Spoofing**: Student trying to create an announcement as an Admin.
2. **Privilege Escalation**: User trying to update their own role from 'student' to 'admin'.
3. **Orphaned Record**: Creating a student profile for a non-existent user.
4. **Invalid Data Type**: Sending a string for the 'attendance' percentage (expected number).
5. **PII Leak**: Unauthenticated user trying to read the `/users` collection.
6. **Cross-User Write**: Student A trying to edit Student B's student record.
7. **Bypassing Server Timestamps**: Providing a manual `createdAt` in the past.
8. **Resource Exhaustion**: Sending a 1MB string for a location's name.
9. **Malicious ID**: Using a document ID with recursive path characters.
10. **State Corruption**: Deleting a mandatory announcement.
11. **Feedback Spam**: Creating feedback without a userId.
12. **Unauthorized Map Edit**: Student trying to move a campus building's coordinates.

## Pass Criteria
All payload violations must return `PERMISSION_DENIED` in the rule tests.
