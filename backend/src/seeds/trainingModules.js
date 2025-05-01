const mongoose = require('mongoose');
const dotenv = require('dotenv');
const TrainingModule = require('../models/training.model');

// Load environment variables
dotenv.config();

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/artisanlink')
  .then(() => console.log('Connected to MongoDB for seeding'))
  .catch((err) => {
    console.error('Failed to connect to MongoDB:', err.message);
    process.exit(1);
  });

// Sample training modules data
const trainingModules = [
  // Photography Modules - English
  {
    title: 'Product Photography Basics',
    description: 'Learn how to take professional photos of your products using just your smartphone.',
    category: 'photography',
    level: 'beginner',
    duration: 15,
    thumbnail: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
    contentLanguage: 'english',
    videoUrl: 'https://player.vimeo.com/video/517031489',
    resources: [
      {
        title: 'Photography Basics Guide',
        fileUrl: 'https://www.dropbox.com/scl/fi/rnhv1bm0rlc9yrjl9j0gg/Product-Photography-Basics.pdf?rlkey=sample&dl=1',
        fileType: 'pdf',
        description: 'A comprehensive guide to product photography basics'
      },
      {
        title: 'Lighting Cheat Sheet',
        fileUrl: 'https://www.dropbox.com/scl/fi/rnhv1bm0rlc9yrjl9j0gg/Lighting-Cheat-Sheet.pdf?rlkey=sample&dl=1',
        fileType: 'pdf',
        description: 'Quick reference for lighting setups'
      }
    ],
    learningPoints: [
      'Understanding basic photography principles',
      'Setting up proper lighting with household items',
      'Composing product shots effectively',
      'Simple editing techniques for smartphones'
    ],
    featured: true,
    status: 'published'
  },
  {
    title: 'Lighting Techniques for Handcrafts',
    description: 'Master the art of lighting to showcase the details and textures of your handcrafted products.',
    category: 'photography',
    level: 'intermediate',
    duration: 20,
    thumbnail: 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
    contentLanguage: 'english',
    videoUrl: 'https://player.vimeo.com/video/517031489',
    resources: [
      {
        title: 'Advanced Lighting Guide',
        fileUrl: 'https://www.dropbox.com/scl/fi/rnhv1bm0rlc9yrjl9j0gg/Advanced-Lighting-Guide.pdf?rlkey=sample&dl=1',
        fileType: 'pdf',
        description: 'Detailed guide for advanced lighting techniques'
      }
    ],
    learningPoints: [
      'Understanding light direction and quality',
      'Creating dramatic shadows to highlight texture',
      'Using reflectors and diffusers effectively',
      'Lighting for different materials (metal, fabric, wood)'
    ],
    featured: false,
    status: 'published'
  },

  // Photography Modules - Hindi
  {
    title: 'उत्पाद फोटोग्राफी की मूल बातें',
    description: 'अपने स्मार्टफोन का उपयोग करके अपने उत्पादों की पेशेवर तस्वीरें कैसे लें, यह सीखें।',
    category: 'photography',
    level: 'beginner',
    duration: 15,
    thumbnail: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
    contentLanguage: 'hindi',
    videoUrl: 'https://player.vimeo.com/video/517031489',
    resources: [
      {
        title: 'फोटोग्राफी बेसिक गाइड',
        fileUrl: 'https://www.dropbox.com/scl/fi/rnhv1bm0rlc9yrjl9j0gg/Product-Photography-Basics-Hindi.pdf?rlkey=sample&dl=1',
        fileType: 'pdf',
        description: 'उत्पाद फोटोग्राफी की मूल बातों के लिए एक व्यापक गाइड'
      },
      {
        title: 'लाइटिंग चीट शीट',
        fileUrl: 'https://www.dropbox.com/scl/fi/rnhv1bm0rlc9yrjl9j0gg/Lighting-Cheat-Sheet-Hindi.pdf?rlkey=sample&dl=1',
        fileType: 'pdf',
        description: 'लाइटिंग सेटअप के लिए त्वरित संदर्भ'
      }
    ],
    learningPoints: [
      'बुनियादी फोटोग्राफी सिद्धांतों को समझना',
      'घरेलू वस्तुओं से उचित प्रकाश व्यवस्था करना',
      'उत्पाद शॉट्स को प्रभावी ढंग से कंपोज करना',
      'स्मार्टफोन के लिए सरल संपादन तकनीकें'
    ],
    featured: true,
    status: 'published'
  },

  // Pricing Modules - English
  {
    title: 'Setting Fair Prices for Your Craft',
    description: 'Learn how to calculate the true value of your work and set prices that are fair to both you and your customers.',
    category: 'pricing',
    level: 'beginner',
    duration: 25,
    thumbnail: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
    contentLanguage: 'english',
    videoUrl: 'https://player.vimeo.com/video/517031489',
    resources: [
      {
        title: 'Pricing Calculator Spreadsheet',
        fileUrl: 'https://www.dropbox.com/scl/fi/rnhv1bm0rlc9yrjl9j0gg/Pricing-Calculator.xlsx?rlkey=sample&dl=1',
        fileType: 'xls',
        description: 'Excel spreadsheet to help calculate fair prices for your products'
      },
      {
        title: 'Pricing Strategy Guide',
        fileUrl: 'https://www.dropbox.com/scl/fi/rnhv1bm0rlc9yrjl9j0gg/Pricing-Strategy-Guide.pdf?rlkey=sample&dl=1',
        fileType: 'pdf',
        description: 'Comprehensive guide to pricing strategies for artisans'
      }
    ],
    learningPoints: [
      'Understanding the components of product cost',
      'Calculating labor costs fairly',
      'Market research for competitive pricing',
      'Pricing strategies for different sales channels',
      'When and how to offer discounts'
    ],
    featured: true,
    status: 'published'
  },

  // Pricing Modules - Hindi
  {
    title: 'अपने शिल्प के लिए उचित मूल्य निर्धारित करना',
    description: 'अपने काम के वास्तविक मूल्य की गणना करना और ऐसे मूल्य निर्धारित करना सीखें जो आपके और आपके ग्राहकों दोनों के लिए उचित हों।',
    category: 'pricing',
    level: 'beginner',
    duration: 25,
    thumbnail: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
    contentLanguage: 'hindi',
    videoUrl: 'https://player.vimeo.com/video/517031489',
    resources: [
      {
        title: 'मूल्य निर्धारण कैलकुलेटर स्प्रेडशीट',
        fileUrl: 'https://www.dropbox.com/scl/fi/rnhv1bm0rlc9yrjl9j0gg/Pricing-Calculator-Hindi.xlsx?rlkey=sample&dl=1',
        fileType: 'xls',
        description: 'आपके उत्पादों के लिए उचित मूल्य की गणना करने में मदद के लिए एक्सेल स्प्रेडशीट'
      },
      {
        title: 'मूल्य निर्धारण रणनीति गाइड',
        fileUrl: 'https://www.dropbox.com/scl/fi/rnhv1bm0rlc9yrjl9j0gg/Pricing-Strategy-Guide-Hindi.pdf?rlkey=sample&dl=1',
        fileType: 'pdf',
        description: 'कारीगरों के लिए मूल्य निर्धारण रणनीतियों की व्यापक गाइड'
      }
    ],
    learningPoints: [
      'उत्पाद लागत के घटकों को समझना',
      'श्रम लागत की निष्पक्ष गणना',
      'प्रतिस्पर्धी मूल्य निर्धारण के लिए बाजार अनुसंधान',
      'विभिन्न बिक्री चैनलों के लिए मूल्य निर्धारण रणनीतियां',
      'छूट कब और कैसे प्रदान करें'
    ],
    featured: false,
    status: 'published'
  },

  // Packaging Modules - English
  {
    title: 'Eco-Friendly Packaging Solutions',
    description: 'Discover sustainable packaging options that protect your products while minimizing environmental impact.',
    category: 'packaging',
    level: 'beginner',
    duration: 18,
    thumbnail: 'https://images.unsplash.com/photo-1605600659873-d808a13e4d2a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
    contentLanguage: 'english',
    videoUrl: 'https://player.vimeo.com/video/517031489',
    resources: [
      {
        title: 'Sustainable Packaging Guide',
        fileUrl: 'https://www.dropbox.com/scl/fi/rnhv1bm0rlc9yrjl9j0gg/Sustainable-Packaging-Guide.pdf?rlkey=sample&dl=1',
        fileType: 'pdf',
        description: 'Comprehensive guide to eco-friendly packaging options'
      },
      {
        title: 'Packaging Supplier Directory',
        fileUrl: 'https://www.dropbox.com/scl/fi/rnhv1bm0rlc9yrjl9j0gg/Packaging-Supplier-Directory.pdf?rlkey=sample&dl=1',
        fileType: 'pdf',
        description: 'List of suppliers for sustainable packaging materials in India'
      }
    ],
    learningPoints: [
      'Understanding different eco-friendly materials',
      'Balancing protection and sustainability',
      'Cost-effective sustainable packaging solutions',
      'Creating a memorable unboxing experience',
      'Communicating your eco-values through packaging'
    ],
    featured: false,
    status: 'published'
  },

  // Packaging Modules - Hindi
  {
    title: 'पर्यावरण के अनुकूल पैकेजिंग समाधान',
    description: 'टिकाऊ पैकेजिंग विकल्पों की खोज करें जो पर्यावरण प्रभाव को कम करते हुए आपके उत्पादों की रक्षा करते हैं।',
    category: 'packaging',
    level: 'beginner',
    duration: 18,
    thumbnail: 'https://images.unsplash.com/photo-1605600659873-d808a13e4d2a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
    contentLanguage: 'hindi',
    videoUrl: 'https://player.vimeo.com/video/517031489',
    resources: [
      {
        title: 'टिकाऊ पैकेजिंग गाइड',
        fileUrl: 'https://www.dropbox.com/scl/fi/rnhv1bm0rlc9yrjl9j0gg/Sustainable-Packaging-Guide-Hindi.pdf?rlkey=sample&dl=1',
        fileType: 'pdf',
        description: 'पर्यावरण के अनुकूल पैकेजिंग विकल्पों के लिए व्यापक गाइड'
      },
      {
        title: 'पैकेजिंग आपूर्तिकर्ता निर्देशिका',
        fileUrl: 'https://www.dropbox.com/scl/fi/rnhv1bm0rlc9yrjl9j0gg/Packaging-Supplier-Directory-Hindi.pdf?rlkey=sample&dl=1',
        fileType: 'pdf',
        description: 'भारत में टिकाऊ पैकेजिंग सामग्री के आपूर्तिकर्ताओं की सूची'
      }
    ],
    learningPoints: [
      'विभिन्न पर्यावरण अनुकूल सामग्रियों को समझना',
      'सुरक्षा और स्थिरता के बीच संतुलन',
      'लागत प्रभावी टिकाऊ पैकेजिंग समाधान',
      'एक यादगार अनबॉक्सिंग अनुभव बनाना',
      'पैकेजिंग के माध्यम से अपने पर्यावरण मूल्यों का संचार करना'
    ],
    featured: false,
    status: 'published'
  }
];

// Seed function
const seedTrainingModules = async () => {
  try {
    // Clear existing data
    await TrainingModule.deleteMany({});
    console.log('Deleted existing training modules');

    // Insert new data
    const result = await TrainingModule.insertMany(trainingModules);
    console.log(`Successfully seeded ${result.length} training modules`);

    // Disconnect from MongoDB
    mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  } catch (error) {
    console.error('Error seeding training modules:', error);
    process.exit(1);
  }
};

// Run the seed function
seedTrainingModules();
