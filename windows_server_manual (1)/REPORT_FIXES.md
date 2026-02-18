# REPORT_FIXES

## Repo Structure
- Removed legacy root application files and kept active project in `windows_server_manual (1)`.
- Renamed `Cursus` to `cursus`.
- Removed residual local artifacts (`dist`, `node_modules`, zip at repo root).

## Manual Fixes
- Added `client/src/lib/pdfTopicCoverage.ts` to map all extracted PDF topics to modules.
- Updated `client/src/pages/LearningPath.tsx` with mapped topic count per module.
- Updated `client/src/pages/ModuleContent.tsx` with `PDF Coverage` section per module.
- Updated `client/src/pages/Resources.tsx` to include complete PDF index and coverage docs.

## Generated Deliverables
- `coverage/pdf_index.md`
- `coverage/coverage_matrix.md`
- `coverage/coverage_report.md`
- `video/video_links_added.md`
- `video/video_links_needed.md`