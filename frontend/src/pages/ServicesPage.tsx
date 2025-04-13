import Layout from "@/components/layout/Layout";
import PageHeader from "@/components/layout/PageHeader";
import { ChevronRight, BarChart2, Database, Brain, Code, FileCheck, Users } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const services = {
  dataAnalysis: {
    title: "Data Analysis",
    description: "Transform raw data into actionable business insights",
    icon: BarChart2,
    offerings: [
      {
        title: "Exploratory Data Analysis",
        description: "Discover patterns, anomalies, and relationships in your data to drive informed decision making.",
        features: [
          "Comprehensive statistical analysis",
          "Pattern recognition and trend identification",
          "Anomaly detection and outlier analysis",
          "Correlation and causation assessment"
        ]
      },
      {
        title: "Business Intelligence",
        description: "Leverage your data assets to create interactive dashboards and reporting systems.",
        features: [
          "KPI development and monitoring",
          "Custom dashboard creation",
          "Automated reporting solutions",
          "Data visualization and storytelling"
        ]
      },
      {
        title: "Predictive Analytics",
        description: "Forecast future trends and outcomes based on historical data patterns.",
        features: [
          "Time series forecasting",
          "Regression analysis",
          "Demand forecasting",
          "Risk assessment modeling"
        ]
      }
    ]
  },
  machineLearning: {
    title: "Machine Learning",
    description: "Deploy intelligent solutions that learn and improve over time",
    icon: Brain,
    offerings: [
      {
        title: "Supervised Learning Solutions",
        description: "Create models that can classify data or predict outcomes based on labeled examples.",
        features: [
          "Classification algorithms",
          "Regression modeling",
          "Ensemble methods",
          "Model validation and testing"
        ]
      },
      {
        title: "Unsupervised Learning",
        description: "Discover hidden patterns and structures in your unlabeled data.",
        features: [
          "Clustering algorithms",
          "Dimensionality reduction",
          "Anomaly detection",
          "Association rule learning"
        ]
      },
      {
        title: "Deep Learning Implementation",
        description: "Leverage neural networks for complex problems like image recognition and natural language processing.",
        features: [
          "Convolutional neural networks",
          "Recurrent neural networks",
          "Transfer learning",
          "Model optimization and deployment"
        ]
      }
    ]
  },
  dataEngineering: {
    title: "Data Engineering",
    description: "Build robust data infrastructure for reliable analytics",
    icon: Database,
    offerings: [
      {
        title: "Data Pipeline Development",
        description: "Create efficient and scalable ETL processes to transform and load your data.",
        features: [
          "ETL/ELT pipeline design",
          "Real-time data streaming",
          "Data quality assurance",
          "Workflow automation"
        ]
      },
      {
        title: "Data Warehouse Solutions",
        description: "Design and implement centralized repositories for all your analytics needs.",
        features: [
          "Schema design and modeling",
          "Cloud data warehouse implementation",
          "Performance optimization",
          "Data governance integration"
        ]
      },
      {
        title: "Big Data Architecture",
        description: "Handle massive datasets with distributed computing frameworks.",
        features: [
          "Hadoop/Spark ecosystem implementation",
          "NoSQL database design",
          "Scalable architecture planning",
          "Data lake development"
        ]
      }
    ]
  },
  aiConsulting: {
    title: "AI Consulting",
    description: "Expert guidance for your organization's AI transformation",
    icon: Users,
    offerings: [
      {
        title: "AI Strategy Development",
        description: "Create a roadmap for integrating AI into your business processes and products.",
        features: [
          "Opportunity assessment",
          "ROI analysis for AI initiatives",
          "Implementation roadmap creation",
          "Technology stack recommendations"
        ]
      },
      {
        title: "AI Ethics and Governance",
        description: "Ensure your AI systems are transparent, fair, and compliant with regulations.",
        features: [
          "Ethical AI framework development",
          "Bias detection and mitigation",
          "Compliance assessment",
          "Responsible AI practices"
        ]
      },
      {
        title: "AI Education and Workshops",
        description: "Build AI literacy and capabilities within your organization.",
        features: [
          "Executive AI awareness sessions",
          "Technical team training",
          "Hands-on workshops",
          "Custom curriculum development"
        ]
      }
    ]
  }
};

