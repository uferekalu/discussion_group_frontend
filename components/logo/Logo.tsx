import { AppConfig } from "@/utils/AppConfig";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

type ILogoProps = {
  xl?: boolean;
};

const Logo = (props: ILogoProps) => {
  const router = useRouter();
  const size = props.xl ? "44" : "32";
  const fontStyle = props.xl
    ? "font-semibold text-3xl"
    : "font-semibold text-xl";

  return (
    <span
      onClick={() => router.push("/")}
      className={`inline-flex items-center text-white space-x-2 sm:text-lg  text-sm ${fontStyle}`}
    >
      <Image
        id="logo"
        className="rounded-lg"
        src="/discussion.jpg"
        width={size}
        height={size}
        alt="group"
      />
      <div className="sm:block hidden">{AppConfig.site_name}</div>
    </span>
  );
};

export { Logo };
