import { useState } from 'react';
import axios from 'axios';
import { Button } from '../ui'; // Ensure Button is properly imported
import { message } from 'antd';


const Links = () => {
  const [inputValue, setInputValue] = useState('');
  const [shortUrl, setShortUrl] = useState('');

  const handleSubmit = async () => {
    if (!inputValue) {
      message.error('Please enter a URL');
      return;
    }

    // Optional: Perform URL validation here if needed

    try {
      const response = await axios.post('http://localhost:8001/url', { url: inputValue });
      setShortUrl(`http://localhost:8001/${response.data.shortId}`);
      setInputValue('');
      message.success('Shortened URL created successfully');
    } catch (error) {
      console.error('Error shortening the URL:', error);
      message.error('Error occurred. Please try again later.');
    }
  };

  const handleNavigate = () => {
    window.open(shortUrl, '_blank');
  };

  const handleCopyToClipboard = () => {
    if (shortUrl) {
      navigator.clipboard.writeText(shortUrl);
      message.success('URL copied to clipboard');
    } else {
      message.error('No URL available to copy');
    }
  };
  

  return (
    <div className="flex justify-around p-10">
      {/* <div  style={{ maxWidth : '500px' }}  className=" p-4 bg-white shadow-md rounded-lg text-center mt-10"> */}
      <div style={{ maxWidth: '90%', marginBottom: '20px', height: '200px', width: '400px' }} className="p-4 bg-white shadow-md rounded-lg text-center mt-10">


        <h2 className="text-2xl font-bold mb-4">Enter URL</h2>
        <div className='flex items-center'>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="https://example.com/my-long-url"
          className="border p-4 w-full border-gray-300 bg-white text-xl"
        />
        {shortUrl && ( // Show copy button only when shortUrl exists
            <i
              className="fa-solid fa-clone cursor-pointer ml-2"
              onClick={handleCopyToClipboard}
            style={{ fontSize: '25px', marginLeft: '8px' }} 
            ></i>
          )}
          
          </div>
       <Button className="mt-4" onClick={handleSubmit}>
          Generate short link
        </Button>
        {shortUrl && shortUrl !== '' && (
  <div className="relative mt-4">
    <h3 className="text-lg font-semibold">Shortened URL</h3>
    <p className="text-blue-500 cursor-pointer" onClick={handleNavigate}>
      {shortUrl}
    </p>
  </div>
  )}
      </div>
    </div>
  );
};
export default Links;
