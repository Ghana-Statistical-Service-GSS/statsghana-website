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
        <div className="mt-34">
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
              At the Ghana Statistical Service, our mission is clear: deliver data Ghana can trust and use for evidence-based 
              decision making to support national development.  We produce timely, relevant, and reliable statistics that inform policy, 
              guide investment, strengthen accountability, and help citizens understand the realities shaping our nation. As we modernize 
              our systems and expand digital access, we are making our data easier to find, understand, and use. Statistics are not just numbers; 
              they are the foundation for sound decisions and national progress. We are committed to raising standards, embracing innovation, and  
              we remain responsive to the evolving needs of data users. I invite policymakers, businesses, researchers, civil society organisations,  
              the media, and every citizen to use our data, question it, engage with it, and apply it. Together, let us build a Ghana where decisions 
              are guided by evidence and progress is anchored in facts
            </p>
            <div className="flex items-center justify-end pr-2 text-slate-300">
              <Quote className="h-8 w-8 scale-x" />
            </div>
            <p className="mt-6 text-sm font-semibold text-slate-900">
              Dr. Alhassan Iddrisu - Government Statistician
            </p>
          </Card>
        </div>
      </Container>
    </section>
  );
}
