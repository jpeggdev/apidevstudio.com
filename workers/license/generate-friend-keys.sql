-- Generate 10 license keys for friends
-- Run with: wrangler d1 execute apidevstudio_licenses --file=generate-friend-keys.sql --remote

INSERT INTO licenses (id, key, email, created_at, updated_at) VALUES
('friend-01', 'ADEV-FR1ND-CKXJ7-M9PLQ-W2HBT', 'friend-license-01@apidevstudio.com', datetime('now'), datetime('now')),
('friend-02', 'ADEV-FR2ND-DLYH8-N4QMR-X3KCU', 'friend-license-02@apidevstudio.com', datetime('now'), datetime('now')),
('friend-03', 'ADEV-FR3ND-EMZK9-P5RNS-Y4LDV', 'friend-license-03@apidevstudio.com', datetime('now'), datetime('now')),
('friend-04', 'ADEV-FR4ND-FNAL2-Q6SPT-Z5MEW', 'friend-license-04@apidevstudio.com', datetime('now'), datetime('now')),
('friend-05', 'ADEV-FR5ND-GPBM3-R7TQU-A6NFX', 'friend-license-05@apidevstudio.com', datetime('now'), datetime('now')),
('friend-06', 'ADEV-FR6ND-HQCN4-S8URV-B7PGY', 'friend-license-06@apidevstudio.com', datetime('now'), datetime('now')),
('friend-07', 'ADEV-FR7ND-KRDP5-T9VSW-C8QHZ', 'friend-license-07@apidevstudio.com', datetime('now'), datetime('now')),
('friend-08', 'ADEV-FR8ND-LSEQ6-U2WTX-D9RJA', 'friend-license-08@apidevstudio.com', datetime('now'), datetime('now')),
('friend-09', 'ADEV-FR9ND-MTFR7-V3XUY-E2SKB', 'friend-license-09@apidevstudio.com', datetime('now'), datetime('now')),
('friend-10', 'ADEV-FR10D-NUGS8-W4YVZ-F3TLC', 'friend-license-10@apidevstudio.com', datetime('now'), datetime('now'));
