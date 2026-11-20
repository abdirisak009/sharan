import type { Metadata } from "next";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { ContactForm } from "@/components/Forms";
import { Container, PageHero } from "@/components/ui";
import { site } from "@/lib/site";
import { getContent } from "@/lib/content";
import { photos } from "@/lib/photos";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with SHARAN in Jowhar, Middle Shabelle, Hirshabelle State, Somalia.",
};

const details = [
  { icon: MapPin, label: "Head office", value: site.address },
  { icon: Mail, label: "Email", value: site.email, href: `mailto:${site.email}` },
  { icon: Phone, label: "Telephone", value: site.phone, href: `tel:${site.phone.replace(/\s/g, "")}` },
  { icon: Clock, label: "Office hours", value: "Saturday – Thursday, 8:00 – 16:00 (EAT)" },
];

export default async function ContactPage() {
  const hero = (await getContent("pages")).contact;
  return (
    <>
      <PageHero
        photo={photos.riverWaterWomen}
        eyebrow={hero.eyebrow}
        title={hero.title}
        intro={hero.intro}
      />
      <section className="relative z-10 -mt-20 pb-24 lg:pb-28">
        <Container className="grid gap-8 lg:grid-cols-[1fr_1.6fr]">
          <Reveal>
            <div className="h-full rounded-[2rem] bg-deep p-8 text-white shadow-xl sm:p-10">
              <h2 className="text-2xl font-extrabold !text-white">Shabelle Resilience &amp; Action Network</h2>
              <ul className="mt-8 space-y-6">
                {details.map((d) => (
                  <li key={d.label} className="flex gap-4">
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/10 text-sunrise">
                      <d.icon className="h-5 w-5" />
                    </span>
                    <span>
                      <span className="block text-sm text-river-200">{d.label}</span>
                      {d.href ? (
                        <a href={d.href} className="font-semibold hover:text-sunrise">
                          {d.value}
                        </a>
                      ) : (
                        <span className="font-semibold">{d.value}</span>
                      )}
                    </span>
                  </li>
                ))}
              </ul>
              <div className="mt-10 overflow-hidden rounded-2xl ring-1 ring-white/10">
                <iframe
                  title="Map of Jowhar, Somalia"
                  src="https://www.openstreetmap.org/export/embed.html?bbox=45.44%2C2.72%2C45.56%2C2.83&layer=mapnik&marker=2.7809%2C45.5005"
                  className="h-56 w-full border-0 grayscale-[30%]"
                  loading="lazy"
                />
              </div>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <div className="rounded-[2rem] bg-white p-7 shadow-[0_30px_70px_-30px_rgba(20,54,92,0.45)] ring-1 ring-river-100 sm:p-10">
              <h2 className="text-2xl font-extrabold">Send us a message</h2>
              <p className="mt-2 mb-8 text-muted">We aim to respond within two working days.</p>
              <ContactForm />
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
