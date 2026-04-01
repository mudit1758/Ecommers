import "./globals.css";

export const metadata = {
  title: "ShopHub - Online E-Commerce Store",
  description: "Your one-stop shop for everything",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <script
          src="https://checkout.razorpay.com/v1/checkout.js"
          async
        ></script>
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
