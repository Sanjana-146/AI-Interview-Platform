import { v2 as cloudinary } from 'cloudinary';
import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';

// Configure Cloudinary with credentials from .env
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Configure Multer to use Cloudinary for storage
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'interview-ready-ai-profiles', // A folder name in your Cloudinary account
    allowed_formats: ['jpg', 'png', 'jpeg'],
    public_id: (req, file) => `profile-${req.user._id}-${Date.now()}`, // Unique public ID
  },
});

const upload = multer({ storage: storage });

export default upload;
