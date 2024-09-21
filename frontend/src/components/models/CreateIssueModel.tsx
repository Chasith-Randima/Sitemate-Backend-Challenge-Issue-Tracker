import { useState } from 'react';
import { createIssue } from '@/actions/issue';
import { IssueRequest } from '@/types';
import Image from 'next/image';
import Spinner from '../common/Spinner';
import NotificationModal from './NotificationModel';
import { CreateIssueModalProps } from '@/types/components/modles/CreateIssueModel';

const CreateIssueModal: React.FC<CreateIssueModalProps> = ({ isVisible, onClose, onCreate }) => {

  const [formData, setFormData] = useState<IssueRequest>({
    issueNumber: '',
    title: '',
    description: '',
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleCreateClick = async () => {
    try {
      await createIssue(formData);
      setSuccess("Succesfully Created Issue!")
      setFormData({issueNumber:"",title:"",description:""})
      onCreate(); 
      onClose(); 
    } catch (error) {
      console.error('Failed to create issue:', error);
    }finally{
      setLoading(false)
    }
  };

  if (!isVisible) return null;

  return (
    <>
      {loading && (
        <div className="h-full absolute inset-0 z-50 flex items-center justify-center ">
          <Spinner />
        </div>
      )}
      {error && <NotificationModal   isVisible={true} message={error} type='error' onClose={()=>{setError("")}}/>}
      {success && <NotificationModal   isVisible={true} message={"Successfully Created Issue..!"} type='success' onClose={()=>{setSuccess("")}}/>}
  
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative p-6 w-full max-w-lg bg-white rounded-lg shadow-lg">
        <button
          type="button"
          className="absolute top-3 right-3 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center"
          onClick={onClose}
        >
          <svg
            className="w-4 h-4"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M1 1l6 6m0 0l6 6M7 7L1 13M7 7l6-6"
            />
          </svg>
          <span className="sr-only">Close modal</span>
        </button>
        <h2 className="text-2xl font-bold mb-4 text-center">Create New Issue</h2>

        <input
          type="text"
          name="issueNumber"
          value={formData.issueNumber}
          onChange={handleInputChange}
          placeholder="Issue Number"
          className="w-full p-2 border rounded-lg mb-4"
        />
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleInputChange}
          placeholder="Issue Title"
          className="w-full p-2 border rounded-lg mb-4"
        />
        <textarea
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          placeholder="Issue Description"
          className="w-full p-2 border rounded-lg mb-4"
        />

        <div className="flex justify-end space-x-3">
          <button
            onClick={handleCreateClick}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
          >
            Create
          </button>
          <button
            onClick={onClose}
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400"
          >
            Close
          </button>
        </div>
      </div>
    </div>
    </>
  );
};

export default CreateIssueModal;
