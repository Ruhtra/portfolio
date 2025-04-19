"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast";
import { Github, Linkedin, Mail, Globe, MessageSquare } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

// Importe o hook useLanguage
import { useLanguage } from "@/contexts/language-context";
import { sendContantMail } from "@/app/_actions/sendEmail";

const formSchema = z.object({
  name: z.string().min(2, { message: "Nome deve ter pelo menos 2 caracteres" }),
  email: z.string().email({ message: "Email inválido" }),
  message: z
    .string()
    .min(10, { message: "Mensagem deve ter pelo menos 10 caracteres" }),
});

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const { t, language } = useLanguage();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);

    const response = await sendContantMail(
      values.email,
      values.name,
      values.message
    );

    if (response.error) {
      toast({
        title:
          language === "pt"
            ? "Erro ao enviar mensagem"
            : "Error sending message",
        description:
          language === "pt"
            ? "Houve um erro ao enviar sua mensagem. Tente novamente mais tarde."
            : "There was an error sending your message. Please try again later.",
        variant: "destructive",
      });
      setIsSubmitting(false);
      return;
    }

    toast({
      title: language === "pt" ? "Mensagem enviada!" : "Message sent!",
      description:
        language === "pt"
          ? "Obrigado pelo contato. Responderei em breve."
          : "Thank you for your message. I'll respond soon.",
    });

    form.reset();
    setIsSubmitting(false);
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  };

  const whatsappNumber = "5584999221557";
  const whatsappMessage =
    language === "pt"
      ? "Olá, vim pelo seu portfólio e gostaria de conversar!"
      : "Hello, I came from your portfolio and would like to chat!";
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    whatsappMessage
  )}`;

  return (
    <section
      id="contact"
      className="section-container scroll-mt-16 bg-muted/30"
    >
      <div className="container">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          <motion.h2
            className="section-title text-center"
            variants={itemVariants}
          >
            {t("contact.title")}
          </motion.h2>
          <motion.p
            className="text-center text-muted-foreground max-w-2xl mx-auto mb-12"
            variants={itemVariants}
          >
            {t("contact.subtitle")}
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <motion.div variants={itemVariants}>
              <Card className="h-full">
                <CardHeader>
                  <CardTitle>{t("contact.form.title")}</CardTitle>
                  <CardDescription>
                    {t("contact.form.description")}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Form {...form}>
                    <form
                      onSubmit={form.handleSubmit(onSubmit)}
                      className="space-y-6"
                    >
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>{t("contact.form.name")}</FormLabel>
                            <FormControl>
                              <Input
                                placeholder={t("contact.form.name")}
                                {...field}
                                className="focus-visible:ring-primary"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>{t("contact.form.email")}</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="your.email@example.com"
                                {...field}
                                className="focus-visible:ring-primary"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>{t("contact.form.message")}</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder={t("contact.form.message")}
                                className="min-h-[120px] focus-visible:ring-primary"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <div className="space-y-4">
                        <Button
                          type="submit"
                          className="w-full group"
                          disabled={isSubmitting}
                        >
                          <span>
                            {isSubmitting
                              ? t("contact.form.sending")
                              : t("contact.form.submit")}
                          </span>
                          <span className="inline-block transition-transform group-hover:translate-x-1 ml-1">
                            →
                          </span>
                        </Button>

                        <Button
                          type="button"
                          variant="outline"
                          className="w-full group bg-green-50 hover:bg-green-100 border-green-200 hover:border-green-300 dark:bg-green-900/20 dark:hover:bg-green-900/30 dark:border-green-800"
                          asChild
                        >
                          <Link
                            href={whatsappUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-2"
                          >
                            <MessageSquare className="h-4 w-4 text-green-600 dark:text-green-400" />
                            <span className="text-green-700 dark:text-green-400">
                              {t("contact.form.whatsapp")}
                            </span>
                            <span className="inline-block transition-transform group-hover:translate-x-1 ml-1 text-green-700 dark:text-green-400">
                              →
                            </span>
                          </Link>
                        </Button>
                      </div>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              className="flex flex-col justify-center"
              variants={itemVariants}
            >
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-4">
                    {t("contact.info.title")}
                  </h3>
                  <p className="text-muted-foreground">
                    {t("contact.info.description")}
                  </p>
                </div>

                <div className="space-y-4">
                  <motion.div
                    className="flex items-center gap-4"
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <div className="bg-primary/10 p-3 rounded-full">
                      <Mail className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium">Email</h4>
                      <Link
                        href="mailto:contato@ruhtra.work"
                        className="text-muted-foreground hover:text-primary transition-colors"
                      >
                        kawanarthurtech@gmail.com
                      </Link>
                    </div>
                  </motion.div>

                  <motion.div
                    className="flex items-center gap-4"
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <div className="bg-primary/10 p-3 rounded-full">
                      <Globe className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium">Website</h4>
                      <Link
                        href="https://ruhtra.work"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-primary transition-colors"
                      >
                        ruhtra.work
                      </Link>
                    </div>
                  </motion.div>

                  <motion.div
                    className="flex items-center gap-4"
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <div className="bg-primary/10 p-3 rounded-full">
                      <Linkedin className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium">LinkedIn</h4>
                      <Link
                        href="https://linkedin.com/in/kawan-arthur/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-primary transition-colors"
                      >
                        linkedin.com/in/kawan-arthur
                      </Link>
                    </div>
                  </motion.div>

                  <motion.div
                    className="flex items-center gap-4"
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <div className="bg-primary/10 p-3 rounded-full">
                      <Github className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium">GitHub</h4>
                      <Link
                        href="https://github.com/ruhtra"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-primary transition-colors"
                      >
                        github.com/ruhtra
                      </Link>
                    </div>
                  </motion.div>
                </div>

                <div className="pt-6">
                  <p className="text-muted-foreground">
                    {t("contact.info.availability")}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
