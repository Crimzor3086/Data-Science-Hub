import React from "react";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  backgroundImage?: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({ 
  title, 
  subtitle, 
  backgroundImage = "https://images.unsplash.com/photo-1509718443690-d8e2fb3474b7?q=80&w=2670&auto=format&fit=crop"
}) => {
  return (
    <div 
      className="relative bg-primary py-24 px-8 mb-12"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.8)), url(${backgroundImage})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover'
      }}
    >
      <div className="container mx-auto text-center relative z-10">
        <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-4">{title}</h1>
        {subtitle && (
          <p className="text-xl text-primary-foreground/80 max-w-3xl mx-auto">{subtitle}</p>
        )}
      </div>
    </div>
  );
};

export default PageHeader;
