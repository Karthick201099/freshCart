import { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { FiX } from 'react-icons/fi';
import { BiCheckCircle } from 'react-icons/bi';
import { motion } from 'framer-motion';

const AddProduct = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [images, setImages] = useState<File[]>([]);
  const [imageURLs, setImageURLs] = useState<string[]>([]);
  const [description, setDescription] = useState('');
  const [inStock, setInStock] = useState<boolean>(true);
  const [status, setStatus] = useState<'active' | 'disabled'>('active');
  console.log(images);
  const handleStatusChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStatus(event.target.value as 'active' | 'disabled');
  };

  const toggleStock = () => setInStock(!inStock);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const filesArray = Array.from(event.target.files);
      setImages((prev) => [...prev, ...filesArray]);
      setImageURLs((prev) => [...prev, ...filesArray.map((file) => URL.createObjectURL(file))]);
    }
  };

  const handleUploadClick = () => {
    document.getElementById('fileInput')?.click();
  };

  const handleRemoveImage = (index: number) => {
    setImageURLs(imageURLs.filter((_, i) => i !== index));
  };
  return (
    <div className="p-4 my-6">
      <h1 className="font-semibold text-3xl">Add New Product</h1>
      <div className="mt-2 flex justify-between items-center">
        <p className="text-[16px] text-gray-500">
          <Link to="/" className="font-medium text-gray-500 hover:text-green-600">
            Dashboard
          </Link>
          <span className="mx-2">/</span>
          <Link to="/product" className="font-medium text-green-500 hover:text-green-600">
            Products
          </Link>
          <span className="mx-2">/</span>
          Add Products
        </p>
        <button
          className="bg-gray-200 text-black font-medium py-2 px-3 rounded-lg hover:bg-gray-300 "
          onClick={() => {
            navigate(-1);
          }}
        >
          Back to Product
        </button>
      </div>
      <div className=" mt-7 flex flex-col md:flex-row gap-7">
        <div className=" p-8 shadow-md border rounded-lg w-[69%] h-fit">
          <h1 className="font-medium text-xl">Product Information</h1>
          <div className="flex flex-col md:flex-row gap-4 mt-4 flex-wrap">
            <div className="w-[49%]">
              <label htmlFor="name" className=" pb-2 block text-lg">
                Title
              </label>
              <input
                type="text"
                id="name"
                placeholder="Product Name"
                className="block px-7 py-2 w-full border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-4 focus:ring-[#ceefce] focus:border-[#ceefce]"
              />
            </div>
            <div className="w-[48%]">
              <label htmlFor="category" className=" pb-2 block text-lg">
                Product Category
              </label>
              <select
                id="options"
                name="options"
                className="block px-7 py-2 w-full border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-4 focus:ring-[#ceefce] focus:border-[#ceefce]"
              >
                <option value="option1">Product Category</option>
                <option value="option2">Dairy,Bread & Egg</option>
                <option value="option3">snacks & Munchies</option>
                <option value="option4">Fruits & Vegetables</option>
              </select>
            </div>
            <div className="w-[49%]">
              <label htmlFor="weight" className=" pb-2 block text-lg">
                Weight
              </label>
              <input
                type="text"
                id="weight"
                placeholder="Weight"
                className="block px-7 py-2 w-full border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-4 focus:ring-[#ceefce] focus:border-[#ceefce]"
              />
            </div>
            <div className="w-[48%]">
              <label htmlFor="category" className=" pb-2 block text-lg">
                Weight Units
              </label>
              <select
                id="options"
                name="options"
                className="block px-7 py-2 border w-full border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-4 focus:ring-[#ceefce] focus:border-[#ceefce]"
              >
                <option value="option1">Select Units</option>
                <option value="option2">1</option>
                <option value="option3">2</option>
                <option value="option4">3</option>
              </select>
            </div>

            <div className="block w-full">
              <label htmlFor="image" className="pb-2 block text-lg">
                Products Image
              </label>

              <div
                className="border-2 border-dashed border-gray-300 rounded-lg p-4 flex justify-center items-center bg-gray-100 w-full h-48  cursor-pointer"
                onClick={handleUploadClick}
              >
                {imageURLs.length === 0 ? (
                  <span className="text-lg font-semibold text-gray-600">
                    Drop files here to upload
                  </span>
                ) : (
                  <div className="flex gap-2 overflow-x-auto">
                    {imageURLs.map((url, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={url}
                          alt={`Uploaded ${index}`}
                          className="w-24 h-24 object-cover rounded-lg cursor-pointer"
                        />
                        <BiCheckCircle
                          size={28}
                          className="absolute top-[35%] left-[35%] text-gray-200  group-hover:opacity-0 transition-opacity"
                        />
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleRemoveImage(index);
                          }}
                          className="absolute top-[35%] left-[35%] text-gray-500 bg-white  rounded-full p-1 shadow-lg  opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <FiX size={20} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
                <input
                  type="file"
                  id="fileInput"
                  accept="image/*"
                  multiple
                  ref={fileInputRef}
                  onChange={handleImageChange}
                  className="hidden"
                />
              </div>
            </div>
            <div className="w-full block">
              <label htmlFor="description" className="pb-2 block text-lg">
                Descriptions
              </label>
              <ReactQuill
                value={description}
                onChange={setDescription}
                className="bg-white w-full  "
              />
            </div>
          </div>
        </div>
        <div className="w-[31%]">
          <div className="p-6 border rounded-lg shadow-md ">
            {/* Toggle Switch with Text on Right */}
            <div className="flex items-center space-x-3 cursor-pointer" onClick={toggleStock}>
              {/* Toggle Button */}
              <div
                className={`w-16 h-8 flex items-center rounded-full p-1 transition-colors ${
                  inStock ? 'bg-green-500' : 'bg-red-400'
                }`}
              >
                <motion.div
                  className={`w-6 h-6  bg-white rounded-full shadow-md`}
                  layout
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  animate={{ x: inStock ? 28 : 0 }}
                />
              </div>

              {/* Animated Stock Status Text */}
              <motion.span
                className={`text-sm font-semibold ${inStock ? 'text-green-600' : 'text-red-600'}`}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                {inStock ? '✅ In Stock' : '❌ Out of Stock'}
              </motion.span>
            </div>
            <div className="mt-2">
              <label htmlFor="name" className=" pb-2 block text-lg">
                Product Code
              </label>
              <input
                type="text"
                id="name"
                placeholder=" Enter Product Title"
                className="block px-3 py-2 w-full border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-4 focus:ring-[#ceefce] focus:border-[#ceefce]"
              />
            </div>

            <div className="mt-2">
              <label htmlFor="name" className=" pb-2 block text-lg">
                Product SKU
              </label>
              <input
                type="text"
                id="name"
                placeholder=" Enter Product Title"
                className="block px-3 py-2 w-full border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-4 focus:ring-[#ceefce] focus:border-[#ceefce]"
              />
            </div>
            <div className="py-2">
              <h2 className="text-lg  mb-2">Product Status</h2>
              <div className="flex gap-4">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="status"
                    value="active"
                    checked={status === 'active'}
                    onChange={handleStatusChange}
                  />
                  Active
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="status"
                    value="disabled"
                    checked={status === 'disabled'}
                    onChange={handleStatusChange}
                  />
                  Disabled
                </label>
              </div>
            </div>
          </div>
          <div className="p-6 border mt-7 rounded-lg shadow-md ">
            <h2 className="text-lg font-semibold mb-4">Add Product</h2>

            <div className="mt-2">
              <label htmlFor="name" className=" pb-2 block text-lg">
                Regular Price
              </label>
              <input
                type="text"
                id="name"
                placeholder=" $0.00"
                className="block px-3 py-2 w-full border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-4 focus:ring-[#ceefce] focus:border-[#ceefce]"
              />
            </div>

            <div className="mt-2">
              <label htmlFor="name" className=" pb-2 block text-lg">
                Sale Price
              </label>
              <input
                type="text"
                id="name"
                placeholder=" $0.00"
                className="block px-3 py-2 w-full border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-4 focus:ring-[#ceefce] focus:border-[#ceefce]"
              />
            </div>
          </div>
          <div className="p-6 border mt-7 rounded-lg shadow-md ">
            <h2 className="text-lg font-semibold mb-4">Meta Data</h2>

            <div className="mt-2">
              <label htmlFor="name" className=" pb-2 block text-lg">
                Meta Title
              </label>
              <input
                type="text"
                id="name"
                placeholder=" Title"
                className="block px-3 py-2 w-full border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-4 focus:ring-[#ceefce] focus:border-[#ceefce]"
              />
            </div>

            <div className="mt-2">
              <label htmlFor="description" className=" pb-2 block text-lg">
                Meta Description
              </label>
              <textarea
                name="description"
                id="description"
                placeholder="Meta Description"
                className="block px-3 py-2 border h-20 w-full border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-4 focus:ring-[#ceefce] focus:border-[#ceefce]"
              ></textarea>
            </div>
          </div>
          <div className="mt-7 w-full">
            <button className="bg-green-500 text-white w-full font-medium py-2 px-3 rounded-lg hover:bg-green-600">
              Create Product
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
