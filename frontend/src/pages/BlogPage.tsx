
import { useState } from "react";
import Layout from "@/components/layout/Layout";
import PageHeader from "@/components/layout/PageHeader";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Calendar, User, Clock, ArrowRight } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Sample blog posts data
const blogPosts = [
  {
    id: 1,
    title: "10 Essential Python Libraries for Data Science in 2024",
    excerpt: "Discover the most powerful and efficient Python libraries that every data scientist should be using this year.",
    image: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=2669&auto=format&fit=crop",
    date: "May 15, 2024",
    author: "Dr. Sarah Johnson",
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
    author: "James Rodriguez",
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
    author: "Dr. Aisha Patel",
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
    author: "Michael Chen",
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
    author: "Robert Kim",
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
    author: "Dr. Elena Gonzalez",
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
    <Layout>
      <PageHeader 
        title="Data Science Blog" 
        subtitle="Insights, tutorials, and trends from our data science experts"
        backgroundImage="https://images.unsplash.com/photo-1456324504439-367cee3b3c32?q=80&w=2670&auto=format&fit=crop"
      />
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-5 w-5" />
            <Input
              type="search"
              placeholder="Search articles..."
              className="pl-10 bg-gray-800 border-gray-700 text-white"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        
        {searchQuery === "" && (
          <div className="mb-16">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-white">Featured Articles</h2>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {featuredPosts.map((post) => (
                <Card key={post.id} className="bg-gray-900 border-gray-800 hover:border-amber-500/50 transition-colors overflow-hidden h-full flex flex-col">
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={post.image} 
                      alt={post.title} 
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    />
                  </div>
                  <CardHeader className="pb-0">
                    <div className="flex gap-2 mb-2">
                      {post.tags.map((tag, index) => (
                        <Badge key={index} variant="outline" className="bg-amber-500/10 text-amber-400 border-amber-500/30">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <h3 className="text-xl font-bold text-white hover:text-amber-500 transition-colors">
                      <a href="#">{post.title}</a>
                    </h3>
                  </CardHeader>
                  <CardContent className="py-4 flex-grow">
                    <p className="text-gray-400">{post.excerpt}</p>
                  </CardContent>
                  <CardFooter className="pt-0 text-sm text-gray-500 flex items-center space-x-4">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      <span>{post.date}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      <span>{post.readTime}</span>
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        )}
        
        <div className="mb-8">
          <Tabs defaultValue="all" onValueChange={setActiveCategory}>
            <div className="overflow-x-auto pb-2 mb-8">
              <TabsList className="bg-gray-800 h-auto p-1">
                {categories.map((category) => (
                  <TabsTrigger 
                    key={category.value}
                    value={category.value} 
                    className="data-[state=active]:bg-amber-500 data-[state=active]:text-black py-2 px-4"
                  >
                    {category.label}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>
            
            <TabsContent value={activeCategory} forceMount>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredPosts.map((post) => (
                  <Card key={post.id} className="bg-gray-900 border-gray-800 hover:border-amber-500/50 transition-colors overflow-hidden h-full flex flex-col">
                    <div className="h-48 overflow-hidden">
                      <img 
                        src={post.image} 
                        alt={post.title} 
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                      />
                    </div>
                    <CardHeader className="pb-0">
                      <div className="flex gap-2 mb-2">
                        {post.tags.slice(0, 2).map((tag, index) => (
                          <Badge key={index} variant="outline" className="bg-amber-500/10 text-amber-400 border-amber-500/30">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <h3 className="text-xl font-bold text-white hover:text-amber-500 transition-colors">
                        <a href="#">{post.title}</a>
                      </h3>
                    </CardHeader>
                    <CardContent className="py-4 flex-grow">
                      <p className="text-gray-400 line-clamp-3">{post.excerpt}</p>
                    </CardContent>
                    <CardFooter className="flex justify-between items-center border-t border-gray-800 pt-4">
                      <div className="flex items-center text-sm text-gray-500">
                        <User className="h-4 w-4 mr-1" />
                        <span>{post.author}</span>
                      </div>
                      <Button variant="ghost" size="sm" className="text-amber-500 hover:text-amber-400 hover:bg-amber-500/10 -mr-2">
                        Read more <ArrowRight className="ml-1 h-4 w-4" />
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
              
              {filteredPosts.length === 0 && (
                <div className="text-center py-12">
                  <h3 className="text-xl text-white mb-2">No articles found</h3>
                  <p className="text-gray-400 mb-6">Try adjusting your search or category filter</p>
                  <Button 
                    variant="outline"
                    className="border-amber-500 text-amber-500 hover:bg-amber-500 hover:text-black"
                    onClick={() => {
                      setSearchQuery("");
                      setActiveCategory("all");
                    }}
                  >
                    Clear filters
                  </Button>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
        
        <div className="mt-12 flex justify-center">
          <Button className="bg-amber-500 hover:bg-amber-600 text-black">
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
            <Button className="bg-amber-500 hover:bg-amber-600 text-black whitespace-nowrap">
              Subscribe
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default BlogPage;
