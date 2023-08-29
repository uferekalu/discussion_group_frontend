import { Meta } from "@/components/layout/Meta";
import { AppConfig } from "@/utils/AppConfig";
import { Background } from "@/components/background/Background";
import { Section } from "@/components/layout/Section";
import { Navbar } from "@/components/navigation/Navbar";
import { Logo } from "@/components/logo/Logo";
import Link from "next/link";
import { Footer } from "@/components/footer";
import { NavbarMobile } from "@/components/navigation/NavbarMobile";

export default function Home() {
  return (
    <div className="text-gray-600 antialiased">
      <Meta title={AppConfig.title} description={AppConfig.description} />
      <Background color="bg-gray-100" bgImg imgUrl='url("/background4.jpeg")'>
        <Section width="w-full" height="h-24" yPadding="py-6">
          <Navbar logo={<Logo xl />} xsMenu={<NavbarMobile />}>
            <li>
              <Link
                className="bg-pink-500 border rounded-lg p-3 ease-in duration-300 text-white font-medium hover:bg-yellow-600 hover:text-black hover:border-none"
                href="/register"
              >
                Sign Up
              </Link>
            </li>
            <li>
              <Link
                className="bg-gray-950 border rounded-lg p-3 ease-in duration-300 text-white font-medium hover:bg-white hover:text-black hover:border-none"
                href="/login"
              >
                Login
              </Link>
            </li>
          </Navbar>
        </Section>
      </Background>
      <Background color="bg-gray-200" bgImg imgUrl='url("/background.jpg")'>
        <Section
          marginTop="mt-16"
          width="full"
          height="min-h-screen"
          xPadding="px-8"
          yPadding="py-6"
          title="The Discussion Group App"
          description="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
        >
          <p></p>
        </Section>
        {/* <div className="flex mt-0 w-full">
          <Section
            width="w-1/4"
            height="min-h-screen"
            xPadding="px-4"
            yPadding="py-6"
          >
            hhdh hhdhdhhhdhdh hdhdhd hdhdhd hdhdhd
          </Section>
          <Section
            width="w-3/4"
            height="min-h-screen"
            xPadding="px-4"
            yPadding="py-6"
          >
            hhdh hhdhdhhhdhdh hdhdhd hdhdhd hdhdhd hhdh hhdhdhhhdhdh hdhdhd
            hdhdhd hdhdhd hhdh hhdhdhhhdhdh hdhdhd hdhdhd hdhdhd
          </Section>
        </div> */}
      </Background>
      <Footer />
    </div>
  );
}
