# AI-Powered Citizen Application Document Checklist Generator

**Problem Statement ID:** GOV-23  
**Domain:** Government e-Services, Digital Public Infrastructure & Citizen Advisory  
**AI Inference Engine:** Google Gemini (`gemini-3.8-flash`) via `@google/genai`  
**Ground Truth Storage:** Modular Local Government Registry (`backend/data/government-registry.json`), modular architecture ready for MySQL / Cloud SQL  
**Environment Requirements:** Zero external database credentials required (no DB_HOST, DB_USER, etc.)  
**Client Interface:** React 19, TypeScript, Tailwind CSS, jsPDF  

---

## 1. Problem Statement & Motivation

Citizens frequently submit incomplete or incorrect applications for government welfare schemes and certificates because they are uncertain which specific documents are required for their personal circumstances. 

Existing public portals typically provide either generic, static lists of documents or dense, multi-page legal gazettes that do not distinguish between mandatory and conditional requirements. Consequently:
- Citizens make multiple in-person trips to revenue or municipal offices.
- Approval times for critical benefits (scholarships, pensions, subsidies) are delayed.
- Administrative scrutiny officers face a high volume of rejected or defective submissions.

### The Solution: CitizenDoc AI (GOV-23)
A digital public advisory system that:
1. Allows citizens to select a public service from a verified government catalog.
2. Dynamically requests only relevant applicant circumstances (district, income, caste, etc.).
3. Retrieves certified requirements from a MySQL database as the **sole ground truth**.
4. Prompts **Google Gemini** under strict anti-hallucination constraints to structure a personalized checklist.
5. Employs a **Backend Cross-Validation Filter** to ensure zero invented documents can ever reach the citizen.
6. Provides an interactive preparation checklist and an official downloadable PDF.

---

## 2. System Architecture

```
+-------------------------------------------------------------+
|                     CITIZEN WEB CLIENT                      |
|  React 19 + TypeScript + Tailwind CSS + Lucide Icons + jsPDF|
+------------------------------+------------------------------+
                               |
                   HTTP REST   |  /api/services
                   JSON APIs   |  /api/checklist/generate
                               v
+-------------------------------------------------------------+
|                     EXPRESS SERVER (Node.js)                |
|  - Request Validation Middleware (No Sensitive Data Leaks)  |
|  - Rate Limiting & Error Handling Layer                     |
+------------------+-----------------------+------------------+
                   |                       |
      1. Fetch     |          2. Ground    |  3. Store Audit
      Truth        v          Truth Prompt v     & History
+-----------------------+   +---------------------------------+
|   MySQL DATABASE      |   |        GOOGLE GEMINI            |
|   (Source of Truth)   |   |        gemini-3.8-flash         |
|   - services          |   |  - Strict System Instruction    |
|   - documents         |   |  - Mandatory/Conditional Split  |
|   - citizen_requests  |   |  - Plain-Language Explanations  |
|   - ai_results        |   +----------------+----------------+
+-----------------------+                    |
                   ^                         | 4. Structured JSON
                   |                         v
                   +-----------+------------------------------+
                               |  BACKEND HALLUCINATION GATE  |
                               |  - Matches all docs to MySQL |
                               |  - Discards unknown entries  |
                               |  - Fallback Engine if AI 503 |
                               +------------------------------+
```

---

## 3. Zero-Hallucination Cybersecurity Architecture

Public governance requires zero tolerance for AI hallucinations. A citizen must never be instructed to produce an unapproved or irrelevant document.

1. **Context-Bound Retrieval (Database-First):**
   The LLM is strictly prohibited from using general pre-trained assumptions about public services. All permissible document requirements are queried from the MySQL database and injected directly into the prompt context.
2. **Negative Constraint System Prompting:**
   The model is instructed:
   - *"Never invent a document."*
   - *"Never create a government rule that is not present in the supplied context."*
   - *"Do not assume that a document is required unless the supplied context supports it."*
   - *"Return valid JSON only."*
3. **Backend Output Verification:**
   Before returning results to the client, the Express backend verifies each document against the database:
   ```typescript
   // Discards any document invented by the AI that is not in the database
   if (!officialDatabaseMap.has(normalizedName)) {
     console.warn(`[Hallucination Prevention] Discarded unsupported doc: ${docName}`);
     unsupportedDocsFiltered.push(docName);
     continue;
   }
   ```
4. **Deterministic Rule Engine Fallback:**
   If the Gemini API key is missing or the external API is unreachable, the system automatically falls back to an in-code deterministic government rule engine, guaranteeing high availability for citizens.

