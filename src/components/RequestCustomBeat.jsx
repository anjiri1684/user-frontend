import { useState } from "react";

const RequestCustomBeat = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    style: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { name, email, style, description } = formData;

    // Construct the mailto link
    const subject = `Custom Beat Request from ${name}`;
    const body = `Name: ${name}%0AEmail: ${email}%0APreferred Beat Style: ${style}%0ADetails: ${description}`;
    const mailtoLink = `mailto:your-email@example.com?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;

    // Open the mailto link
    window.location.href = mailtoLink;
  };

  return (
    <div className="bg-[#001a33] min-h-screen flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="space-y-6 bg-[#003366] p-6 rounded shadow-lg w-[90%] max-w-md"
      >
        <h1 className="text-3xl font-bold text-white text-center mb-4">
          Request a Custom Beat
        </h1>
        <div>
          <label className="block text-gray-300">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border rounded bg-white text-black"
            required
          />
        </div>
        <div>
          <label className="block text-gray-300">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border rounded bg-white text-black"
            required
          />
        </div>
        <div>
          <label className="block text-gray-300">Preferred Beat Style</label>
          <input
            type="text"
            name="style"
            value={formData.style}
            onChange={handleChange}
            className="w-full p-2 border rounded bg-white text-black"
            required
          />
        </div>
        <div>
          <label className="block text-gray-300">Additional Details</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-2 border rounded bg-white text-black resize-none"
            rows="4"
            required
          ></textarea>
        </div>
        <button
          type="submit"
          className="bg-purple-700 text-white py-2 px-4 rounded hover:bg-purple-800 w-full"
        >
          Submit Request
        </button>
      </form>
    </div>
  );
};

export default RequestCustomBeat;
