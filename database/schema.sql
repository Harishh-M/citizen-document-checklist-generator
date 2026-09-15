-- =======================================================
-- Database: citizen_document_assistant
-- AI-Powered Citizen Application Document Checklist Generator (GOV-23)
-- MySQL Schema Specification
-- =======================================================

CREATE DATABASE IF NOT EXISTS citizen_document_assistant
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE citizen_document_assistant;

-- -------------------------------------------------------
-- TABLE 1: services
-- Stores government public services catalog
-- -------------------------------------------------------
DROP TABLE IF EXISTS ai_results;
DROP TABLE IF EXISTS citizen_requests;
DROP TABLE IF EXISTS documents;
DROP TABLE IF EXISTS services;

CREATE TABLE services (
  id INT AUTO_INCREMENT PRIMARY KEY,
  service_name VARCHAR(255) NOT NULL,
  department VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  eligibility TEXT,
  procedure_steps TEXT,
  source VARCHAR(255) NOT NULL,
  last_updated DATE NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- -------------------------------------------------------
-- TABLE 2: documents
-- Stores official government document requirements per service
-- -------------------------------------------------------
CREATE TABLE documents (
  id INT AUTO_INCREMENT PRIMARY KEY,
  service_id INT NOT NULL,
  document_name VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  mandatory BOOLEAN NOT NULL DEFAULT TRUE,
  condition_rule TEXT NULL,
  source VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_documents_service
    FOREIGN KEY (service_id) REFERENCES services(id)
    ON DELETE CASCADE
    ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- -------------------------------------------------------
-- TABLE 3: citizen_requests
-- Stores incoming citizen consultation requests & dynamic fields
-- -------------------------------------------------------
CREATE TABLE citizen_requests (
  id INT AUTO_INCREMENT PRIMARY KEY,
  service_id INT NOT NULL,
  citizen_data JSON NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_requests_service
    FOREIGN KEY (service_id) REFERENCES services(id)
    ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- -------------------------------------------------------
-- TABLE 4: ai_results
-- Stores validated structured LLM outputs and traceability logs
-- -------------------------------------------------------
CREATE TABLE ai_results (
  id INT AUTO_INCREMENT PRIMARY KEY,
  request_id INT NOT NULL,
  generated_result JSON NOT NULL,
  model_name VARCHAR(100) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_results_request
    FOREIGN KEY (request_id) REFERENCES citizen_requests(id)
    ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