---

## 4. Database Schema

The database consists of 4 normalized relational tables defined in `/database/schema.sql`:

1. `services`
   - `id` (INT, Primary Key)
   - `service_name` (VARCHAR(150))
   - `department` (VARCHAR(150))
   - `description` (TEXT)
   - `eligibility` (TEXT)
   - `procedure_steps` (TEXT)
   - `source` (VARCHAR(255))
   - `last_updated` (DATE)
   - `created_at` (TIMESTAMP)

2. `documents`
   - `id` (INT, Primary Key)
   - `service_id` (INT, Foreign Key -> `services.id`)
   - `document_name` (VARCHAR(150))
   - `description` (TEXT)
   - `mandatory` (BOOLEAN: 1 = Mandatory, 0 = Conditional)
   - `condition_rule` (TEXT)
   - `source` (VARCHAR(255))

3. `citizen_requests`
   - `id` (INT, Primary Key)
   - `service_id` (INT, Foreign Key -> `services.id`)
   - `citizen_data` (JSON: Name, Age, District, Income, etc.)
   - `created_at` (TIMESTAMP)

4. `ai_results`
   - `id` (INT, Primary Key)
   - `request_id` (INT, Foreign Key -> `citizen_requests.id`)
   - `generated_result` (JSON: Validated structured checklist)
   - `model_name` (VARCHAR(100))
   - `created_at` (TIMESTAMP)

---

## 5. API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/health` | Service and server health check |
| `GET` | `/api/services` | Returns all available government services |
| `GET` | `/api/services/:id` | Returns a specific service and its official document rules |
| `POST` | `/api/checklist/generate` | Analyzes citizen parameters and returns personalized checklist |
| `GET` | `/api/checklist/:id` | Retrieves a previously generated checklist by reference ID |
| `GET` | `/api/admin/status` | System health, database connection, and AI model status |
| `POST` | `/api/admin/services` | Creates a new government service (Admin) |
| `POST` | `/api/admin/documents` | Adds an official document requirement to a service (Admin) |
| `DELETE` | `/api/admin/documents/:id`| Deletes a document requirement (Admin) |
| `POST` | `/api/admin/reset` | Resets registry to default official verified seeds |

---

## 6. Official Test Scenarios

### Scenario 1: Income Certificate (Student Applicant)
- **Citizen Details:** Name: *Karthik Subramanian*, Age: 22, District: *Erode*, Occupation: *Student*, Annual Income: *₹1,50,000*, Purpose: *College Fee Concession*.
- **Result:**
  - **Mandatory:** Aadhaar Card, Address Proof (Ration Card/Voter ID), Income Proof (Salary Slip / Form 16).
  - **Conditional:** Bank Passbook Statement (Required for non-salaried / self-employed review), Caste Certificate (applicable if seeking concession under quota).

### Scenario 2: Post-Matric Scholarship (SC Category College Student)
- **Citizen Details:** Name: *Priya Dharshini*, Age: 20, Course: *B.Tech Computer Science*, Category: *SC*, Family Income: *₹1,80,000*, Previous Marks: *82%*.
- **Result:**
  - **Mandatory:** Aadhaar Card, Admission / Fee Receipt, Previous Year Marksheet, Bank Account Passbook (Aadhaar Seeded).
  - **Conditional:** Community / Caste Certificate (triggers as required for SC scholarship quota).

### Scenario 3: PMAY Affordable Housing (Beneficiary-Led Construction)
- **Citizen Details:** Name: *Murugan Selvam*, Age: 44, Annual Income: *₹95,000*, Owns Pucca House: *No*, Owns Land Plot: *Yes*.
- **Result:**
  - **Mandatory:** Aadhaar Card of All Family Members, Income Certificate, No-Pucca House Self Declaration.
  - **Conditional:** Land Title Deed / Patta (Triggers for Individual House Construction on owned land).

---

## 7. Future RAG Extension Roadmap

To scale to thousands of municipal circulars and complex gazettes:
1. **Document Ingestion:** Automated OCR and ingestion pipeline for scanned government gazettes (PDF/A).
2. **Semantic Chunking:** Splitting circulars into legal clause nodes with metadata tagging.
3. **Hybrid Search:** Combining dense vector similarity with relational database constraints for maximum precision.

---

## 8. License & Disclaimer

Requirements presented by this system are based on official government documentation stored in the database. Citizens are advised to verify the latest notifications on the official state portal before final application submission.
