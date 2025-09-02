export interface HeroProps {
  title: string;
  subtitle: string;
  backgroundGradient: string;
}

export interface AboutProps {
  bio: string;
  image: string;
}

export interface Skill {
  name: string;
  icon: string;
}

export interface SkillsProps {
  skills: Skill[];
}

export interface Project {
  title: string;
  description: string;
  image: string;
  link: string;
}

export interface ProjectsProps {
  projects: Project[];
}

export interface Testimonial {
  clientName: string;
  feedback: string;
}

export interface TestimonialsProps {
  testimonials: Testimonial[];
}

export interface ContactFormProps {
  onSubmit: (data: { name: string; email: string; message: string }) => void;
}

export interface NavbarProps {
  sections: string[];
}