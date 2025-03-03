
import { useState, useEffect } from 'react';
import { useTheme } from '@/hooks/useTheme';
import { Button } from '@/components/ui/button';
import { Moon, Sun, Menu, X } from 'lucide-react';

const Header = () => {
  const { theme, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'py-3 backdrop-blur-lg bg-background/80 dark:bg-background/80 border-b border-border/50' 
          : 'py-6 bg-transparent'
      }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        <a href="#" className="flex items-center space-x-2">
          <div className="h-8 w-8 rounded-full bg-primary"></div>
          <span className="text-xl font-semibold">ChainAI</span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <a href="#pipeline" className="text-sm font-medium hover:text-primary transition-colors">
            Pipeline Builder
          </a>
          <a href="#models" className="text-sm font-medium hover:text-primary transition-colors">
            Explore Models
          </a>
          <a href="#how-it-works" className="text-sm font-medium hover:text-primary transition-colors">
            How It Works
          </a>
          <Button variant="ghost" size="icon" onClick={toggleTheme} className="ml-2">
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </Button>
        </nav>

        {/* Mobile Menu Button */}
        <div className="flex items-center md:hidden">
          <Button variant="ghost" size="icon" onClick={toggleTheme} className="mr-2">
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </Button>
          <Button variant="ghost" size="icon" onClick={toggleMenu}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 px-6 py-5 glass dark:glass-light animate-fade-in">
          <nav className="flex flex-col space-y-4">
            <a 
              href="#pipeline" 
              className="text-sm font-medium p-2 hover:bg-secondary/50 rounded-md transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Pipeline Builder
            </a>
            <a 
              href="#models" 
              className="text-sm font-medium p-2 hover:bg-secondary/50 rounded-md transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Explore Models
            </a>
            <a 
              href="#how-it-works" 
              className="text-sm font-medium p-2 hover:bg-secondary/50 rounded-md transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              How It Works
            </a>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
