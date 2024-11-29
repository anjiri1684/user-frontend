/* eslint-disable react/prop-types */
import { useState } from "react";
import Checkout from "./Checkout"; // Checkout component

const SubscriptionModal = ({ closeModal }) => {
  const [selectedPlan, setSelectedPlan] = useState(null);

  const plans = {
    Basic: {
      price: 5,
      features: [
        "Access to 100 beats",
        "Download in MP3 format",
        "Priority support ✘",
      ],
    },
    Standard: {
      price: 10,
      features: [
        "Access to 500 beats",
        "Download in MP3 & WAV formats",
        "Priority support ✔",
      ],
    },
    Premium: {
      price: 20,
      features: [
        "Access to 1000+ beats",
        "Download in MP3, WAV & Studio Quality",
        "Priority support ✔",
      ],
    },
  };

  const handlePlanSelect = (plan) => {
    setSelectedPlan(plan);
  };

  return (
    <div className="modal fixed top-0 left-0 w-full h-full flex justify-center items-center bg-opacity-50 bg-black">
      <div className="modal-content bg-[#001a33] p-8 rounded-lg shadow-xl w-[90%] md:w-[70%]">
        <h2 className="text-2xl font-bold text-white mb-6 text-center">
          Choose Your Subscription Plan
        </h2>
        <p className="text-lg text-gray-300 mb-6 text-center">
          Subscribe to access all beats and unlock more features.
        </p>

        <div className="flex flex-wrap justify-center gap-8">
          {/* Basic Plan */}
          <div className="bg-[#003366] p-6 rounded-lg w-full sm:w-[30%]">
            <h3 className="text-xl font-semibold text-white mb-4">
              Basic - ${plans.Basic.price}/month
            </h3>
            <ul className="text-gray-300 mb-6">
              {plans.Basic.features.map((feature, index) => (
                <li key={index} className="flex justify-between">
                  {feature}
                </li>
              ))}
            </ul>
            <button
              onClick={() => handlePlanSelect("Basic")}
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 w-full"
            >
              Subscribe Now
            </button>
          </div>

          {/* Standard Plan */}
          <div className="bg-[#003366] p-6 rounded-lg w-full sm:w-[30%]">
            <h3 className="text-xl font-semibold text-white mb-4">
              Standard - ${plans.Standard.price}/month
            </h3>
            <ul className="text-gray-300 mb-6">
              {plans.Standard.features.map((feature, index) => (
                <li key={index} className="flex justify-between">
                  {feature}
                </li>
              ))}
            </ul>
            <button
              onClick={() => handlePlanSelect("Standard")}
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 w-full"
            >
              Subscribe Now
            </button>
          </div>

          {/* Premium Plan */}
          <div className="bg-[#003366] p-6 rounded-lg w-full sm:w-[30%]">
            <h3 className="text-xl font-semibold text-white mb-4">
              Premium - ${plans.Premium.price}/month
            </h3>
            <ul className="text-gray-300 mb-6">
              {plans.Premium.features.map((feature, index) => (
                <li key={index} className="flex justify-between">
                  {feature}
                </li>
              ))}
            </ul>
            <button
              onClick={() => handlePlanSelect("Premium")}
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 w-full"
            >
              Subscribe Now
            </button>
          </div>
        </div>

        {selectedPlan && (
          <Checkout selectedPlan={selectedPlan} closeModal={closeModal} />
        )}

        <button
          onClick={(closeModal = true)}
          className="mt-6 text-gray-300 hover:text-white w-full py-2 rounded"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default SubscriptionModal;
