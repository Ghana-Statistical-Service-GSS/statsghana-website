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
        <div className="mt-16">
          <Card className="relative mx-auto max-w-3xl px-6 pb-10 pt-20 text-center sm:px-12">
            <div className="absolute left-1/2 top-0 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center">
              <div className="relative h-32 w-32 sm:h-36 sm:w-36">
                <div className="absolute inset-0 translate-x-4 rounded-full bg-purple-900" />
                <div className="absolute inset-0 overflow-hidden rounded-full border-[5px] border-white">
                  <Image
                    src="/images/gs.jpg"
                    alt="Government Statistician"
                    fill
                    className="object-cover"
                    sizes="216px"
                  />
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between text-slate-300">
              <Quote className="h-8 w-8" />
            </div>
            <p className="mt-6 text-sm text-gray-500 sm:text-base">
              Welcome to the official website of the Ghana Statistical Service —
              the trusted source of official data for national development. At
              GSS, we recognize that data drives progress. Our commitment is to
              produce and share timely, reliable, and relevant statistics that
              inform policy, empower citizens, and promote accountability. As we
              embrace digital transformation, we continue to innovate in how data
              is collected, analyzed, and disseminated — ensuring that statistics
              are accessible and meaningful to all users. Together, let us build
              a data-driven Ghana, where every statistic counts and every
              decision is guided by evidence.
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
