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
    <div className="bg-[#001a33] min-h-screen flex items-center justify-center p-6">
      <div className="flex flex-col md:flex-row items-start gap-8 w-full max-w-5xl">
        {/* Text Section */}
        <div className="flex-1 text-white">
          <h1 className="text-3xl font-bold mb-4">
            Custom Licensing Agreement
          </h1>
          <p className="text-gray-300 mb-4">
            For tailored licensing options that come with requesting a custom
            beat, please contact us directly. We offer:
          </p>
          <ul className="list-disc list-inside text-gray-300">
            <li>Custom usage rights</li>
            <li>Modified distribution limits</li>
            <li>Additional file formats or exclusivity options</li>
          </ul>
        </div>

        {/* Form Section */}
        <div className="flex-1">
          <form
            onSubmit={handleSubmit}
            className="space-y-4 bg-[#003366] p-4 rounded shadow-lg w-full"
          >
            <h1 className="text-2xl font-bold text-white text-center mb-2">
              Request a Custom Beat
            </h1>
            <div>
              <label className="block text-gray-300 text-sm">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-2 border rounded bg-white text-black text-sm"
                required
              />
            </div>
            <div>
              <label className="block text-gray-300 text-sm">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-2 border rounded bg-white text-black text-sm"
                required
              />
            </div>
            <div>
              <label className="block text-gray-300 text-sm">
                Preferred Beat Style
              </label>
              <input
                type="text"
                name="style"
                value={formData.style}
                onChange={handleChange}
                className="w-full p-2 border rounded bg-white text-black text-sm"
                required
              />
            </div>
            <div>
              <label className="block text-gray-300 text-sm">
                Additional Details
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="w-full p-2 border rounded bg-white text-black text-sm resize-none"
                rows="3"
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
      </div>
    </div>
  );
};

export default RequestCustomBeat;
