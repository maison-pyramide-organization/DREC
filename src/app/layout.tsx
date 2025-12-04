import type { Metadata } from "next";
import "@/styles/reset.css";
import "@/styles/utils.css";
// import "@/components/smooth-scroller/index";
import Header from "@/components/header";
import Footer from "@/components/footer";
import Lenis from "@/components/lenis";
import { WindowProvider } from "@/contexts/windowContext";
import Loader from "@/components/loader";
// import SmoothScroller from "@/components/smooth-scroller";

export const metadata: Metadata = {
  title: "DREC",
  description: "We design for the long term, so life works in the short term.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {/* <Lenis> */}
        <WindowProvider>
          <div className="_" style={{ opacity: 0 }}>
            <Header />
            {children}
            <Footer />
          </div>
          <Loader />
        </WindowProvider>
        {/* </Lenis> */}
      </body>
    </html>
  );
}
