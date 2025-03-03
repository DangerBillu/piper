
import { Button } from '@/components/ui/button';
import { Github, Twitter, Linkedin, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="border-t py-12 md:py-16">
      <div className="container px-6 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="md:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <div className="h-8 w-8 rounded-full bg-primary"></div>
              <span className="text-xl font-semibold">ChainAI</span>
            </div>
            <p className="text-sm text-muted-foreground mb-6">
              Build powerful AI pipelines with a visual, intuitive interface. Connect models, process data, and deploy with ease.
            </p>
            <div className="flex space-x-4">
              <Button variant="ghost" size="icon" className="rounded-full h-8 w-8">
                <Github className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full h-8 w-8">
                <Twitter className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full h-8 w-8">
                <Linkedin className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div>
            <h3 className="font-medium mb-4">Product</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Features</a></li>
              <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Documentation</a></li>
              <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Pricing</a></li>
              <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Changelog</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium mb-4">Company</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">About</a></li>
              <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Blog</a></li>
              <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Careers</a></li>
              <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Contact</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Terms of Service</a></li>
              <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Cookie Policy</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground mb-4 md:mb-0">
            © {new Date().getFullYear()} ChainAI. All rights reserved.
          </p>
          <div className="flex items-center">
            <Button variant="ghost" size="sm" className="text-sm text-muted-foreground">
              <Mail className="h-4 w-4 mr-2" />
              contact@chainai.com
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