const ServiceCategory = ({ category, data }: { category: string, data: any }) => {
  const Icon = data.icon;
  
  return (
    <TabsContent value={category} className="mt-6">
      <div className="flex flex-col md:flex-row gap-8 items-start">
        <div className="md:w-1/3">
          <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
            <div className="p-3 bg-amber-500/10 w-fit rounded-lg mb-4">
              <Icon className="h-8 w-8 text-amber-500" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">{data.title}</h3>
            <p className="text-gray-300">{data.description}</p>
            <Button className="mt-6 bg-amber-500 hover:bg-amber-600 text-black">
              Request Consultation
            </Button>
          </div>
        </div>
        
        <div className="md:w-2/3">
          <div className="grid gap-6">
            {data.offerings.map((offering: any, index: number) => (
              <Card key={index} className="bg-gray-900 border-gray-800">
                <CardHeader>
                  <CardTitle className="text-xl text-white">{offering.title}</CardTitle>
                  <CardDescription className="text-gray-400">{offering.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {offering.features.map((feature: string, i: number) => (
                      <li key={i} className="flex items-start">
                        <ChevronRight className="h-5 w-5 text-amber-500 shrink-0 mt-0.5 mr-2" />
                        <span className="text-gray-300">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </TabsContent>
  );
};

const ServicesPage = () => {
  return (
    <Layout>
      <PageHeader 
        title="Our Services" 
        subtitle="Comprehensive data science and AI solutions for your business challenges"
        backgroundImage="https://images.unsplash.com/photo-1523961131990-5ea7c61b2107?q=80&w=2574&auto=format&fit=crop"
      />
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto mb-12 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">End-to-End Data Science Solutions</h2>
          <p className="text-gray-300">
            From initial data assessment to deploying production-ready machine learning models,
            we provide comprehensive services to help you harness the power of your data.
          </p>
        </div>
        
        <Tabs defaultValue="dataAnalysis" className="max-w-6xl mx-auto">
          <div className="flex justify-center mb-8 overflow-x-auto pb-2">
            <TabsList className="bg-gray-800 h-auto p-1">
              <TabsTrigger 
                value="dataAnalysis" 
                className="data-[state=active]:bg-amber-500 data-[state=active]:text-black py-2 px-4"
              >
                Data Analysis
              </TabsTrigger>
              <TabsTrigger 
                value="machineLearning" 
                className="data-[state=active]:bg-amber-500 data-[state=active]:text-black py-2 px-4"
              >
                Machine Learning
              </TabsTrigger>
              <TabsTrigger 
                value="dataEngineering" 
                className="data-[state=active]:bg-amber-500 data-[state=active]:text-black py-2 px-4"
              >
                Data Engineering
              </TabsTrigger>
              <TabsTrigger 
                value="aiConsulting" 
                className="data-[state=active]:bg-amber-500 data-[state=active]:text-black py-2 px-4"
              >
                AI Consulting
              </TabsTrigger>
            </TabsList>
          </div>
          
          <ServiceCategory category="dataAnalysis" data={services.dataAnalysis} />
          <ServiceCategory category="machineLearning" data={services.machineLearning} />
          <ServiceCategory category="dataEngineering" data={services.dataEngineering} />
          <ServiceCategory category="aiConsulting" data={services.aiConsulting} />
        </Tabs>
      </div>
      
      <section className="bg-gray-800 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-gray-700 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <FileCheck className="h-8 w-8 text-amber-500" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Project Assessment</h3>
                <p className="text-gray-300">Free initial consultation to understand your data challenges</p>
              </div>
              
              <div className="text-center">
                <div className="bg-gray-700 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Code className="h-8 w-8 text-amber-500" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Implementation</h3>
                <p className="text-gray-300">Expert teams delivering scalable, production-ready solutions</p>
              </div>
              
              <div className="text-center">
                <div className="bg-gray-700 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-amber-500" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Knowledge Transfer</h3>
                <p className="text-gray-300">Training and documentation to empower your team</p>
              </div>
            </div>
            
            <div className="mt-12 text-center">
              <Button className="bg-amber-500 hover:bg-amber-600 text-black px-8 py-6 text-lg">
                Schedule a Free Consultation
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ServicesPage;
