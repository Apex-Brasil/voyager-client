import Image from "next/legacy/image";

export const WashTradingFrame = () => {
  return (
    <section
      className={`flex flex-col gap-10 justify-start items-center py-14 md:py-24`}
    >
      <div
        className={`flex flex-col-reverse items-center md:flex-row-reverse gap-10 md:gap-16 lg:gap-32`}
      >
        <aside
          className={`relative w-[300px] h-[300px] xl:w-[420px] xl:h-[420px]`}
        >
          <Image
            src={"/img/layout/home/wash.webp"}
            alt={"Washing machine image"}
            layout={"fill"}
            objectFit={"contain"}
          />
        </aside>
        <aside
          className={`flex flex-col justify-center text-center md:text-left gap-5 w-[350px] lg:w-[500px]`}
        >
          <span className={`font-bold text-2xl lg:text-4xl`}>
            Wash trading detector
          </span>
          <span className={`text-secondary text-xl font-medium`}>
            Don&apos;t be fooled again, check out for{" "}
            <span className={`text-primary`}>wash trading</span> activities that
            can trick you into buying a scam.
          </span>
        </aside>
      </div>
    </section>
  );
};
