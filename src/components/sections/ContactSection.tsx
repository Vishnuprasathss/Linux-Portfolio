import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Github, Linkedin, Instagram, Send, Phone, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import emailjs from "@emailjs/browser";
import { z } from "zod";

// ============================================================
// 🔧 EmailJS Configuration — fill in YOUR values from https://www.emailjs.com/
// 1. Sign up / log in at emailjs.com
// 2. Create an Email Service (e.g. Gmail) → copy the Service ID
// 3. Create an Email Template → copy the Template ID
//    Use these template variables: {{from_name}}, {{from_email}}, {{phone}}, {{message}}
// 4. Go to Account → copy your Public Key
// ============================================================
const EMAILJS_SERVICE_ID = "service_hz5ne84";   // e.g. "service_abc123"
const EMAILJS_TEMPLATE_ID = "template_cokv2gr"; // e.g. "template_xyz789"
const EMAILJS_PUBLIC_KEY = "Z43jDiNP5qIVV8YZN";    // e.g. "AbCdEfGhIjKlMn"

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100, "Name must be less than 100 characters"),
  email: z.string().trim().email("Invalid email address").max(255, "Email must be less than 255 characters"),
  phone: z.string().trim().min(1, "Phone number is required").max(20, "Phone number must be less than 20 characters"),
  message: z.string().trim().min(1, "Message is required").max(1000, "Message must be less than 1000 characters"),
});

const ContactSection = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form data
    const validation = contactSchema.safeParse(formData);
    if (!validation.success) {
      toast({
        title: "Validation Error",
        description: validation.error.errors[0].message,
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name: formData.name,
          from_email: formData.email,
          phone: formData.phone,
          message: formData.message,
        },
        EMAILJS_PUBLIC_KEY
      );

      toast({
        title: "Success!",
        description: "Your message has been sent successfully.",
      });

      // Reset form
      setFormData({ name: "", email: "", phone: "", message: "" });
    } catch (error: any) {
      console.error("Error sending message:", error);
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-start pb-6 overflow-y-auto px-3 md:px-0">
      {/* Background glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-md"
      >
        <div className="flex items-center gap-3 mb-6 justify-center">
          <Mail className="w-6 h-6 text-primary" />
          <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">
            <span className="text-primary/60 font-mono text-xl">$ </span>mail <span className="gradient-text">-s</span>
          </h2>
        </div>

        <p className="font-mono text-sm text-muted-foreground mb-6 text-center">
          Have a idea in mind? Let's connect!
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="font-mono text-sm">Name</Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              onPointerDown={(e) => e.currentTarget.focus()}
              placeholder="Your name"
              className="bg-card border-border focus:border-primary pointer-events-auto select-text relative z-50"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="font-mono text-sm">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              onPointerDown={(e) => e.currentTarget.focus()}
              placeholder="your@email.com"
              className="bg-card border-border focus:border-primary pointer-events-auto select-text relative z-50"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone" className="font-mono text-sm">Phone Number</Label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground z-10 pointer-events-none" />
              <Input
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleInputChange}
                onPointerDown={(e) => e.currentTarget.focus()}
                placeholder="+1 234 567 890"
                className="bg-card border-border focus:border-primary pl-10 pointer-events-auto select-text relative z-50"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="message" className="font-mono text-sm">Message</Label>
            <Textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              onPointerDown={(e) => e.currentTarget.focus()}
              placeholder="Your message..."
              className="bg-card border-border focus:border-primary min-h-[100px] resize-none pointer-events-auto select-text relative z-50"
              required
            />
          </div>

          <motion.button
            type="submit"
            disabled={isLoading}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full flex items-center justify-center gap-3 px-6 py-3 bg-primary text-primary-foreground font-display font-semibold tracking-wider box-glow hover:box-glow-intense transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>SENDING...</span>
              </>
            ) : (
              <>
                <span>SEND MESSAGE</span>
                <Send className="w-5 h-5" />
              </>
            )}
          </motion.button>
        </form>


      </motion.div>
    </div>
  );
};

export default ContactSection;
