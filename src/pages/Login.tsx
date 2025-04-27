
import { useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import LoginForm from '@/components/auth/LoginForm';

const Login = () => {
  useEffect(() => {
    document.title = 'Login | ArtisanLink';
  }, []);
  
  return (
    <Layout>
      <div className="container mx-auto py-12 px-4">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 items-center">
          <div className="hidden md:block">
            <div className="relative">
              <div className="absolute -left-4 -top-4 w-24 h-24 bg-artisan-terracotta rounded-xl opacity-20"></div>
              <div className="absolute -right-4 -bottom-4 w-32 h-32 bg-artisan-green rounded-xl opacity-20"></div>
              <img 
                src="https://images.unsplash.com/photo-1582044677538-a75929baf8c3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                alt="Artisan working on traditional craft" 
                className="w-full h-[500px] object-cover rounded-xl relative z-10"
              />
            </div>
            <div className="mt-8 text-center px-6">
              <h2 className="font-display text-2xl mb-2">Join our Community</h2>
              <p className="text-muted-foreground">
                Connect with artisans around the world and discover unique handcrafted treasures
              </p>
            </div>
          </div>
          <div>
            <LoginForm />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
