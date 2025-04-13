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
  const [selectedCategory, setSelectedCategory] = useState("all");

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <Background 
      image="/images/image (15).jpg"
      overlayOpacity={0.85}
    >
      <Layout>
        <PageHeader 
          title="Blog" 
          subtitle="Latest insights, tutorials, and updates from our data science experts"
          backgroundImage="https://images.unsplash.com/photo-1499750310107-5f9f28a66643?q=80&w=2670&auto=format&fit=crop"
        />
        
        <div className="container mx-auto py-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
              <div className="w-full md:w-auto">
                <h2 className="text-3xl font-bold text-primary">Latest Posts</h2>
                <p className="text-muted-foreground mt-2">
                  Stay updated with the latest in data science
                </p>
              </div>
              <div className="relative w-full md:w-auto">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search posts..."
                  className="pl-10 bg-white/95 backdrop-blur-sm border-primary/20"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            <div className="flex gap-4 overflow-x-auto pb-4 mb-8">
              {categories.map(category => (
                <Button
                  key={category.value}
                  variant={selectedCategory === category.value ? "default" : "outline"}
                  className="whitespace-nowrap"
                  onClick={() => setSelectedCategory(category.value)}
                >
                  {category.label}
                </Button>
              ))}
            </div>

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
                      <Badge 
                        className="absolute top-4 right-4 bg-primary/90 text-primary-foreground"
                      >
                        {post.category}
                      </Badge>
                    </div>
                    <CardTitle className="line-clamp-2">{post.title}</CardTitle>
                    <CardDescription className="line-clamp-2">{post.excerpt}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <User className="h-4 w-4" />
                        <span>{post.author}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <span>{post.date}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        <span>{post.readTime}</span>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-4">
                      {post.tags.map((tag, index) => (
                        <Badge key={index} variant="secondary">{tag}</Badge>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                      Read More <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>

            {filteredPosts.length === 0 && (
              <div className="text-center py-12">
                <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-medium text-primary mb-2">No posts found</h3>
                <p className="text-muted-foreground mb-4">
                  Try adjusting your search or filters to find what you're looking for.
                </p>
                <Button 
                  variant="outline" 
                  className="border-primary text-primary hover:bg-primary/10"
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedCategory("all");
                  }}
                >
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </Layout>
    </Background>
  );
};

export default BlogPage;
