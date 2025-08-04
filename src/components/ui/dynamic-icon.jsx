"use client";
import { useEffect, useState } from "react";

const DynamicIcon = ({ 
  iconName, 
  size = 24, 
  className = "", 
  fallback = null,
  ...props 
}) => {
  const [IconComponent, setIconComponent] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const loadIcon = async () => {
      try {
        setIsLoading(true);
        setHasError(false);
        
        // Dynamic import based on icon name
        let iconModule;
        
        if (iconName.startsWith('Fa')) {
          iconModule = await import('react-icons/fa');
        } else if (iconName.startsWith('Tb')) {
          iconModule = await import('react-icons/tb');
        } else if (iconName.startsWith('Md')) {
          iconModule = await import('react-icons/md');
        } else if (iconName.startsWith('Fi')) {
          iconModule = await import('react-icons/fi');
        } else if (iconName.startsWith('Io')) {
          iconModule = await import('react-icons/io5');
        } else if (iconName.startsWith('Go')) {
          iconModule = await import('react-icons/go');
        } else {
          // Default to fa if unknown
          iconModule = await import('react-icons/fa');
        }
        
        const Icon = iconModule[iconName];
        if (Icon) {
          setIconComponent(() => Icon);
        } else {
          setHasError(true);
        }
      } catch (error) {
        console.warn(`Failed to load icon ${iconName}:`, error);
        setHasError(true);
      } finally {
        setIsLoading(false);
      }
    };

    loadIcon();
  }, [iconName]);

  if (isLoading) {
    return fallback || <div style={{ width: size, height: size }} />;
  }

  if (hasError || !IconComponent) {
    return fallback || <div style={{ width: size, height: size }} />;
  }

  return <IconComponent size={size} className={className} {...props} />;
};

export default DynamicIcon; 