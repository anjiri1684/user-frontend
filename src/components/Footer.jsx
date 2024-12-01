const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#012e59] p-4 text-white fixed bottom-0 left-0 w-full text-center z-10">
      <p>&copy; {currentYear} NIVA Productions</p>
    </footer>
  );
};

export default Footer;
