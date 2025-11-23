const fs = require('fs');
const path = require('path');

// Function to rename files in kamiti folder
function renameKataniImages() {
  const kataniDir = './public/mockdata/katani';

  try {
    // Read all files in the directory
    const files = fs.readdirSync(kataniDir);

    // Sort files to ensure consistent renaming
    const whatsappFiles = files
      .filter(file => file.startsWith('WhatsApp Image'))
      .sort();

    console.log(`Found ${whatsappFiles.length} WhatsApp images to rename`);

    // Rename files with proper names
    const newNames = [
      '01-exterior-overview.jpeg',
      '02-retail-facade.jpeg',
      '03-residential-units.jpeg',
      '04-community-spaces.jpeg',
      '05-rooftop-gardens.jpeg',
      '06-landscape-design.jpeg',
      '07-staircase-detail.jpeg',
      '08-facade-illumination.jpeg',
      '09-entrance-communal.jpeg',
      '10-modern-interior.jpeg'
    ];

    whatsappFiles.forEach((oldName, index) => {
      if (index < newNames.length) {
        const oldPath = path.join(kataniDir, oldName);
        const newPath = path.join(kataniDir, newNames[index]);

        fs.renameSync(oldPath, newPath);
        console.log(`Renamed: ${oldName} → ${newNames[index]}`);
      }
    });

    console.log('\n✅ All Katani images renamed successfully!');

  } catch (error) {
    console.error('Error renaming files:', error);
  }
}

// Also clean up loose WhatsApp images
function cleanUpLooseImages() {
  const mockdataDir = './public/mockdata';

  try {
    const files = fs.readdirSync(mockdataDir);

    const looseWhatsAppImages = files.filter(file =>
      file.startsWith('WhatsApp Image') && path.extname(file) === '.jpg'
    );

    if (looseWhatsAppImages.length > 0) {
      console.log(`\nFound ${looseWhatsAppImages.length} loose WhatsApp images to remove`);

      looseWhatsAppImages.forEach(file => {
        const filePath = path.join(mockdataDir, file);
        fs.unlinkSync(filePath);
        console.log(`Removed: ${file}`);
      });

      console.log('✅ Loose WhatsApp images cleaned up');
    }

  } catch (error) {
    console.error('Error cleaning up loose images:', error);
  }
}

// Also clean up app/mockdata WhatsApp images
function cleanUpAppMockdata() {
  const appMockdataDir = './app/mockdata';

  try {
    const files = fs.readdirSync(appMockdataDir);

    const whatsappImages = files.filter(file => file.startsWith('WhatsApp Image'));

    if (whatsappImages.length > 0) {
      console.log(`\nFound ${whatsappImages.length} WhatsApp images in app/mockdata to remove`);

      whatsappImages.forEach(file => {
        const filePath = path.join(appMockdataDir, file);
        fs.unlinkSync(filePath);
        console.log(`Removed: ${file}`);
      });

      console.log('✅ App mockdata WhatsApp images cleaned up');
    }

  } catch (error) {
    console.error('Error cleaning up app mockdata:', error);
  }
}

// Run all cleanup operations
console.log('🚀 Starting image organization...\n');
renameKataniImages();
cleanUpLooseImages();
cleanUpAppMockdata();
console.log('\n🎉 All images organized successfully!');
