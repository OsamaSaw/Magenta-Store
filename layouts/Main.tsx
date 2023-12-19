import Head from "next/head";
import Header from "components/header";
import { useRouter } from "next/router";
import { initParticlesEngine } from "@tsparticles/react";
import { useEffect, useMemo, useState } from "react";
import { loadSlim } from "@tsparticles/slim";
import dynamic from "next/dynamic";

type LayoutType = {
  title?: string;
  children?: React.ReactNode;
};
const Particles = dynamic(() => import("@tsparticles/react"), { ssr: false });

export default ({ children, title = "Next.js Ecommerce" }: LayoutType) => {
  const router = useRouter();
  const pathname = router.pathname;
  const [init, setInit] = useState(false);
  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const particlesLoaded = (container) => {
    console.log(container);
  };
  const options = useMemo(
    () => ({
      background: {
        color: {
          value: "transparent",
        },
      },
      fpsLimit: 120,
      interactivity: {
        events: {
          onClick: {
            enable: true,
            mode: "push",
          },
          onHover: {
            enable: true,
            mode: "repulse",
            distance: 5,
          },
        },
        modes: {
          repulse: {
            distance: 80,
          },
        },
      },
      particles: {
        shape: {
          type: "image",
          options: {
            image: [
              {
                src: "images/logos/zero.png",
              },
              {
                src: "images/logos/one.png",
              },
              {
                src: "images/logos/key2.png",
              },
            ],
          },
        },
        number: {
          value: 50,
          density: {
            enable: false,
          },
        },
        size: {
          value: 10,
          random: true,
          anim: {
            speed: 4,
            size_min: 0.3,
          },
        },
        move: {
          enable: true,
          random: false,
          speed: 6,
          straight: false,
          direction: "bottom",
        },
      },
    }),
    []
  );

  return (
    <div className="app-main">
      <Head>
        <title>{title}</title>
      </Head>

      <Header />

      <main className={pathname !== "/" ? "main-page" : ""}>
        <>
          {init && pathname == "/" && (
            <Particles
              id="tsparticles"
              particlesLoaded={particlesLoaded}
              options={options}
            />
          )}

          {children}
        </>
      </main>
    </div>
  );
};
