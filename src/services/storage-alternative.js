// Alternative storage service without Firebase Storage
// This replaces the storage.js file with free alternatives

// Alternative storage options
export const storageAlternatives = {
  // Option 1: External Links (Recommended for educational content)
  externalLinks: {
    // Store files on GitHub, Google Drive, Dropbox, etc.
    // Just store the direct download links in Firestore
    baseUrl: 'https://drive.google.com/uc?id=', // Google Drive example
    // or 'https://github.com/username/repo/raw/main/files/'
  },
  
  // Option 2: Base64 encoding (for small files only)
  base64: {
    maxSizeKB: 100, // Limit to small files
    supportedTypes: ['image/jpeg', 'image/png', 'text/plain']
  },
  
  // Option 3: Third-party free storage APIs
  thirdParty: {
    // Cloudinary (generous free tier)
    cloudinary: {
      cloudName: 'your-cloud-name',
      uploadPreset: 'your-upload-preset'
    },
    // ImgBB (free image hosting)
    imgbb: {
      apiKey: 'your-api-key'
    }
  }
};

// Upload file using external links (recommended)
export const uploadFileExternal = async (fileInfo) => {
  try {
    // For educational platform, you can:
    // 1. Upload files manually to Google Drive/GitHub
    // 2. Get the direct download link
    // 3. Store the link in Firestore
    
    const fileData = {
      name: fileInfo.name,
      type: fileInfo.type,
      size: fileInfo.size,
      downloadUrl: fileInfo.externalUrl, // Direct link to file
      uploadedAt: new Date(),
      category: fileInfo.category || 'general'
    };
    
    console.log('File info stored:', fileData);
    return {
      success: true,
      downloadURL: fileInfo.externalUrl,
      fileData
    };
  } catch (error) {
    console.error('Upload error:', error);
    throw error;
  }
};

// Upload small files as Base64 (for profile pictures, icons)
export const uploadFileBase64 = async (file) => {
  try {
    if (file.size > storageAlternatives.base64.maxSizeKB * 1024) {
      throw new Error(`File too large. Maximum size: ${storageAlternatives.base64.maxSizeKB}KB`);
    }
    
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const base64Data = reader.result;
        resolve({
          success: true,
          downloadURL: base64Data,
          fileData: {
            name: file.name,
            type: file.type,
            size: file.size,
            base64: base64Data,
            uploadedAt: new Date()
          }
        });
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  } catch (error) {
    console.error('Base64 upload error:', error);
    throw error;
  }
};

// Upload to Cloudinary (free tier: 25GB storage, 25GB bandwidth)
export const uploadFileCloudinary = async (file) => {
  try {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', storageAlternatives.thirdParty.cloudinary.uploadPreset);
    
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${storageAlternatives.thirdParty.cloudinary.cloudName}/raw/upload`,
      {
        method: 'POST',
        body: formData
      }
    );
    
    const data = await response.json();
    
    if (data.secure_url) {
      return {
        success: true,
        downloadURL: data.secure_url,
        fileData: {
          name: file.name,
          type: file.type,
          size: file.size,
          cloudinaryId: data.public_id,
          uploadedAt: new Date()
        }
      };
    } else {
      throw new Error('Upload failed');
    }
  } catch (error) {
    console.error('Cloudinary upload error:', error);
    throw error;
  }
};

// Main upload function - chooses best method based on file
export const uploadFile = async (file, options = {}) => {
  try {
    // For external links (recommended for educational content)
    if (options.externalUrl) {
      return await uploadFileExternal({
        name: file.name,
        type: file.type,
        size: file.size,
        externalUrl: options.externalUrl,
        category: options.category
      });
    }
    
    // For small files (profile pictures, icons)
    if (file.size <= storageAlternatives.base64.maxSizeKB * 1024) {
      return await uploadFileBase64(file);
    }
    
    // For larger files, use Cloudinary (if configured)
    if (storageAlternatives.thirdParty.cloudinary.cloudName) {
      return await uploadFileCloudinary(file);
    }
    
    // Fallback: suggest external hosting
    throw new Error(
      'File too large for free hosting. Please upload to Google Drive or GitHub and provide the direct link.'
    );
    
  } catch (error) {
    console.error('Upload error:', error);
    throw error;
  }
};

// Update file function
export const updateFile = async (file, path, options = {}) => {
  return uploadFile(file, options);
};
