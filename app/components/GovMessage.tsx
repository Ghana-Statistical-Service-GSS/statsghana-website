import Image from "next/image";
import { Quote } from "lucide-react";
import Card from "./Card";
import Container from "./Container";
import SectionTitle from "./SectionTitle";

export default function GovMessage() {
  return (
    <section className="bg-white py-12 sm:py-16">
      <Container>
        <SectionTitle title="Message from the Government Statistician" />
        <div className="mt-27">
          <Card className="relative mx-auto max-w-3xl px-6 pb-10 pt-20 text-center sm:px-12">
            <div className="absolute left-1/2 top-0 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center">
              <div className="relative h-48 w-48 sm:h-56 sm:w-56">
                <div className="absolute inset-0 translate-x-6 rounded-full bg-purple-900" />
                <div className="absolute inset-0 overflow-hidden rounded-full border-[6px] border-white">
                  <Image
                    src="/images/gs.jpg"
                    alt="Government Statistician"
                    fill
                    className="object-cover"
                    sizes="(min-width: 640px) 224px, 192px"
                  />
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between text-slate-300">
              <Quote className="h-8 w-8" />
            </div>
            <p className="mt-6 text-sm text-gray-500 sm:text-base">
              At GSS, we are guided by a clear mandate to produce, manage, and disseminate timely, reliable, and relevant statistical information in service of 
              national development. Our work supports sound policymaking, strengthens accountability, deepens public understanding, and enables citizens, 
              institutions, and partners to make informed decisions that advance Ghana’s socio-economic progress.
              As part of our digital transformation agenda, we are continuously strengthening our systems, platforms, and processes to improve data accessibility, 
              usability, and transparency. We remain committed to innovation in data production and dissemination, ensuring that official statistics are not only 
              credible, but also responsive to the evolving needs of government, the private sector, academia, civil society, and the general public.
              Together, we will continue to build a data-driven Ghana, where policy is guided by evidence, development is informed by facts, 
              and statistics serve as a foundation for inclusive and sustainable national progress.

            </p>
            <div className="flex items-center justify-end pr-2 text-slate-300">
              <Quote className="h-8 w-8 scale-x" />
            </div>
            <p className="mt-6 text-sm font-semibold text-slate-900">
              Dr Alhassan Iddrisu - Government Statistician
            </p>
          </Card>
        </div>
      </Container>
    </section>
  );
}
