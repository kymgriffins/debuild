@echo off
echo Renaming Katani project images...

REM Navigate to katani folder
cd /d "%~dp0public\mockdata\katani"

REM Rename all WhatsApp images to proper project names
ren "WhatsApp Image 2025-11-23 at 17.26.23.jpeg" "01-exterior-overview.jpeg"
ren "WhatsApp Image 2025-11-23 at 17.26.24.jpeg" "02-retail-facade.jpeg"
ren "WhatsApp Image 2025-11-23 at 17.26.24 (1).jpeg" "03-residential-units.jpeg"
ren "WhatsApp Image 2025-11-23 at 17.26.24 (2).jpeg" "04-community-spaces.jpeg"
ren "WhatsApp Image 2025-11-23 at 17.26.25.jpeg" "05-rooftop-gardens.jpeg"
ren "WhatsApp Image 2025-11-23 at 17.26.25 (1).jpeg" "06-landscape-design.jpeg"
ren "WhatsApp Image 2025-11-23 at 17.26.25 (2).jpeg" "07-staircase-detail.jpeg"
ren "WhatsApp Image 2025-11-23 at 17.26.25 (3).jpeg" "08-facade-illumination.jpeg"
ren "WhatsApp Image 2025-11-23 at 17.26.26.jpeg" "09-entrance-communal.jpeg"
ren "WhatsApp Image 2025-11-23 at 17.26.26 (1).jpeg" "10-modern-interior.jpeg"

echo Files renamed successfully!
pause
