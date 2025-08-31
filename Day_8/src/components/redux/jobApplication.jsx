import React from "react";
import { useForm } from "react-hook-form";

export default function CheckboxForms() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    alert(JSON.stringify(data, null, 2));
  };

  // Watch semua field untuk melihat nilai secara real-time
  const allValues = watch();

  // Filter untuk hanya menampilkan nilai yang true atau terisi
  const watchedValues = Object.entries(allValues).reduce(
    (acc, [key, value]) => {
      // Untuk checkbox, hanya tampilkan jika true
      if (typeof value === "boolean" && value === true) {
        acc[key] = value;
      }
      // Untuk nested objects (hobi, skill, expertise)
      else if (typeof value === "object" && value !== null) {
        const filteredNested = Object.entries(value).reduce(
          (nestedAcc, [nestedKey, nestedValue]) => {
            if (nestedValue === true) {
              nestedAcc[nestedKey] = nestedValue;
            }
            return nestedAcc;
          },
          {}
        );
        if (Object.keys(filteredNested).length > 0) {
          acc[key] = filteredNested;
        }
      }
      // Untuk input text, tampilkan jika ada nilai
      else if (typeof value === "string" && value.trim() !== "") {
        acc[key] = value;
      }
      return acc;
    },
    {}
  );

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-6 text-gray-800 text-center">
        Employee Form
      </h1>

      <div className="space-y-6">
        {/* Input Text biasa */}
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <span className="text-gray-700 font-medium min-w-fit">
              First Name
            </span>
            <input
              placeholder="First Name"
              {...register("firstName")}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex items-center space-x-3">
            <span className="text-gray-700 font-medium min-w-fit">
              Last Name
            </span>
            <input
              placeholder="Last Name"
              {...register("lastName", { required: true })}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {errors.lastName && (
            <span className="text-red-500 text-sm">Last Name wajib diisi</span>
          )}

          <div className="flex items-center space-x-3">
            <span className="text-gray-700 font-medium min-w-fit">Email</span>
            <input
              placeholder="Email"
              type="email"
              {...register("email", { required: true })}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {errors.email && (
            <span className="text-red-500 text-sm">Email wajib diisi</span>
          )}
        </div>

        {/* Checkbox Kotak Standar */}
        <div className="space-y-3">
          <div className="flex items-center space-x-6">
            <span className="text-gray-700 font-medium min-w-fit">
              Employed
            </span>

            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="radio"
                value="true"
                {...register("employedStatus", { required: true })}
                className="text-blue-600 border-gray-300 focus:ring-2 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">Yes</span>
            </label>

            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="radio"
                value="false"
                {...register("employedStatus", { required: true })}
                className="text-blue-600 border-gray-300 focus:ring-2 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">No</span>
            </label>
          </div>
        </div>

        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-gray-700">
            Last Education
          </h3>

          <select
            {...register("lastEducation")}
            className="w-full p-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
          >
            <option value="">-- Last Education --</option>
            <option value="sd">SD</option>
            <option value="smp">SMP</option>
            <option value="sma">SMA</option>
            <option value="smk">SMK</option>
            <option value="d3">D3</option>
            <option value="d4">D4</option>
            <option value="s1">S1</option>
          </select>
        </div>

        {/* Checkbox Bulat (Radio Style) */}
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-gray-700">Expertise</h3>

          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              {...register("expertise.html")}
              className="w-4 h-4 text-purple-600 bg-gray-100 border-gray-300 rounded-full focus:ring-purple-500 focus:ring-2"
            />
            <span className="text-gray-700">HTML</span>
          </label>

          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              {...register("expertise.css")}
              className="w-4 h-4 text-purple-600 bg-gray-100 border-gray-300 rounded-full focus:ring-purple-500 focus:ring-2"
            />
            <span className="text-gray-700">CSS</span>
          </label>

          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              {...register("expertise.js")}
              className="w-4 h-4 text-purple-600 bg-gray-100 border-gray-300 rounded-full focus:ring-purple-500 focus:ring-2"
            />
            <span className="text-gray-700">JavaScript</span>
          </label>

          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              {...register("expertise.node")}
              className="w-4 h-4 text-purple-600 bg-gray-100 border-gray-300 rounded-full focus:ring-purple-500 focus:ring-2"
            />
            <span className="text-gray-700">Node.js</span>
          </label>

          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              {...register("expertise.react")}
              className="w-4 h-4 text-purple-600 bg-gray-100 border-gray-300 rounded-full focus:ring-purple-500 focus:ring-2"
            />
            <span className="text-gray-700">React.js</span>
          </label>
        </div>

        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-gray-700">
            Preffered Technology
          </h3>

          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              {...register("preferredTechnology.fe")}
              className="w-4 h-4 text-purple-600 bg-gray-100 border-gray-300 rounded-full focus:ring-purple-500 focus:ring-2"
            />
            <span className="text-gray-700">Front End</span>
          </label>

          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              {...register("preferredTechnology.be")}
              className="w-4 h-4 text-purple-600 bg-gray-100 border-gray-300 rounded-full focus:ring-purple-500 focus:ring-2"
            />
            <span className="text-gray-700">Back End</span>
          </label>

          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              {...register("preferredTechnology.fs")}
              className="w-4 h-4 text-purple-600 bg-gray-100 border-gray-300 rounded-full focus:ring-purple-500 focus:ring-2"
            />
            <span className="text-gray-700">Full Stack</span>
          </label>
        </div>

        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-gray-700">
            Notes
          </h3>

          <textarea
            {...register("notes", { required: true })}
            placeholder="Notes..."
            rows={3}
            className="w-full p-3 text-sm border border-gray-300 rounded-lg 
               focus:outline-none focus:ring-2 focus:ring-purple-500 resize-y"
          />
          <p className="text-xs text-gray-500">
            Tuliskan catatan motivasi panjang yang ingin kamu simpan.
          </p>
        </div>

        {/* Submit Button */}
        <button
          onClick={handleSubmit(onSubmit)}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
        >
          Submit
        </button>
      </div>

      {/* Preview Data */}
      <div className="mt-8 p-4 bg-gray-100 rounded-lg">
        <h3 className="text-lg font-semibold mb-2 text-gray-700">
          Preview Data:
        </h3>
        <pre className="text-sm text-gray-600 whitespace-pre-wrap">
          {JSON.stringify(watchedValues, null, 2)}
        </pre>
      </div>
    </div>
  );
}
