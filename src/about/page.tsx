import Script from "next/script";

export default function AboutPage() {
  return (
    <main className="min-h-screen pt-40 flex flex-col items-center justify-center gap-10">

      <h1 className="text-5xl font-bold">
        À PROPOS
      </h1>

      <Script
        src="https://platform.linkedin.com/badges/js/profile.js"
        strategy="afterInteractive"
      />

      <div
        className="badge-base LI-profile-badge"
        data-locale="fr_FR"
        data-size="large"
        data-theme="light"
        data-type="VERTICAL"
        data-vanity="syriack-flavien-ndamassingba-mbolipatirani-9a7824286"
        data-version="v1"
      >
        <a
          className="badge-base__link LI-simple-link"
          href="https://cf.linkedin.com/in/syriack-flavien-ndamassingba-mbolipatirani-9a7824286"
        >
          Syriack Flavien NDAMASSINGBA MBOLIPATIRANI
        </a>
      </div>

    </main>
  );
}