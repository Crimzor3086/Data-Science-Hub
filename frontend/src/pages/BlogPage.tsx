import { useState } from "react";
import Layout from "@/components/layout/Layout";
import PageHeader from "@/components/layout/PageHeader";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Calendar, User, Clock, ArrowRight, Filter } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Background } from '@/components/ui/background';

// Sample blog posts data
const blogPosts = [
  {
    id: 1,
    title: "10 Essential Python Libraries for Data Science in 2024",
    excerpt: "Discover the most powerful and efficient Python libraries that every data scientist should be using this year.",
    image: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=2669&auto=format&fit=crop",
    date: "May 15, 2024",
    author: "Ogechi Daniel Koel",
    readTime: "8 min read",
    category: "tutorials",
    tags: ["Python", "Libraries", "Tools"]
  },
  {
    id: 2,
    title: "Understanding Transformer Models: A Comprehensive Guide",
    excerpt: "An in-depth look at how transformer models work and why they've revolutionized natural language processing and beyond.",
    image: "https://images.unsplash.com/photo-1677442135133-3be402e1b166?q=80&w=2532&auto=format&fit=crop",
    date: "May 8, 2024",
    author: "Nobert Wafula",
    readTime: "12 min read",
    category: "deep-learning",
    tags: ["NLP", "Transformers", "Deep Learning"]
  },
  {
    id: 3,
    title: "Ethical Considerations in AI Development",
    excerpt: "Exploring the ethical challenges that arise when developing and deploying artificial intelligence systems.",
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=2665&auto=format&fit=crop",
    date: "April 27, 2024",
    author: "Enock Bereka",
    readTime: "10 min read",
    category: "ai-ethics",
    tags: ["Ethics", "AI", "Responsible AI"]
  },
  {
    id: 4,
    title: "Data Engineering Best Practices for Scalable Systems",
    excerpt: "Learn how to design and implement data pipelines that can handle growing volumes of data without performance degradation.",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=2668&auto=format&fit=crop",
    date: "April 18, 2024",
    author: "Timothy Achala",
    readTime: "15 min read",
    category: "data-engineering",
    tags: ["Data Engineering", "Scalability", "Big Data"]
  },
  {
    id: 5,
    title: "From Data to Decisions: Building Effective Dashboards",
    excerpt: "A step-by-step guide to creating dashboards that drive business decisions through clear data visualization.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2670&auto=format&fit=crop",
    date: "April 10, 2024",
    author: "Ogechi Daniel Koel",
    readTime: "7 min read",
    category: "data-visualization",
    tags: ["Visualization", "Dashboards", "Business Intelligence"]
  },
  {
    id: 6,
    title: "The Rise of AutoML: Democratizing Machine Learning",
    excerpt: "How automated machine learning tools are making advanced AI capabilities accessible to non-specialists.",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=2670&auto=format&fit=crop",
    date: "April 3, 2024",
    author: "Nobert Wafula",
    readTime: "9 min read",
    category: "machine-learning",
    tags: ["AutoML", "Machine Learning", "Accessibility"]
  }
];

// Featured posts (first 3 posts)
const featuredPosts = blogPosts.slice(0, 3);

// Categories for filtering
const categories = [
  { value: "all", label: "All Categories" },
  { value: "tutorials", label: "Tutorials" },
  { value: "deep-learning", label: "Deep Learning" },
  { value: "ai-ethics", label: "AI Ethics" },
  { value: "data-engineering", label: "Data Engineering" },
  { value: "data-visualization", label: "Data Visualization" },
  { value: "machine-learning", label: "Machine Learning" }
];

const BlogPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  
  // Filter posts based on search query and category
  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === "all" || post.category === activeCategory;
    
    return matchesSearch && matchesCategory;
  });
  
  return (
    <Background 
      image="/images/image (5).jpg"
      overlayOpacity={0.85}
    >
      <div className="container mx-auto py-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div className="w-full md:w-auto">
              <h1 className="text-3xl font-bold text-primary">Blog</h1>
              <p className="text-muted-foreground mt-2">
                Insights and tutorials from our data science experts
              </p>
            </div>
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
              Write a Post
            </Button>
          </div>

          {/* Search and Filters */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search articles..." 
                className="pl-10 bg-white/95 backdrop-blur-sm border-primary/20"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="flex gap-2 overflow-x-auto pb-2">
              {categories.map((category) => (
                <Button 
                  key={category.value}
                  variant={activeCategory === category.value ? "default" : "outline"}
                  className={activeCategory === category.value ? "bg-primary text-primary-foreground" : "border-primary text-primary hover:bg-primary/10"}
                  onClick={() => setActiveCategory(category.value)}
                >
                  {category.label}
                </Button>
              ))}
            </div>

            <Button variant="outline" className="w-full md:w-auto border-primary text-primary hover:bg-primary/10">
              <Filter className="h-4 w-4 mr-2" />
              More Filters
            </Button>
          </div>

          {/* Blog Posts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map((post) => (
              <Card key={post.id} className="bg-white/95 backdrop-blur-sm border-primary/20 hover:border-primary/40 transition-colors">
                <CardHeader>
                  <div className="aspect-video relative overflow-hidden rounded-lg mb-4">
                    <img 
                      src={post.image} 
                      alt={post.title}
                      className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  </div>
                  <CardTitle className="line-clamp-2">{post.title}</CardTitle>
                  <CardDescription className="line-clamp-2">{post.excerpt}</CardDescription>
                </CardHeader>
                <CardContent className="py-4 flex-grow">
                  <div className="flex gap-2 mb-2">
                    {post.tags.slice(0, 2).map((tag, index) => (
                      <Badge key={index} variant="outline" className="bg-primary/10 text-primary border-primary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between items-center border-t border-primary pt-4">
                  <div className="flex items-center text-sm text-primary">
                    <User className="h-4 w-4 mr-1" />
                    <span>{post.author}</span>
                  </div>
                  <Button variant="ghost" size="sm" className="text-primary hover:text-primary/90 hover:bg-primary/10 -mr-2">
                    Read more <ArrowRight className="ml-1 h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
          
          <div className="mt-12 flex justify-center">
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
              Load more articles
            </Button>
          </div>
          
          <div className="mt-20 max-w-lg mx-auto p-8 bg-gray-800 rounded-lg border border-gray-700 text-center">
            <h3 className="text-xl font-bold text-white mb-4">Subscribe to our newsletter</h3>
            <p className="text-gray-300 mb-6">
              Get the latest data science insights delivered straight to your inbox
            </p>
            <div className="flex gap-2">
              <Input type="email" placeholder="your@email.com" className="bg-gray-700 border-gray-600" />
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground whitespace-nowrap">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Background>
  );
};

export default BlogPage;
