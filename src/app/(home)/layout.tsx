import FooterBar from "./_componets/footer_bar";


const HomeLayout = ({ children }: { children: React.ReactNode }) => (
  <html lang="en">
    <body className="flex h-full flex-col items-center justify-between">
      {children}
      <FooterBar />
    </body>
  </html>
);

export default HomeLayout;
