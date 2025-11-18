import { HTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';
import Container from './Container';

export interface SectionProps extends HTMLAttributes<HTMLElement> {
  variant?: 'default' | 'light' | 'dark' | 'gradient';
  spacing?: 'none' | 'sm' | 'md' | 'lg';
  containerSize?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  noContainer?: boolean;
}

const Section = forwardRef<HTMLElement, SectionProps>(
  (
    {
      className,
      variant = 'default',
      spacing = 'lg',
      containerSize = 'xl',
      noContainer = false,
      children,
      ...props
    },
    ref
  ) => {
    const variants = {
      default: 'bg-white',
      light: 'bg-background-light',
      dark: 'bg-gray-900 text-white',
      gradient: 'bg-gradient-to-br from-gray-50 to-background-light',
    };

    const spacings = {
      none: '',
      sm: 'py-12 md:py-16',
      md: 'py-16 md:py-20 lg:py-24',
      lg: 'py-16 md:py-24 lg:py-32',
    };

    const content = noContainer ? (
      children
    ) : (
      <Container size={containerSize}>{children}</Container>
    );

    return (
      <section
        ref={ref}
        className={cn(variants[variant], spacings[spacing], className)}
        {...props}
      >
        {content}
      </section>
    );
  }
);

Section.displayName = 'Section';

export default Section;
