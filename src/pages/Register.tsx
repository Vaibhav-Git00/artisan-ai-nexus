
import { useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import RegisterForm from '@/components/auth/RegisterForm';

const Register = () => {
  useEffect(() => {
    document.title = 'Create Account | ArtisanLink';
  }, []);
  
  return (
    <Layout>
      <div className="container mx-auto py-12 px-4">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 items-center">
          <div className="hidden md:block">
            <div className="relative">
              <div className="absolute -left-4 -top-4 w-24 h-24 bg-artisan-yellow rounded-xl opacity-20"></div>
              <div className="absolute -right-4 -bottom-4 w-32 h-32 bg-artisan-brown rounded-xl opacity-20"></div>
              <img 
                src="https://images.unsplash.com/photo-1596731498067-3937cf6cc5b3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                alt="Artisan crafts display" 
                className="w-full h-[600px] object-cover rounded-xl relative z-10"
              />
            </div>
            <div className="mt-8 text-center px-6">
              <h2 className="font-display text-2xl mb-2">Why Join ArtisanLink?</h2>
              <p className="text-muted-foreground">
                Whether you're an artisan looking to showcase your craft or a buyer seeking authentic handmade products, 
                we connect you to a global community celebrating traditional craftsmanship.
              </p>
            </div>
          </div>
          <div>
            <RegisterForm />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Register;
