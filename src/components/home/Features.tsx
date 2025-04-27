
import { ShoppingBag, BookOpen, Globe, Users, Award } from 'lucide-react';

interface FeatureProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard = ({ icon, title, description }: FeatureProps) => (
  <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
    <div className="h-12 w-12 rounded-full bg-artisan-sand/30 flex items-center justify-center mb-4">
      {icon}
    </div>
    <h3 className="font-display text-lg font-medium mb-2">{title}</h3>
    <p className="text-muted-foreground">{description}</p>
  </div>
);

const Features = () => {
  const features = [
    {
      icon: <ShoppingBag size={24} className="text-artisan-terracotta" />,
      title: "Artisan Marketplace",
      description: "A global platform for artisans to showcase and sell their handcrafted products directly to conscious consumers worldwide."
    },
    {
      icon: <BookOpen size={24} className="text-artisan-green" />,
      title: "Training Portal",
      description: "Multilingual learning resources helping artisans develop digital skills, product photography, and business management."
    },
    {
      icon: <Globe size={24} className="text-artisan-indigo" />,
      title: "Cultural Preservation",
      description: "Digital archives preserving traditional crafting techniques, stories, and cultural heritage for future generations."
    },
    {
      icon: <Users size={24} className="text-artisan-brown" />,
      title: "Community Support",
      description: "Fair pricing recommendations and feedback from a supportive community that values authentic craftsmanship."
    },
    {
      icon: <Award size={24} className="text-artisan-yellow" />,
      title: "Eco-Score System",
      description: "Transparency on the sustainability and environmental impact of products, promoting responsible consumption."
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
            Empowering Artisans Through Technology
          </h2>
          <p className="text-lg text-muted-foreground">
            ArtisanLink combines traditional craftsmanship with digital innovation to create
            sustainable opportunities for rural and tribal artisans.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
