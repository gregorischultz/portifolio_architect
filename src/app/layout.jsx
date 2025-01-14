import { Inter } from 'next/font/google';
import "./styles/globals.css";

const interFont = Inter({
  subsets:['latin'],
  variable:'--font-primary',
});

//Define os metadados basicos para o site
export const metadata = {
  title: "Portifolio Phil",
  description: "Arquiteto em Portugal",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body className={interFont.variable}>
        {children}
      </body>
    </html>
  );
}
