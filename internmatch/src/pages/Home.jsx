import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/ui/Header";
import Button from "../components/ui/Button";
import Icon from "../components/AppIcon";

const Home = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: "User",
      title: "AI-Powered Career Pathway",
      description:
        "Get personalized internship recommendations based on your skills and location",
      action: "Start Career Pathway",
      path: "/career-pathway"
    },
    {
      icon: "Search",
      title: "Find Internships",
      description: "Browse and apply to government opportunities",
      action: "Browse Opportunities",
      path: "/internship-recommendations"
    },
    {
      icon: "FileText",
      title: "Profile Setup",
      description: "Create your professional profile for better matches",
      action: "Setup Profile",
      path: "/profile-creation-form"
    }
  ];

  const stats = [
    { label: "Active Internships", value: "1,250+" },
    { label: "Government Departments", value: "45+" },
    { label: "Successful Placements", value: "8,500+" },
    { label: "Student Satisfaction", value: "98%" }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main role="main" tabIndex={-1} aria-label="Homepage">
        {/* Hero Section */}
        <section
          aria-label="Hero banner"
          className="pt-20 bg-gradient-to-br from-blue-600 to-blue-800 text-white"
        >
          <div className="max-w-7xl mx-auto px-4 py-20 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Government Internship Portal
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              Connect with meaningful internship opportunities across Government
              of India
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button
                onClick={() => navigate("/career-pathway")}
                className="bg-white text-blue-600 hover:bg-gray-100"
                aria-label="Start AI-powered career pathway"
              >
                Start Career Pathway
              </Button>
              <Button
                onClick={() => navigate("/internship-recommendations")}
                variant="outline"
                className="border-2 border-white text-white hover:bg-white hover:text-blue-600"
                aria-label="Browse internship opportunities"
              >
                Browse Opportunities
              </Button>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section aria-label="Platform statistics" className="bg-white py-16">
          <div className="max-w-7xl mx-auto px-4">
            <dl className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {stats.map(({ label, value }) => (
                <div key={label}>
                  <dt className="text-3xl md:text-4xl font-bold text-blue-600">
                    {value}
                  </dt>
                  <dd className="text-gray-600 font-medium">{label}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* Features Section */}
        <section
          aria-label="How the portal works"
          className="bg-gray-50 py-16"
        >
          <header className="mb-12 text-center">
            <h2 className="text-3xl font-bold text-gray-900">
              How It Works
            </h2>
            <p className="text-lg text-gray-600">
              Simple steps to find your perfect government internship
            </p>
          </header>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map(({ icon, title, description, action, path }, idx) => (
              <article
                key={title}
                tabIndex={0}
                role="region"
                aria-labelledby={`feature-title-${idx}`}
                className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md"
              >
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <Icon
                    name={icon}
                    className="w-6 h-6 text-blue-600"
                    aria-hidden="true"
                  />
                </div>
                <h3 id={`feature-title-${idx}`} className="text-xl font-semibold mb-3">
                  {title}
                </h3>
                <p className="text-gray-600 mb-4">{description}</p>
                <Button
                  onClick={() => navigate(path)}
                  className="w-full bg-blue-600 text-white"
                >
                  {action}
                </Button>
              </article>
            ))}
          </div>
        </section>

        {/* Government Notice */}
        <section
          aria-label="Official government notice"
          className="bg-blue-50 border-t border-blue-200 py-8"
        >
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-start space-x-4">
              <div
                className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center"
                aria-hidden="true"
              >
                <Icon name="Info" className="w-4 h-4 text-white" />
              </div>
              <div>
                <h4 className="text-lg font-semibold text-blue-900">
                  Official Government Portal
                </h4>
                <p className="text-blue-800">
                  This is a verified and legitimate official portal of the
                  Government of India, Ministry of Corporate Affairs.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-900 text-white">
          <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8 py-12">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div
                  className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center"
                  aria-hidden="true"
                >
                  <Icon name="Shield" className="w-4 h-4 text-white" />
                </div>
                <span className="text-lg font-bold">Government of India</span>
              </div>
              <p className="text-gray-400 text-sm">Ministry of Corporate Affairs</p>
            </div>
            <nav aria-label="Quick links">
              <h5 className="sr-only">Quick links</h5>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>
                  <a href="#" className="hover:text-white">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Help
                  </a>
                </li>
              </ul>
            </nav>
            <nav aria-label="Resources">
              <h5 className="sr-only">Resources</h5>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>
                  <a href="#" className="hover:text-white">
                    Guidelines
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    FAQ
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Support
                  </a>
                </li>
              </ul>
            </nav>
            <address className="not-italic text-gray-400 text-sm">
              <h5 className="sr-only">Contact Info</h5>
              <p>Ministry of Corporate Affairs</p>
              <p>Shastri Bhawan, New Delhi</p>
              <p>Phone No: 0120-4832500</p>
            </address>
          </div>
          <div className="border-t border-gray-800 py-4 text-center text-sm text-gray-400">
            &copy; 2024 Government of India. All rights reserved.
          </div>
        </footer>
      </main>
    </div>
  );
};

export default Home;
